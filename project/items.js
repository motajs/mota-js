var items_296f5d02_12fd_4166_a7c1_b5e830c9ee3a = 
{
	"yellowKey": {
		"cls": "tools",
		"name": "Yellow Key",
		"text": "A yellow door can be opened",
		"hideInToolbox": true
	},
	"blueKey": {
		"cls": "tools",
		"name": "Blue Key",
		"text": "A blue door can be opened",
		"hideInToolbox": true
	},
	"redKey": {
		"cls": "tools",
		"name": "Red Key",
		"text": "Can open a red door",
		"hideInToolbox": true
	},
	"redGem": {
		"cls": "items",
		"name": "ruby",
		"text": "attack+${core.values.redGem}",
		"itemEffect": "core.status.hero.atk += core.values.redGem * core.status.thisMap.ratio",
		"itemEffectTip": ",attack+${core.values.redGem * core.status.thisMap.ratio}",
		"useItemEffect": "core.status.hero.atk += core.values.redGem",
		"canUseItemEffect": "true"
	},
	"blueGem": {
		"cls": "items",
		"name": "sapphire",
		"text": ",defense+${core.values.blueGem}",
		"itemEffect": "core.status.hero.def += core.values.blueGem * core.status.thisMap.ratio",
		"itemEffectTip": ",defense+${core.values.blueGem * core.status.thisMap.ratio}",
		"useItemEffect": "core.status.hero.def += core.values.blueGem",
		"canUseItemEffect": "true"
	},
	"greenGem": {
		"cls": "items",
		"name": "Emerald",
		"text": ", Shield+${core.values.greenGem}",
		"itemEffect": "core.status.hero.mdef += core.values.greenGem * core.status.thisMap.ratio",
		"itemEffectTip": ", Shield+${core.values.greenGem * core.status.thisMap.ratio}",
		"useItemEffect": "core.status.hero.mdef += core.values.greenGem",
		"canUseItemEffect": "true"
	},
	"yellowGem": {
		"cls": "items",
		"name": "Topaz",
		"text": "Can add points",
		"itemEffect": "core.status.hero.hp+=1000;core.status.hero.atk+=6;core.status.hero.def+=6;core.status.hero.mdef+=10;",
		"itemEffectTip": ", all attributes improved",
		"useItemEvent": [
			{
				"type": "choices",
				"choices": [
					{
						"text": "attack+1",
						"action": [
							{
								"type": "setValue",
								"name": "status:atk",
								"operator": "+=",
								"value": "1"
							}
						]
					},
					{
						"text": "defense+2",
						"action": [
							{
								"type": "setValue",
								"name": "status:def",
								"operator": "+=",
								"value": "2"
							}
						]
					},
					{
						"text": "life+200",
						"action": [
							{
								"type": "setValue",
								"name": "status:hp",
								"operator": "+=",
								"value": "200"
							}
						]
					}
				]
			}
		],
		"canUseItemEffect": "true"
	},
	"redPotion": {
		"cls": "items",
		"name": "Red blood bottle",
		"text": ",life+${core.values.redPotion}",
		"itemEffect": "core.status.hero.hp += core.values.redPotion * core.status.thisMap.ratio",
		"itemEffectTip": ",life+${core.values.redPotion * core.status.thisMap.ratio}",
		"useItemEffect": "core.status.hero.hp += core.values.redPotion",
		"canUseItemEffect": "true"
	},
	"bluePotion": {
		"cls": "items",
		"name": "Blue Blood Bottle",
		"text": ",life+${core.values.bluePotion}",
		"itemEffect": "core.status.hero.hp += core.values.bluePotion * core.status.thisMap.ratio",
		"itemEffectTip": ",life+${core.values.bluePotion * core.status.thisMap.ratio}",
		"useItemEffect": "core.status.hero.hp += core.values.bluePotion",
		"canUseItemEffect": "true"
	},
	"yellowPotion": {
		"cls": "items",
		"name": "Yellow Blood Bottle",
		"text": ",life+${core.values.yellowPotion}",
		"itemEffect": "core.status.hero.hp += core.values.yellowPotion * core.status.thisMap.ratio",
		"itemEffectTip": ",life+${core.values.yellowPotion * core.status.thisMap.ratio}",
		"useItemEffect": "core.status.hero.hp += core.values.yellowPotion",
		"canUseItemEffect": "true"
	},
	"greenPotion": {
		"cls": "items",
		"name": "Green Blood Bottle",
		"text": ",life+${core.values.greenPotion}",
		"itemEffect": "core.status.hero.hp += core.values.greenPotion * core.status.thisMap.ratio",
		"itemEffectTip": ",life+${core.values.greenPotion * core.status.thisMap.ratio}",
		"useItemEffect": "core.status.hero.hp += core.values.greenPotion",
		"canUseItemEffect": "true"
	},
	"sword0": {
		"cls": "items",
		"name": "Broken Sword",
		"text": "A rusty sword",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 0
			}
		},
		"itemEffect": "core.status.hero.atk += 0",
		"itemEffectTip": ",attack+0"
	},
	"sword1": {
		"cls": "items",
		"name": "Iron Sword",
		"text": "A very ordinary iron sword",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 10
			}
		},
		"itemEffect": "core.status.hero.atk += 10",
		"itemEffectTip": ",attack+10"
	},
	"sword2": {
		"cls": "items",
		"name": "Silver Sword",
		"text": "A very ordinary silver sword",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 20
			}
		},
		"itemEffect": "core.status.hero.atk += 20",
		"itemEffectTip": ",attack+20"
	},
	"sword3": {
		"cls": "items",
		"name": "Knight Sword",
		"text": "A very ordinary knights sword",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 40
			}
		},
		"itemEffect": "core.status.hero.atk += 40",
		"itemEffectTip": ",attack+40"
	},
	"sword4": {
		"cls": "items",
		"name": "Holy Sword",
		"text": "A very ordinary holy sword",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 80
			}
		},
		"itemEffect": "core.status.hero.atk += 80",
		"itemEffectTip": ",attack+80"
	},
	"sword5": {
		"cls": "items",
		"name": "Holy Sword",
		"text": "A very ordinary sacred sword",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 160
			}
		},
		"itemEffect": "core.status.hero.atk += 100",
		"itemEffectTip": ",attack+100"
	},
	"shield0": {
		"cls": "items",
		"name": "Worn shield",
		"text": "A very worn iron shield",
		"equip": {
			"type": 1,
			"value": {
				"def": 0
			}
		},
		"itemEffect": "core.status.hero.def += 0",
		"itemEffectTip": ",defense+0"
	},
	"shield1": {
		"cls": "items",
		"name": "Iron Shield",
		"text": "A very ordinary iron shield",
		"equip": {
			"type": 1,
			"value": {
				"def": 10
			}
		},
		"itemEffect": "core.status.hero.def += 10",
		"itemEffectTip": ",defense+10"
	},
	"shield2": {
		"cls": "items",
		"name": "Silver Shield",
		"text": "A very ordinary silver shield",
		"equip": {
			"type": 1,
			"value": {
				"def": 20
			}
		},
		"itemEffect": "core.status.hero.def += 20",
		"itemEffectTip": ",defense+20"
	},
	"shield3": {
		"cls": "items",
		"name": "Knight Shield",
		"text": "very ordinary knights shield",
		"equip": {
			"type": 1,
			"value": {
				"def": 40
			}
		},
		"itemEffect": "core.status.hero.def += 40",
		"itemEffectTip": ",defense+40"
	},
	"shield4": {
		"cls": "items",
		"name": "Aegis",
		"text": "A very ordinary holy shield",
		"equip": {
			"type": 1,
			"value": {
				"def": 80
			}
		},
		"itemEffect": "core.status.hero.def += 80",
		"itemEffectTip": ",defense+80"
	},
	"shield5": {
		"cls": "items",
		"name": "Holy Shield",
		"text": "A very ordinary holy shield",
		"equip": {
			"type": 1,
			"value": {
				"def": 100,
				"mdef": 100
			}
		},
		"itemEffect": "core.status.hero.def += 100;core.status.hero.mdef += 100",
		"itemEffectTip": ",defense+100, Shield+100"
	},
	"superPotion": {
		"cls": "items",
		"name": "Holy Water",
		"itemEffect": "core.status.hero.hp *= 2",
		"itemEffectTip": ", health doubled",
		"useItemEffect": "core.status.hero.hp *= 2;core.playSound('Regeneration');",
		"canUseItemEffect": "true",
		"text": "Health doubled"
	},
	"book": {
		"cls": "constants",
		"name": "Monster Manual",
		"text": "You can view the attributes of each monster on the current floor",
		"hideInToolbox": true,
		"useItemEffect": "core.ui.drawBook(0);",
		"canUseItemEffect": "true"
	},
	"fly": {
		"cls": "constants",
		"name": "Floor Teleporter",
		"text": "You can freely move between floors you have visited",
		"hideInReplay": true,
		"hideInToolbox": true,
		"useItemEffect": "core.ui.drawFly(core.floorIds.indexOf(core.status.floorId));",
		"canUseItemEffect": "(function () {\n\tif (core.flags.flyNearStair && !core.nearStair()) return false;\n\treturn core.status.maps[core.status.floorId].canFlyFrom;\n})();"
	},
	"coin": {
		"cls": "constants",
		"name": "Lucky Coin",
		"text": "When holding it, you can get double gold coins by defeating monsters"
	},
	"freezeBadge": {
		"cls": "constants",
		"name": "Frozen Badge",
		"text": "Can turn the lava in front of you into flat ground",
		"useItemEffect": "(function () {\n\tvar success = false;\n\n\tvar snowFourDirections = false; // Whether it is multi-directional snowflakes; if so, change it totrue\n\tif (snowFourDirections) {\n\t\t// Multi-directional snowflakes\n\t\tfor (var direction in core.utils.scan) { // The default setting for multi-directional snowflakes is four directions. If you want to change it to eight directions, please change these twoscanChange toscan2\n\t\t\tvar delta = core.utils.scan[direction];\n\t\t\tvar nx = core.getHeroLoc('x') + delta.x,\n\t\t\t\tny = core.getHeroLoc('y') + delta.y;\n\t\t\tif (core.getBlockId(nx, ny) == 'lava') {\n\t\t\t\tcore.removeBlock(nx, ny);\n\t\t\t\tsuccess = true;\n\t\t\t}\n\t\t}\n\t} else {\n\t\tif (core.getBlockId(core.nextX(), core.nextY()) == 'lava') {\n\t\t\tcore.removeBlock(core.nextX(), core.nextY());\n\t\t\tsuccess = true;\n\t\t}\n\t}\n\n\tif (success) {\n\t\tcore.playSound('Open the interface');\n\t\tcore.drawTip(core.material.items[itemId].name + 'Successful use', itemId);\n\t} else {\n\t\tcore.playSound('Operation failed');\n\t\tcore.drawTip(\"Currently unavailable\" + core.material.items[itemId].name, itemId);\n\t\tcore.addItem(itemId, 1);\n\t\treturn;\n\t}\n})();",
		"canUseItemEffect": "true"
	},
	"cross": {
		"cls": "constants",
		"name": "cross",
		"text": "Ignore the monsters invincibility attribute after holding"
	},
	"dagger": {
		"cls": "constants",
		"name": "Dragon Slayer Dagger",
		"text": "The prop has not been defined yet"
	},
	"amulet": {
		"cls": "constants",
		"name": "talisman",
		"text": "Ignores negative terrain while holding"
	},
	"bigKey": {
		"cls": "tools",
		"name": "Big yellow door key",
		"text": "Can open all yellow doors on the current level",
		"itemEffect": "core.addItem('yellowKey', 1);\ncore.addItem('blueKey', 1);\ncore.addItem('redKey', 1);",
		"itemEffectTip": ", full key+1",
		"useItemEffect": "(function () {\n\tvar actions = core.searchBlock(\"yellowDoor\").map(function (block) {\n\t\treturn { \"type\": \"openDoor\", \"loc\": [block.x, block.y], \"async\": true };\n\t});\n\tactions.push({ \"type\": \"waitAsync\" });\n\tactions.push({ \"type\": \"tip\", \"text\": core.material.items[itemId].name + \"Successful use\" });\n\tcore.insertAction(actions);\n})();",
		"canUseItemEffect": "(function () {\n\treturn core.searchBlock('yellowDoor').length > 0;\n})();"
	},
	"greenKey": {
		"cls": "tools",
		"name": "Green Key",
		"text": "A green door can be opened"
	},
	"steelKey": {
		"cls": "tools",
		"name": "Iron door key",
		"text": "Can open an iron door"
	},
	"pickaxe": {
		"cls": "tools",
		"name": "Wall Breaker",
		"text": "Can destroy the wall in front of the warrior",
		"useItemEffect": "(function () {\n\tvar canBreak = function (x, y) {\n\t\tvar block = core.getBlock(x, y);\n\t\tif (block == null || block.disable) return false;\n\t\treturn block.event.canBreak;\n\t};\n\n\tvar success = false;\n\tvar pickaxeFourDirections = false; // Is it a multi-directional break? If so, change it totrue\n\tif (pickaxeFourDirections) {\n\t\t// Multi-directional breaking\n\t\tfor (var direction in core.utils.scan) { // The default setting is four directions. If you want to change it to eight directions, please change these twoscanChange toscan2\n\t\t\tvar delta = core.utils.scan[direction];\n\t\t\tvar nx = core.getHeroLoc('x') + delta.x,\n\t\t\t\tny = core.getHeroLoc('y') + delta.y;\n\t\t\tif (canBreak(nx, ny)) {\n\t\t\t\tcore.removeBlock(nx, ny);\n\t\t\t\tsuccess = true;\n\t\t\t}\n\t\t}\n\t} else {\n\t\t// Only break the current\n\t\tif (canBreak(core.nextX(), core.nextY())) {\n\t\t\tcore.removeBlock(core.nextX(), core.nextY());\n\t\t\tsuccess = true;\n\t\t}\n\t}\n\n\tif (success) {\n\t\tcore.playSound('Wall Breaker');\n\t\tcore.drawTip(core.material.items[itemId].name + 'Successful use', itemId);\n\t} else {\n\t\t// not available\n\t\tcore.playSound('Operation failed');\n\t\tcore.drawTip(\"Currently unavailable\" + core.material.items[itemId].name, itemId);\n\t\tcore.addItem(itemId, 1);\n\t\treturn;\n\t}\n})();",
		"canUseItemEffect": "true"
	},
	"icePickaxe": {
		"cls": "tools",
		"name": "Ice axe",
		"text": "Can destroy an ice wall in front of the warrior",
		"useItemEffect": "(function () {\n\tcore.drawTip(core.material.items[itemId].name + 'Successful use', itemId);\n\tcore.insertAction({ \"type\": \"openDoor\", \"loc\": [\"core.nextX()\", \"core.nextY()\"] });\n})();",
		"canUseItemEffect": "(function () {\n\treturn core.getBlockId(core.nextX(), core.nextY()) == 'ice';\n})();"
	},
	"bomb": {
		"cls": "tools",
		"name": "bomb",
		"text": "Can blow up the monsters in front of the warrior",
		"useItemEffect": "(function () {\n\tvar bombList = []; // List of coordinates of monsters that were blown up\n\tvar todo = []; // Post-bomb events\n\tvar money = 0,\n\t\texp = 0; // Gold and experience gained from bombs\n\n\tvar canBomb = function (x, y) {\n\t\tvar block = core.getBlock(x, y);\n\t\tif (block == null || block.disable || block.event.cls.indexOf('enemy') != 0) return false;\n\t\tvar enemy = core.material.enemys[block.event.id];\n\t\treturn enemy && !enemy.notBomb;\n\t};\n\n\tvar bomb = function (x, y) {\n\t\tif (!canBomb(x, y)) return;\n\t\tbombList.push([x, y]);\n\t\tvar id = core.getBlockId(x, y),\n\t\t\tenemy = core.material.enemys[id];\n\t\tmoney += core.getEnemyValue(enemy, 'money', x, y) || 0;\n\t\texp += core.getEnemyValue(enemy, 'exp', x, y) || 0;\n\t\tcore.push(todo, core.floors[core.status.floorId].afterBattle[x + \",\" + y]);\n\t\tcore.push(todo, enemy.afterBattle);\n\t\tcore.removeBlock(x, y);\n\t}\n\n\t// If you want to bomb in multiple directions, putfalseChange totrue\n\tif (false) {\n\t\tvar scan = core.utils.scan; // When bombing in multiple directions, the default is four directions. If you want to change to eight directions, you can change core.utils.scan2\n\t\tfor (var direction in scan) {\n\t\t\tvar delta = scan[direction];\n\t\t\tbomb(core.getHeroLoc('x') + delta.x, core.getHeroLoc('y') + delta.y);\n\t\t}\n\t} else {\n\t\t// Only fry the current\n\t\tbomb(core.nextX(), core.nextY());\n\t}\n\n\tif (bombList.length == 0) {\n\t\tcore.playSound('Operation failed');\n\t\tcore.drawTip('Currently unavailable' + core.material.items[itemId].name, itemId);\n\t\tcore.addItem(itemId, 1);\n\t\treturn;\n\t}\n\n\tcore.playSound('bomb');\n\tcore.drawTip(core.material.items[itemId].name + 'Successful use', itemId);\n\n\t// Uncomment this to get gold and experience after bombing\n\t// core.status.hero.money += money;\n\t// core.status.hero.exp += exp;\n\n\t// Uncomment this to trigger a post-war event with a bomb\n\t// if (todo.length > 0) core.insertAction(todo);\n\n})();",
		"canUseItemEffect": "true"
	},
	"centerFly": {
		"cls": "tools",
		"name": "Centrally symmetrical aircraft",
		"text": "Can fly to the center symmetrical position of the current floor",
		"useItemEffect": "core.playSound('centerFly.mp3');\ncore.clearMap('hero');\ncore.setHeroLoc('x', core.bigmap.width - 1 - core.getHeroLoc('x'));\ncore.setHeroLoc('y', core.bigmap.height - 1 - core.getHeroLoc('y'));\ncore.drawHero();\ncore.drawTip(core.material.items[itemId].name + 'Successful use');",
		"canUseItemEffect": "(function () {\n\tvar toX = core.bigmap.width - 1 - core.getHeroLoc('x'),\n\t\ttoY = core.bigmap.height - 1 - core.getHeroLoc('y');\n\tvar id = core.getBlockId(toX, toY);\n\treturn id == null;\n})();"
	},
	"upFly": {
		"cls": "tools",
		"name": "Stair climbing device",
		"text": "You can fly to the same location upstairs",
		"useItemEffect": "(function () {\n\tvar floorId = core.floorIds[core.floorIds.indexOf(core.status.floorId) + 1];\n\tif (core.status.event.id == 'action') {\n\t\tcore.insertAction([\n\t\t\t{ \"type\": \"changeFloor\", \"loc\": [core.getHeroLoc('x'), core.getHeroLoc('y')], \"floorId\": floorId },\n\t\t\t{ \"type\": \"tip\", \"text\": core.material.items[itemId].name + 'Successful use' }\n\t\t]);\n\t} else {\n\t\tcore.changeFloor(floorId, null, core.status.hero.loc, null, function () {\n\t\t\tcore.drawTip(core.material.items[itemId].name + 'Successful use');\n\t\t\tcore.replay();\n\t\t});\n\t}\n})();",
		"canUseItemEffect": "(function () {\n\tvar floorId = core.status.floorId,\n\t\tindex = core.floorIds.indexOf(floorId);\n\tif (index < core.floorIds.length - 1) {\n\t\tvar toId = core.floorIds[index + 1],\n\t\t\ttoX = core.getHeroLoc('x'),\n\t\t\ttoY = core.getHeroLoc('y');\n\t\tvar mw = core.floors[toId].width,\n\t\t\tmh = core.floors[toId].height;\n\t\tif (toX >= 0 && toX < mw && toY >= 0 && toY < mh && core.getBlock(toX, toY, toId) == null) {\n\t\t\treturn true;\n\t\t}\n\t}\n\treturn false;\n})();"
	},
	"downFly": {
		"cls": "tools",
		"name": "Downstairs Device",
		"text": "You can fly to the same location downstairs",
		"useItemEffect": "(function () {\n\tvar floorId = core.floorIds[core.floorIds.indexOf(core.status.floorId) - 1];\n\tif (core.status.event.id == 'action') {\n\t\tcore.insertAction([\n\t\t\t{ \"type\": \"changeFloor\", \"loc\": [core.getHeroLoc('x'), core.getHeroLoc('y')], \"floorId\": floorId },\n\t\t\t{ \"type\": \"tip\", \"text\": core.material.items[itemId].name + 'Successful use' }\n\t\t]);\n\t} else {\n\t\tcore.changeFloor(floorId, null, core.status.hero.loc, null, function () {\n\t\t\tcore.drawTip(core.material.items[itemId].name + 'Successful use');\n\t\t\tcore.replay();\n\t\t});\n\t}\n})();",
		"canUseItemEffect": "(function () {\n\tvar floorId = core.status.floorId,\n\t\tindex = core.floorIds.indexOf(floorId);\n\tif (index > 0) {\n\t\tvar toId = core.floorIds[index - 1],\n\t\t\ttoX = core.getHeroLoc('x'),\n\t\t\ttoY = core.getHeroLoc('y');\n\t\tvar mw = core.floors[toId].width,\n\t\t\tmh = core.floors[toId].height;\n\t\tif (toX >= 0 && toX < mw && toY >= 0 && toY < mh && core.getBlock(toX, toY, toId) == null) {\n\t\t\treturn true;\n\t\t}\n\t}\n\treturn false;\n})();"
	},
	"earthquake": {
		"cls": "tools",
		"name": "Earthquake Scroll",
		"text": "Can destroy all walls in the current layer",
		"useItemEffect": "(function () {\n\tvar indexes = [];\n\tfor (var index in core.status.thisMap.blocks) {\n\t\tvar block = core.status.thisMap.blocks[index];\n\t\tif (!block.disable && block.event.canBreak) {\n\t\t\tindexes.push(index);\n\t\t}\n\t}\n\tcore.removeBlockByIndexes(indexes);\n\tcore.redrawMap();\n\tcore.playSound('bomb');\n\tcore.drawTip(core.material.items[itemId].name + 'Successful use');\n})();",
		"canUseItemEffect": "(function () {\n\treturn core.status.thisMap.blocks.filter(function (block) {\n\t\treturn !block.disable && block.event.canBreak;\n\t}).length > 0;\n})();"
	},
	"poisonWine": {
		"cls": "tools",
		"name": "Antidote Potion",
		"text": "Can remove poison status",
		"useItemEffect": "core.triggerDebuff('remove', 'poison');",
		"canUseItemEffect": "core.hasFlag('poison');"
	},
	"weakWine": {
		"cls": "tools",
		"name": "Anti-aging Potion",
		"text": "Can remove the weakened state",
		"useItemEffect": "core.triggerDebuff('remove', 'weak');",
		"canUseItemEffect": "core.hasFlag('weak');"
	},
	"curseWine": {
		"cls": "tools",
		"name": "Curse-Removing Potion",
		"text": "Can remove cursed status",
		"useItemEffect": "core.triggerDebuff('remove', 'curse');",
		"canUseItemEffect": "core.hasFlag('curse');"
	},
	"superWine": {
		"cls": "tools",
		"name": "Universal Potion",
		"text": "Can remove all bad status",
		"useItemEffect": "core.triggerDebuff('remove', ['poison', 'weak', 'curse']);",
		"canUseItemEffect": "(function() {\n\treturn core.hasFlag('poison') || core.hasFlag('weak') || core.hasFlag('curse');\n})();"
	},
	"hammer": {
		"cls": "tools",
		"name": "Holy Hammer",
		"text": "The prop has not been defined yet"
	},
	"lifeWand": {
		"cls": "tools",
		"name": "Wand of Life",
		"text": "Can be restored100Points of health",
		"useItemEvent": [
			{
				"type": "comment",
				"text": "Restore a wand first (because one must be consumed to use the prop)"
			},
			{
				"type": "function",
				"function": "function(){\ncore.addItem('lifeWand', 1);\n}"
			},
			{
				"type": "playSound",
				"name": "Open the interface"
			},
			{
				"type": "input",
				"text": "Please enter the number of times the Life Wand has been used:(0-${item:lifeWand})"
			},
			{
				"type": "comment",
				"text": "[Accept user input] The results of the pop-up window input will be saved in“flag:input”middle\nIf you need more help, please consult the help documentation"
			},
			{
				"type": "if",
				"condition": "flag:input<=item:lifeWand",
				"true": [
					{
						"type": "setValue",
						"name": "item:lifeWand",
						"operator": "-=",
						"value": "flag:input"
					},
					{
						"type": "setValue",
						"name": "status:hp",
						"operator": "+=",
						"value": "flag:input*100"
					},
					{
						"type": "playSound",
						"name": "Regeneration"
					},
					"Successful use${flag:input}Second Life Wand, Restoration${flag:input*100}Point life."
				],
				"false": [
					{
						"type": "playSound",
						"name": "Operation failed"
					},
					"The input is illegal!"
				]
			}
		],
		"canUseItemEffect": "true"
	},
	"jumpShoes": {
		"cls": "tools",
		"name": "Jump Boots",
		"text": "Can jump two blocks forward",
		"useItemEffect": "core.playSound(\"jump\");\ncore.insertAction({ \"type\": \"jumpHero\", \"loc\": [core.nextX(2), core.nextY(2)] });",
		"canUseItemEffect": "(function () {\n\tvar nx = core.nextX(2),\n\t\tny = core.nextY(2);\n\treturn nx >= 0 && nx < core.bigmap.width && ny >= 0 && ny < core.bigmap.height && core.getBlockId(nx, ny) == null;\n})();"
	},
	"skill1": {
		"cls": "constants",
		"name": "Skill: Double Slash",
		"text": "You can turn on or off the active skill Double Slash",
		"hideInReplay": true,
		"useItemEffect": "(function () {\n\tvar skillValue = 1; // Skilledflag:skillValue, which can be used to determine the currently enabled skill; for new skills, it can be changed to2,3etc.\n\tvar skillNeed = 5; // Skills Needed\n\tvar skillName = 'Double Slash'; // Skill Name\n\n\tif (core.getFlag('skill', 0) != skillValue) { // Determine whether the skill is currently enabled\n\t\tif (core.getStatus('mana') >= skillNeed) { // Here you need to write the conditions for whether you can use the skill, such as the minimum mana value\n\t\t\tcore.playSound('Open the interface');\n\t\t\tcore.setFlag('skill', skillValue); // Open skills1\n\t\t\tcore.setFlag('skillName', skillName); // Set skill name\n\t\t} else {\n\t\t\tcore.playSound('Operation failed');\n\t\t\tcore.drawTip('Insufficient magic power, unable to activate skills');\n\t\t}\n\t} else { // Disable Skills\n\t\tcore.setFlag('skill', 0); // Turn off skill status\n\t\tcore.setFlag('skillName', 'none');\n\t}\n})();",
		"canUseItemEffect": "true"
	},
	"wand": {
		"cls": "items",
		"name": "New Items"
	},
	"pack": {
		"cls": "items",
		"name": "purse",
		"itemEffect": "core.status.hero.money += 500",
		"itemEffectTip": ",gold+500"
	}
}