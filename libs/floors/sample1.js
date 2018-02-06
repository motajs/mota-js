// 这里需要改楼层名，请和文件名及下面的floorId保持完全一致
// 楼层唯一标识符仅能由字母、数字、下划线组成，且不能由数字开头
// 推荐用法：第20层就用MT20，第38层就用MT38，地下6层就用MT_6（用下划线代替负号），隐藏3层用MT3h（h表示隐藏），等等
main.floors.sample1 = {
    "floorId": "sample1", // 楼层唯一标识符，需要和名字完全一致
    "title": "1", // 楼层中文名
    "name": 1, // 显示在状态栏中的层数
    "canFlyTo": true, // 该楼能否被楼传器飞到（不能的话在该楼也不允许使用楼传器）
    "canUseQuickShop": true, // 该层是否允许使用快捷商店

    "defaultGround": "ground", // 默认地面的图块ID（terrains中）
    "png": [], // // 该层默认显示的所有图片；详细用法请查看文档“自定义素材”中的说明。

    "map": [ // 地图数据，需要是13x13，建议使用地图生成器来生成
        [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
        [ 20,  0,  0,  0,201,  0,  0,  0, 82,  0,  0, 87, 20],
        [ 20,  0, 20, 20, 20, 20, 20,  0, 20,  0, 20,  0, 20],
        [ 20,202,  0,  0,  0,  0,  0,  0,202,203,  0,  0, 20],
        [ 20, 22, 20, 20, 20,  0, 20, 81, 20,202, 20,  0, 20],
        [ 20,  0,202,  0,  0,203,  0,  0,  0,  0, 20,202, 20],
        [ 20, 20, 20,  0, 20,  0, 20,  0, 20,  0, 20,202, 20],
        [ 20,  0,219,  0, 20,  0,201,  0,  0,  0,  0,  0, 20],
        [ 20,  0, 20, 20, 20,  0, 20,  0, 20, 20, 20,  0, 20],
        [ 20,  0,  0,  0,  0,  0,  0,  0, 20,  0,  0,  0, 20],
        [ 20, 20, 20,  0, 20, 20, 20, 20, 20,  0, 20,  0, 20],
        [ 20, 88,207,201,  0,  0,  0,202,205,202, 21,202, 20],
        [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
    ],
    "firstArrive": [ // 第一次到该楼层触发的事件

        
      ],
      "events": { // 该楼的所有可能事件列表
  
      },
      "changeFloor": { // 楼层转换事件；该事件不能和上面的events有冲突（同位置点），否则会被覆盖
          "11,1": {"floorId": "sample2", "stair": "downFloor"}, // 目标点：sample1层的下楼梯位置
      },
      "afterBattle": { // 战斗后可能触发的事件列表
          
      },
      "afterGetItem": { // 获得道具后可能触发的事件列表
         
      },
      "afterOpenDoor": { // 开完门后可能触发的事件列表
      }
  
  }

