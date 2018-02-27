function data() {

}

data.prototype.init = function() {
    this.firstData = {
        "title": "Pacman Tower", // 游戏名，将显示在标题页面以及切换楼层的界面中
        "name": "pacman", // 游戏的唯一英文标识符。由英文、数字、下划线组成，不能超过20个字符。
        "version": "Ver 1.2.0 (Alpha)", // 当前游戏版本；版本不一致的存档不能通用。
        "floorId": "sample0", // 初始楼层ID
        "hero": { // 勇士初始数据
            "name": "吃豆人", // 勇士名；可以改成喜欢的
            "hp": 5, // 初始生命值
            "atk": 1, // 初始攻击
            "def": 0, // 初始防御
            "mdef": 0, // 初始魔防
            "money": 0, // 初始金币
            "experience": 0, // 初始经验
            "items": { // 初始道具个数
                "keys": {
                    "yellowKey": 0,
                    "blueKey": 0,
                    "redKey": 0
                },
                "constants": {},
                "tools": {}
            },
            "flyRange": [], // 初始可飞的楼层；一般留空数组即可
            "loc": {"direction": "right", "x": 1, "y": 11}, // 勇士初始位置
            "flags": { // 游戏过程中的变量或flags
                "poison": false, // 毒
                "weak": false, // 衰
                "curse": false, // 咒
            },
            "steps": 0, // 行走步数统计
        },
        "startText": [ // 游戏开始前剧情。如果无剧情直接留一个空数组即可。
            
        ],
        "shops": [ // 定义全局商店（即快捷商店）
            
        ],
    }
    // 各种数值；一些数值可以在这里设置
    this.values = {
        /****** 角色相关 ******/
        "HPMAX": 999999, // HP上限；-1则无上限
        "lavaDamage": 100, // 经过血网受到的伤害
        "poisonDamage": 10, // 中毒后每步受到的伤害
        "weakValue": 20, // 衰弱状态下攻防减少的数值
        /****** 道具相关 ******/
        "redJewel": 3, // 红宝石加攻击的数值
        "blueJewel": 3, // 蓝宝石加防御的数值
        "greenJewel": 5, // 绿宝石加魔防的数值
        "redPotion": 100, // 红血瓶加血数值
        "bluePotion": 250, // 蓝血瓶加血数值
        "yellowPotion": 500, // 黄血瓶加血数值
        "greenPotion": 800, // 绿血瓶加血数值
        "sword0": 0, // 默认装备折断的剑的攻击力
        "shield0": 0, // 默认装备残破的盾的防御力
        "sword1": 10, // 铁剑加攻数值
        "shield1": 10, // 铁盾加防数值
        "sword2": 20, // 银剑加攻数值
        "shield2": 20, // 银盾加防数值
        "sword3": 40, // 骑士剑加攻数值
        "shield3": 40, // 骑士盾加防数值
        "sword4": 80, // 圣剑加攻数值
        "shield4": 80, // 圣盾加防数值
        "sword5": 160, // 神圣剑加攻数值
        "shield5": 160, // 神圣盾加防数值
        "moneyPocket": 500, // 金钱袋加金币的数值
        /****** 怪物相关 ******/
        'breakArmor': 0.9, // 破甲的比例（战斗前，怪物附加角色防御的x%作为伤害）
        'counterAttack': 0.1, // 反击的比例（战斗时，怪物每回合附加角色攻击的x%作为伤害，无视角色防御）
        'purify': 3, // 净化的比例（战斗前，怪物附加勇士魔防的x倍作为伤害）
        'hatred': 2, // 仇恨属性中，每杀死一个怪物获得的仇恨值
        /****** 系统相关 ******/
        'animateSpeed': 500, // 动画时间
    }
    // 系统FLAG，在游戏运行中中请不要修改它。
    this.flags = {
        /****** 状态栏相关 ******/
        "enableFloor": true, // 是否在状态栏显示当前楼层
        "enableLv": false, // 是否在状态栏显示当前等级
        "enableMDef": false, // 是否在状态栏及战斗界面显示魔防（护盾）
        "enableMoney": true, // 是否在状态栏、怪物手册及战斗界面显示金币
        "enableExperience": true, // 是否在状态栏、怪物手册及战斗界面显示经验
        "enableLevelUp": false, // 是否允许等级提升（进阶）；如果上面enableExperience为false，则此项恒视为false
        "enableDebuff": false, // 是否涉及毒衰咒；如果此项为false则不会在状态栏中显示毒衰咒的debuff
        ////// 上述的几个开关将直接影响状态栏的显示效果 //////
        /****** 道具相关 ******/
        "flyNearStair": true, // 是否需要在楼梯边使用传送器
        "pickaxeFourDirections": false, // 使用破墙镐是否四个方向都破坏；如果false则只破坏面前的墙壁
        "bombFourDirections": false, // 使用炸弹是否四个方向都会炸；如果false则只炸面前的怪物（即和圣锤等价）
        "bigKeyIsBox": false, // 如果此项为true，则视为钥匙盒，红黄蓝钥匙+1；若为false，则视为大黄门钥匙
        "equipment": false, // 剑和盾是否直接作为装备。如果此项为true，则作为装备，需要在道具栏使用，否则将直接加属性。
        /****** 怪物相关 ******/
        "enableNegativeDamage": true, // 是否支持负伤害（回血）
        "hatredDecrease": true, // 是否在和仇恨怪战斗后减一半的仇恨值，此项为false则和仇恨怪不会扣减仇恨值。
        "betweenAttackCeil": false, // 夹击方式是向上取整还是向下取整。如果此项为true则为向上取整，为false则为向下取整
        /****** 系统相关 ******/
        "startDirectly": true, // 点击“开始游戏”后是否立刻开始游戏而不显示难度选择界面
        "canOpenBattleAnimate": false, // 是否允许用户开启战斗过程；如果此项为false，则下面两项均强制视为false
        "showBattleAnimateConfirm": false, // 是否在游戏开始时提供“是否开启战斗动画”的选项
        "battleAnimate": false, // 是否默认显示战斗动画；用户可以手动在菜单栏中开关
        "displayEnemyDamage": true, // 是否地图怪物显伤；用户可以手动在菜单栏中开关
        "displayExtraDamage": false, // 是否地图高级显伤（领域、夹击等）；用户可以手动在菜单栏中开关
        "enableGentleClick": false, // 是否允许轻触（获得面前物品）
        "potionWhileRouting": false, // 寻路算法是否经过血瓶；如果该项为false，则寻路算法会自动尽量绕过血瓶
        "enableViewMaps": true, // 是否支持在菜单栏中查看所有楼层的地图
        "portalWithoutTrigger": true, // 是否支持穿透。所谓穿透，即当自动寻路经过楼梯时，不触发楼层转换事件而是穿过它。
        "enableMoveDirectly": true, // 是否允许瞬间移动
    }
}

data.prototype.getFirstData = function() {
    return core.clone(this.firstData);
}

main.instance.data = new data();