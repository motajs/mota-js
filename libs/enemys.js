function enemys() {

}

////// 初始化 //////
enemys.prototype.init = function () {
    // 怪物属性初始化定义：
    this.enemys = {
        'greenSlime': {'name': '绿头怪', 'hp': 100, 'atk': 120, 'def': 0, 'money': 1, 'experience': 1, 'special': [1,5,7,8]},
        'redSlime': {'name': '红头怪', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'blackSlime': {'name': '青头怪', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'slimelord': {'name': '怪王', 'hp': 100, 'atk': 120, 'def': 0, 'money': 10, 'experience': 0, 'special': [1,9]},
        'bat': {'name': '小蝙蝠', 'hp': 100, 'atk': 120, 'def': 0, 'money': 2, 'experience': 0, 'special': 1},
        'bigBat': {'name': '大蝙蝠', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'redBat': {'name': '红蝙蝠', 'hp': 100, 'atk': 120, 'def': 0, 'money': 5, 'experience': 0, 'special': 4},
        'vampire': {'name': '冥灵魔王', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'skeleton': {'name': '骷髅人', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'skeletonSoilder': {'name': '骷髅士兵', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'skeletonCaptain': {'name': '骷髅队长', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'ghostSkeleton': {'name': '冥队长', 'hp': 100, 'atk': 120, 'def': 0, 'money': 8, 'experience': 0, 'special': 7},
        'zombie': {'name': '兽人', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'zombieKnight': {'name': '兽人武士', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'rock': {'name': '石头人', 'hp': 100, 'atk': 120, 'def': 0, 'money': 4, 'experience': 0, 'special': 3},
        'slimeMan': {'name': '影子战士', 'hp': 100, 'atk': 0, 'def': 0, 'money': 11, 'experience': 0, 'special': [10,21], 'atkValue': 2, 'defValue': 3}, // 退化怪可以在后面写atkValue和defValue表示退化的数值
        'bluePriest': {'name': '初级法师', 'hp': 100, 'atk': 120, 'def': 0, 'money': 3, 'experience': 0, 'special': 2, 'point': 1}, // 'point'可以在打败怪物后进行加点，详见文档说明。
        'redPriest': {'name': '高级法师', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'brownWizard': {'name': '初级巫师', 'hp': 100, 'atk': 120, 'def': 0, 'money': 16, 'experience': 0, 'special': 15, 'value': 100, 'range': 2}, // 领域怪需要加value表示领域伤害的数值；range可选，代表领域伤害的范围；不加默认为1
        'redWizard': {'name': '高级巫师', 'hp': 1000, 'atk': 1200, 'def': 0, 'money': 160, 'experience': 0, 'special': 15, 'value': 200, 'zoneSquare': true}, // zoneSquare可选，代表是否九宫格伤害，true为是九宫格伤害，false或不设置为十字伤害
        'yellowGuard': {'name': '初级卫兵', 'hp': 100, 'atk': 120, 'def': 0, 'money': 10, 'experience': 0, 'special': 0},
        'blueGuard': {'name': '中级卫兵', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'redGuard': {'name': '高级卫兵', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'swordsman': {'name': '双手剑士', 'hp': 100, 'atk': 120, 'def': 0, 'money': 6, 'experience': 0, 'special': 5},
        'soldier': {'name': '冥战士', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'yellowKnight': {'name': '金骑士', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'redKnight': {'name': '红骑士', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'darkKnight': {'name': '黑骑士', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'blackKing': {'name': '黑衣魔王', 'hp': 1000, 'atk': 500, 'def': 0, 'money': 1000, 'experience': 1000, 'special': 0, 'bomb': false}, // 加入 'bomb': false 代表该怪物不可被炸弹或圣锤炸掉
        'yellowKing': {'name': '黄衣魔王', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'greenKing': {'name': '青衣武士', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'blueKnight': {'name': '蓝骑士', 'hp': 100, 'atk': 120, 'def': 0, 'money': 9, 'experience': 0, 'special': 8},
        'goldSlime': {'name': '黄头怪', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'poisonSkeleton': {'name': '紫骷髅', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'poisonBat': {'name': '紫蝙蝠', 'hp': 100, 'atk': 120, 'def': 0, 'money': 14, 'experience': 0, 'special': 13},
        'steelRock': {'name': '铁面人', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'skeletonPriest': {'name': '骷髅法师', 'hp': 100, 'atk': 100, 'def': 0, 'money': 0, 'experience': 0, 'special': 18, 'value': 20},
        'skeletonKing': {'name': '骷髅王', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'skeletonWizard': {'name': '骷髅巫师', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'redSkeletonCaption': {'name': '骷髅武士', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'badHero': {'name': '迷失勇者', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'demon': {'name': '魔神武士', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'demonPriest': {'name': '魔神法师', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'goldHornSlime': {'name': '金角怪', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'redKing': {'name': '红衣魔王', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'whiteKing': {'name': '白衣武士', 'hp': 100, 'atk': 120, 'def': 0, 'money': 17, 'experience': 0, 'special': 16},
        'blackMagician': {'name': '黑暗大法师', 'hp': 100, 'atk': 120, 'def': 0, 'money': 12, 'experience': 0, 'special': 11, 'value': 1/3, 'add': true, 'bomb': false}, // 吸血怪需要在后面添加value代表吸血比例；添加add: true可以将吸血的伤害加到自身
        'silverSlime': {'name': '银头怪', 'hp': 100, 'atk': 120, 'def': 0, 'money': 15, 'experience': 0, 'special': 14},
        'swordEmperor': {'name': '剑圣', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'whiteHornSlime': {'name': '尖角怪', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'badPrincess': {'name': '痛苦魔女', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'badFairy': {'name': '黑暗仙子', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'grayPriest': {'name': '中级法师', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'redSwordsman': {'name': '剑王', 'hp': 100, 'atk': 120, 'def': 0, 'money': 7, 'experience': 0, 'special': 6, 'n': 8}, // 多连击需要在后面指定n代表是几连击
        'whiteGhost': {'name': '水银战士', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'poisonZombie': {'name': '绿兽人', 'hp': 100, 'atk': 120, 'def': 0, 'money': 13, 'experience': 0, 'special': 12},
        'magicDragon': {'name': '魔龙', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'octopus': {'name': '血影', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'darkFairy': {'name': '仙子', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
        'greenKnight': {'name': '强盾骑士', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'experience': 0, 'special': 0},
    }
}

////// 获得一个或所有怪物数据 //////
enemys.prototype.getEnemys = function (enemyId) {
    if (!core.isset(enemyId)) {
        return this.enemys;
    }
    return this.enemys[enemyId];
}

////// 判断是否含有某特殊属性 //////
enemys.prototype.hasSpecial = function (special, test) {

    if (special instanceof Array) {
        return special.indexOf(test)>=0;
    }

    if (typeof special == 'number') {
        return special!=0 && (special%100==test||this.hasSpecial(parseInt(special/100), test));
    }

    return false;
}

////// 获得所有特殊属性的名称 //////
enemys.prototype.getSpecialText = function (enemyId) {
    if (enemyId == undefined) return "";
    var enemy = this.enemys[enemyId];
    var special = enemy.special;
    var text = [];
    if (this.hasSpecial(special, 1)) text.push("先攻");
    if (this.hasSpecial(special, 2)) text.push("魔攻");
    if (this.hasSpecial(special, 3)) text.push("坚固");
    if (this.hasSpecial(special, 4)) text.push("2连击");
    if (this.hasSpecial(special, 5)) text.push("3连击");
    if (this.hasSpecial(special, 6)) text.push((enemy.n||4)+"连击");
    if (this.hasSpecial(special, 7)) text.push("破甲");
    if (this.hasSpecial(special, 8)) text.push("反击");
    if (this.hasSpecial(special, 9)) text.push("净化");
    if (this.hasSpecial(special, 10)) text.push("模仿");
    if (this.hasSpecial(special, 11)) text.push("吸血");
    if (this.hasSpecial(special, 12)) text.push("中毒");
    if (this.hasSpecial(special, 13)) text.push("衰弱");
    if (this.hasSpecial(special, 14)) text.push("诅咒");
    if (this.hasSpecial(special, 15)) text.push("领域");
    if (this.hasSpecial(special, 16)) text.push("夹击");
    if (this.hasSpecial(special, 17)) text.push("仇恨");
    if (this.hasSpecial(special, 18)) text.push("阻击");
    if (this.hasSpecial(special, 19)) text.push("自爆");
    if (this.hasSpecial(special, 20)) text.push("无敌");
    if (this.hasSpecial(special, 21)) text.push("退化");
    if (this.hasSpecial(special, 22)) text.push("固伤");
    return text;
}

////// 获得每个特殊属性的说明 //////
enemys.prototype.getSpecialHint = function (enemy, special) {
    if (!core.isset(special)) {
        var hints = [];
        for (var i=1;i<100;i++) {
            if (this.hasSpecial(enemy.special, i)) {
                var hint=this.getSpecialHint(enemy, i);
                if (hint!='')
                    hints.push(hint);
            }
        }
        return hints;
    }

    switch (special) {
        case 1: return "先攻：怪物首先攻击";
        case 2: return "魔攻：怪物无视勇士的防御";
        case 3: return "坚固：勇士每回合最多只能对怪物造成1点伤害";
        case 4: return "2连击：怪物每回合攻击2次";
        case 5: return "3连击：怪物每回合攻击3次";
        case 6: return (enemy.n||4)+"连击： 怪物每回合攻击"+(enemy.n||4)+"次";
        case 7: return "破甲：战斗前，怪物附加角色防御的"+parseInt(100*core.values.breakArmor)+"%作为伤害";
        case 8: return "反击：战斗时，怪物每回合附加角色攻击的"+parseInt(100*core.values.counterAttack)+"%作为伤害，无视角色防御";
        case 9: return "净化：战斗前，怪物附加勇士魔防的"+core.values.purify+"倍作为伤害";
        case 10: return "模仿：怪物的攻防和勇士攻防相等";
        case 11: return "吸血：战斗前，怪物首先吸取角色的"+parseInt(100*enemy.value)+"%生命作为伤害"+(enemy.add?"，并把伤害数值加到自身生命上":"");
        case 12: return "中毒：战斗后，勇士陷入中毒状态，每一步损失生命"+core.values.poisonDamage+"点";
        case 13: return "衰弱：战斗后，勇士陷入衰弱状态，攻防暂时下降"+core.values.weakValue+"点";
        case 14: return "诅咒：战斗后，勇士陷入诅咒状态，战斗无法获得金币和经验";
        case 15: return "领域：经过怪物周围"+(enemy.range||1)+"格时自动减生命"+(enemy.value||0)+"点";
        case 16: return "夹击：经过两只相同的怪物中间，勇士生命值变成一半";
        case 17: return "仇恨：战斗前，怪物附加之前积累的仇恨值作为伤害"+(core.flags.hatredDecrease?"；战斗后，释放一半的仇恨值":"")+"。（每杀死一个怪物获得"+core.values.hatred+"点仇恨值）";
        case 18: return "阻击：经过怪物的十字领域时自动减生命"+(enemy.value||0)+"点，同时怪物后退一格";
        case 19: return "自爆：战斗后勇士的生命值变成1";
        case 20: return "无敌：勇士无法打败怪物，除非拥有十字架";
        case 21: return "退化：战斗后勇士永久下降"+(enemy.atkValue||0)+"点攻击和"+(enemy.defValue||0)+"点防御";
        case 22: return "固伤：战斗前，怪物对勇士造成"+(enemy.damage||0)+"点固定伤害，无视勇士魔防。";
        default: break;
    }
    return ""
}

////// 获得某个怪物的伤害 //////
enemys.prototype.getDamage = function (monsterId) {
    var monster = core.material.enemys[monsterId];
    var damage = this.calDamage(monster, core.status.hero.hp, core.status.hero.atk, core.status.hero.def, core.status.hero.mdef);
    if (damage >= 999999999) return damage;
    return damage + this.getExtraDamage(monster);
}

////// 获得某个怪物的额外伤害 //////
enemys.prototype.getExtraDamage = function (monster) {
    var extra_damage = 0;
    if (this.hasSpecial(monster.special, 17)) { // 仇恨
        extra_damage += core.getFlag('hatred', 0);
    }
    if (this.hasSpecial(monster.special, 22)) { // 固伤
        extra_damage += monster.damage||0;
    }
    return extra_damage;
}

////// 临界值计算 //////
enemys.prototype.getCritical = function (monsterId) {
    var monster = core.material.enemys[monsterId];
    // 坚固、模仿怪物没有临界！
    if (this.hasSpecial(monster.special, 3) || this.hasSpecial(monster.special, 10)) return "???";

    var last = this.calDamage(monster, core.status.hero.hp, core.status.hero.atk, core.status.hero.def, core.status.hero.mdef);

    if (last <= 0) return 0;

    for (var i = core.status.hero.atk + 1; i <= monster.hp + monster.def; i++) {
        var damage = this.calDamage(monster, core.status.hero.hp, i, core.status.hero.def, core.status.hero.mdef);
        if (damage < last)
            return i - core.status.hero.atk;
        last = damage;
    }
    return 0;
}

////// 临界减伤计算 //////
enemys.prototype.getCriticalDamage = function (monsterId) {
    var c = this.getCritical(monsterId);
    if (c == '???') return '???';
    if (c <= 0) return 0;
    var monster = core.material.enemys[monsterId];
    var last = this.calDamage(monster, core.status.hero.hp, core.status.hero.atk, core.status.hero.def, core.status.hero.mdef);
    if (last >= 999999999) return '???';

    return last - this.calDamage(monster, core.status.hero.hp, core.status.hero.atk + c, core.status.hero.def, core.status.hero.mdef);
}

////// 1防减伤计算 //////
enemys.prototype.getDefDamage = function (monsterId) {
    var monster = core.material.enemys[monsterId];
    var nowDamage = this.calDamage(monster, core.status.hero.hp, core.status.hero.atk, core.status.hero.def, core.status.hero.mdef);
    var nextDamage = this.calDamage(monster, core.status.hero.hp, core.status.hero.atk, core.status.hero.def + 1, core.status.hero.mdef);
    if (nowDamage >= 999999999 || nextDamage >= 999999999) return "???";
    return nowDamage - nextDamage;
}

////// 具体的伤害计算公式 //////
enemys.prototype.calDamage = function (monster, hero_hp, hero_atk, hero_def, hero_mdef) {

    var mon_hp = monster.hp, mon_atk = monster.atk, mon_def = monster.def, mon_special = monster.special;

    if (this.hasSpecial(mon_special, 20) && !core.hasItem("cross")) // 如果是无敌属性，且勇士未持有十字架
        return 999999999; // 返回无限大

    var initDamage = 0; // 战前伤害

    // 吸血
    if (this.hasSpecial(mon_special, 11)) {
        var vampireDamage = hero_hp * monster.value;

        // 如果有神圣盾免疫吸血等可以在这里写

        vampireDamage = parseInt(vampireDamage);
        // 加到自身
        if (monster.add) // 如果加到自身
            mon_hp += vampireDamage;

        initDamage += vampireDamage;
    }

    // 模仿
    if (this.hasSpecial(mon_special,10)) {
        mon_atk = hero_atk;
        mon_def = hero_def;
    }
    // 魔攻
    if (this.hasSpecial(mon_special,2)) hero_def = 0;
    // 坚固
    if (this.hasSpecial(mon_special,3) && mon_def < hero_atk - 1) mon_def = hero_atk - 1;
    if (hero_atk <= mon_def) return 999999999; // 不可战斗时请直接返回999999999

    var per_damage = mon_atk - hero_def;
    if (per_damage < 0) per_damage = 0;

    // 2连击 & 3连击 & N连击
    if (this.hasSpecial(mon_special, 4)) per_damage *= 2;
    if (this.hasSpecial(mon_special, 5)) per_damage *= 3;
    if (this.hasSpecial(mon_special, 6)) per_damage *= (monster.n||4);

    var counterDamage = 0;
    // 反击
    if (this.hasSpecial(mon_special, 8)) counterDamage += parseInt(core.values.counterAttack * hero_atk);

    // 先攻
    if (this.hasSpecial(mon_special, 1))
        initDamage += per_damage;

    // 破甲
    if (this.hasSpecial(mon_special, 7))
        initDamage += parseInt(core.values.breakArmor * hero_def);

    // 净化
    if (this.hasSpecial(mon_special, 9))
        initDamage += parseInt(core.values.purify * hero_mdef);

    var turn = parseInt((mon_hp - 1) / (hero_atk - mon_def));
    var ans = initDamage + turn * per_damage + (turn + 1) * counterDamage;
    ans -= hero_mdef;

    if (!core.flags.enableNegativeDamage)
        ans=Math.max(0, ans);

    return ans;
}

////// 获得当前楼层的怪物列表 //////
enemys.prototype.getCurrentEnemys = function (floorId) {
    floorId=floorId||core.status.floorId;
    var enemys = [];
    var used = {};
    var mapBlocks = core.status.maps[floorId].blocks;
    for (var b = 0; b < mapBlocks.length; b++) {
        if (core.isset(mapBlocks[b].event) && !(core.isset(mapBlocks[b].enable) && !mapBlocks[b].enable) && mapBlocks[b].event.cls == 'enemys') {
            var monsterId = mapBlocks[b].event.id;
            if (core.isset(used[monsterId])) continue;

            var monster = core.material.enemys[monsterId];
            var mon_hp = monster.hp, mon_atk = monster.atk, mon_def = monster.def;
            // 坚固
            if (this.hasSpecial(monster.special, 3) && mon_def < core.status.hero.atk - 1)
                mon_def = core.status.hero.atk - 1;
            if (this.hasSpecial(monster.special, 10)) {
                mon_atk=core.status.hero.atk;
                mon_def=core.status.hero.def;
            }

            var specialText = core.enemys.getSpecialText(monsterId);
            if (specialText.length>=3) specialText = "多属性...";
            else specialText = specialText.join("  ");

            enemys.push({
                'id': monsterId,
                'name': monster.name,
                'hp': mon_hp,
                'atk': mon_atk,
                'def': mon_def,
                'money': monster.money,
                'experience': monster.experience,
                'point': monster.point||0, // 加点
                'special': specialText,
                'damage': this.getDamage(monsterId),
                'critical': this.getCritical(monsterId),
                'criticalDamage': this.getCriticalDamage(monsterId),
                'defDamage': this.getDefDamage(monsterId)
            });

            used[monsterId] = true;
        }
    }

    enemys.sort(function (a, b) {
        if (a.damage == b.damage) {
            return a.money - b.money;
        }
        return a.damage - b.damage;
    });
    return enemys;
}

main.instance.enemys = new enemys();