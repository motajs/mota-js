var data_a1e2fb4a_e986_4524_b0da_9b7ba7c0874d = 
{
	"main": {
		"floorIds": [
			"sample0",
			"sample1",
			"sample2",
			"MT0"
		],
		"floorPartitions": [],
		"images": [
			"bear.png",
			"bg.jpg",
			"dragon.png",
			"hero.png",
			"winskin.png"
		],
		"tilesets": [
			"magictower.png"
		],
		"animates": [
			"hand",
			"sword",
			"zone"
		],
		"bgms": [
			"bgm.mp3"
		],
		"sounds": [
			"attack.mp3",
			"bomb.mp3",
			"cancel.mp3",
			"centerFly.mp3",
			"confirm.mp3",
			"cursor.mp3",
			"door.mp3",
			"equip.mp3",
			"error.mp3",
			"floor.mp3",
			"gem.mp3",
			"icePickaxe.mp3",
			"item.mp3",
			"jump.mp3",
			"load.mp3",
			"open_ui.mp3",
			"pickaxe.mp3",
			"recovery.mp3",
			"save.mp3",
			"shop.mp3",
			"zone.mp3"
		],
		"fonts": [],
		"nameMap": {
			"Sure": "confirm.mp3",
			"Cancel": "cancel.mp3",
			"Operation failed": "error.mp3",
			"Cursor Movement": "cursor.mp3",
			"Open the interface": "open_ui.mp3",
			"Loading": "load.mp3",
			"Archive": "save.mp3",
			"Get props": "item.mp3",
			"Regeneration": "recovery.mp3",
			"bomb": "bomb.mp3",
			"Aircraft": "centerFly.mp3",
			"Open and close the door": "door.mp3",
			"Going up and down stairs": "floor.mp3",
			"jump": "jump.mp3",
			"Wall Breaker": "pickaxe.mp3",
			"Ice axe": "icePickaxe.mp3",
			"gem": "gem.mp3",
			"Blocking clamp domain": "zone.mp3",
			"Putting on and taking off equipment": "equip.mp3",
			"Background Music": "bgm.mp3",
			"attack": "attack.mp3",
			"Background Image": "bg.jpg",
			"shop": "shop.mp3",
			"field": "zone"
		},
		"levelChoose": [
			{
				"title": "Simple",
				"name": "Easy",
				"hard": 1,
				"color": [
					64,
					255,
					85,
					1
				],
				"action": [
					{
						"type": "comment",
						"text": "Write the events that need to be executed for this difficulty here"
					}
				]
			},
			{
				"title": "ordinary",
				"name": "Normal",
				"hard": 2,
				"color": [
					255,
					221,
					32,
					1
				],
				"action": []
			},
			{
				"title": "difficulty",
				"name": "Hard",
				"hard": 3,
				"color": [
					255,
					68,
					64,
					1
				],
				"action": []
			}
		],
		"equipName": [
			"arms",
			"Shield"
		],
		"startBgm": null,
		"styles": {
			"startBackground": "project/images/bg.jpg",
			"startVerticalBackground": "project/images/bg.jpg",
			"startLogoStyle": "color: black",
			"startButtonsStyle": "background-color: #32369F; opacity: 0.85; color: #FFFFFF; border: #FFFFFF 2px solid; caret-color: #FFD700;",
			"statusLeftBackground": "url(project/materials/ground.png) repeat",
			"statusTopBackground": "url(project/materials/ground.png) repeat",
			"toolsBackground": "black",
			"borderColor": [
				0,
				0,
				0,
				1
			],
			"statusBarColor": [
				255,
				255,
				255,
				1
			],
			"selectColor": [
				255,
				215,
				0,
				1
			],
			"floorChangingStyle": "background-color: black; color: white",
			"font": "Verdana"
		},
		"splitImages": [
			{
				"name": "dragon.png",
				"width": 384,
				"height": 96,
				"prefix": "dragon_"
			}
		]
	},
	"firstData": {
		"title": "Magic Tower Model",
		"name": "template",
		"version": "Ver 2.10.0",
		"floorId": "sample0",
		"hero": {
			"image": "hero.png",
			"animate": false,
			"name": "Sunlight",
			"lv": 1,
			"hpmax": 9999,
			"hp": 1000,
			"manamax": -1,
			"mana": 0,
			"atk": 100,
			"def": 100,
			"mdef": 0,
			"money": 0,
			"exp": 0,
			"equipment": [],
			"items": {
				"constants": {},
				"tools": {},
				"equips": {}
			},
			"loc": {
				"direction": "up",
				"x": 6,
				"y": 10
			},
			"flags": {},
			"followers": [],
			"steps": 0
		},
		"startCanvas": [
			{
				"type": "comment",
				"text": "Here you can use events to customize the background image of the title interface, etc."
			},
			{
				"type": "comment",
				"text": "You can also switch directly to other floors (such as a floor where the plot starts) to perform operations."
			},
			{
				"type": "previewUI",
				"action": [
					{
						"type": "fillRect",
						"x": 0,
						"y": 0,
						"width": "core._PX_ || core.__PIXELS__",
						"height": "core._PY_ || core.__PIXELS__",
						"style": [
							82,
							82,
							82,
							1
						]
					},
					{
						"type": "setAttribute",
						"align": "center"
					},
					{
						"type": "fillBoldText",
						"x": "(core._PX_ || core.__PIXELS__) / 2",
						"y": 80,
						"style": [
							255,
							255,
							255,
							1
						],
						"strokeStyle": [
							0,
							0,
							0,
							1
						],
						"font": "bold 40px Verdana",
						"text": "${core.firstData.title}"
					}
				]
			},
			{
				"type": "setValue",
				"name": "flag:selection",
				"value": "0"
			},
			{
				"type": "comment",
				"text": "Draw a dialog box in the lower right corner to display the options"
			},
			{
				"type": "previewUI",
				"action": [
					{
						"type": "fillRect",
						"x": 230,
						"y": 250,
						"width": 150,
						"height": 142,
						"radius": 10,
						"style": [
							50,
							54,
							159,
							0.85
						]
					},
					{
						"type": "strokeRect",
						"x": 230,
						"y": 250,
						"width": 150,
						"height": 142,
						"radius": 10,
						"style": [
							255,
							255,
							255,
							1
						],
						"lineWidth": 2
					},
					{
						"type": "fillBoldText",
						"x": 305,
						"y": 290,
						"style": [
							255,
							255,
							255,
							1
						],
						"font": "bold 25px Verdana",
						"text": "Start the game"
					},
					{
						"type": "fillBoldText",
						"x": 305,
						"y": 330,
						"font": "bold 25px Verdana",
						"text": "Reading a Save"
					},
					{
						"type": "fillBoldText",
						"x": 305,
						"y": 370,
						"font": "bold 25px Verdana",
						"text": "Playback video"
					}
				]
			},
			{
				"type": "while",
				"condition": "1",
				"data": [
					{
						"type": "drawSelector",
						"image": "winskin.png",
						"code": 1,
						"x": 245,
						"y": "261 + 40*flag:selection",
						"width": 120,
						"height": 40
					},
					{
						"type": "wait",
						"data": [
							{
								"case": "keyboard",
								"keycode": "13,32",
								"break": true,
								"action": [
									{
										"type": "switch",
										"condition": "flag:selection",
										"caseList": [
											{
												"case": "0",
												"action": [
													{
														"type": "comment",
														"text": "exist“Start the game”Sure"
													},
													{
														"type": "break",
														"n": 1
													}
												]
											},
											{
												"case": "1",
												"action": [
													{
														"type": "comment",
														"text": "exist“Reading a Save”Sure"
													},
													{
														"type": "callLoad"
													}
												]
											},
											{
												"case": "2",
												"action": [
													{
														"type": "comment",
														"text": "exist“Playback video”Sure"
													},
													{
														"type": "if",
														"condition": "(!core.isReplaying())",
														"true": [
															{
																"type": "function",
																"function": "function(){\ncore.chooseReplayFile()\n}"
															}
														]
													}
												]
											}
										]
									}
								]
							},
							{
								"case": "keyboard",
								"keycode": "38",
								"break": true,
								"action": [
									{
										"type": "comment",
										"text": "Cursor up key"
									},
									{
										"type": "setValue",
										"name": "flag:selection",
										"value": "(flag:selection + 2) % 3"
									}
								]
							},
							{
								"case": "keyboard",
								"keycode": "40",
								"break": true,
								"action": [
									{
										"type": "comment",
										"text": "Cursor down key"
									},
									{
										"type": "setValue",
										"name": "flag:selection",
										"value": "(flag:selection + 1) % 3"
									}
								]
							},
							{
								"case": "mouse",
								"px": [
									245,
									365
								],
								"py": [
									261,
									300
								],
								"break": true,
								"action": [
									{
										"type": "comment",
										"text": "Click“Start the game”"
									},
									{
										"type": "break",
										"n": 1
									}
								]
							},
							{
								"case": "mouse",
								"px": [
									245,
									365
								],
								"py": [
									301,
									340
								],
								"break": true,
								"action": [
									{
										"type": "comment",
										"text": "Click“Reading a Save”"
									},
									{
										"type": "callLoad"
									}
								]
							},
							{
								"case": "mouse",
								"px": [
									245,
									365
								],
								"py": [
									341,
									380
								],
								"break": true,
								"action": [
									{
										"type": "comment",
										"text": "Click“Play video”"
									},
									{
										"type": "if",
										"condition": "(!core.isReplaying())",
										"true": [
											{
												"type": "function",
												"function": "function(){\ncore.chooseReplayFile()\n}"
											}
										]
									}
								]
							}
						]
					}
				]
			},
			{
				"type": "setValue",
				"name": "flag:selection",
				"value": "null"
			},
			{
				"type": "drawSelector",
				"code": 1
			},
			{
				"type": "clearMap"
			},
			{
				"type": "function",
				"function": "function(){\ncore.control.checkBgm()\n}"
			},
			{
				"type": "if",
				"condition": "(main.levelChoose.length == 0)",
				"true": [
					{
						"type": "comment",
						"text": "No difficulty selection: start the game directly"
					}
				],
				"false": [
					{
						"type": "comment",
						"text": "Difficulty Selection: As an example, only one display selection is provided here."
					},
					{
						"type": "function",
						"function": "function(){\nvar choices = [];\nmain.levelChoose.forEach(function (one) {\n\tchoices.push({\n\t\t\"text\": one.title || '',\n\t\t\"action\": [\n\t\t\t{ \"type\": \"function\", \"function\": \"function() { core.status.hard = '\" + (one.name || '') + \"'; }\" }\n\t\t]\n\t});\n})\ncore.insertAction({ \"type\": \"choices\", \"choices\": choices });\n}"
					},
					{
						"type": "comment",
						"text": "You can also create your own waiting for user actions based on the above example to handle different difficulty differences.\nIf you want to handle it yourself, please set core.status.hard \n(For example, customjsscript:core.status.hard = 'Easy' ）"
					}
				]
			},
			{
				"type": "clearMap"
			},
			{
				"type": "comment",
				"text": "Next will executestartTextEvents in"
			},
			{
				"type": "comment",
				"text": "The status bar is hidden by default; you can use“Show Status Bar”Events are displayed."
			}
		],
		"startText": [
			{
				"type": "comment",
				"text": "Initial plot"
			},
			"HiWelcome to HTML5 Demon tower model!\n\nThis template is made by Ai Zhikui, which allows you to\nYou can also make your ownH5Magic Tower!",
			"Here is the plot at the beginning of the game.\n\nYou can write your own content here.\nCome and try it out now!"
		],
		"shops": [
			{
				"id": "shop1",
				"text": "\t[God of Greed,moneyShop]Brave warrior!, Give me${20+2*flag:shop1}Gold coins can:",
				"textInList": "1FCoin Shop",
				"mustEnable": false,
				"disablePreview": false,
				"choices": [
					{
						"text": "life+800",
						"need": "status:money>=20+2*flag:shop1",
						"action": [
							{
								"type": "comment",
								"text": "The new version of the store requires manual deduction of gold coins and increase of visit times"
							},
							{
								"type": "setValue",
								"name": "status:money",
								"operator": "-=",
								"value": "20+2*flag:shop1"
							},
							{
								"type": "setValue",
								"name": "flag:shop1",
								"operator": "+=",
								"value": "1"
							},
							{
								"type": "setValue",
								"name": "status:hp",
								"operator": "+=",
								"value": "800"
							}
						]
					},
					{
						"text": "attack+4",
						"need": "status:money>=20+2*flag:shop1",
						"action": [
							{
								"type": "comment",
								"text": "The new version of the store requires manual deduction of gold coins and increase of visit times"
							},
							{
								"type": "setValue",
								"name": "status:money",
								"operator": "-=",
								"value": "20+2*flag:shop1"
							},
							{
								"type": "setValue",
								"name": "flag:shop1",
								"operator": "+=",
								"value": "1"
							},
							{
								"type": "setValue",
								"name": "status:atk",
								"operator": "+=",
								"value": "4"
							}
						]
					}
				]
			},
			{
				"id": "shop2",
				"text": "\t[God of Greed,expShop]Brave warrior!, Just give me some experience:",
				"textInList": "1FExperience Store",
				"mustEnable": false,
				"disablePreview": true,
				"choices": [
					{
						"text": "grade+1（100experience)",
						"need": "status:exp>=100",
						"action": [
							{
								"type": "setValue",
								"name": "status:exp",
								"operator": "-=",
								"value": "100"
							},
							{
								"type": "setValue",
								"name": "status:lv",
								"operator": "+=",
								"value": "1"
							},
							{
								"type": "setValue",
								"name": "status:hp",
								"operator": "+=",
								"value": "1000"
							}
						]
					}
				]
			},
			{
				"id": "itemShop",
				"item": true,
				"textInList": "Prop Shop",
				"mustEnable": false,
				"choices": [
					{
						"id": "yellowKey",
						"number": 10,
						"money": "10",
						"sell": "5"
					}
				]
			},
			{
				"id": "keyShop",
				"textInList": "Key Recovery Shop",
				"mustEnable": false,
				"commonEvent": "Key Recovery Shop"
			}
		],
		"levelUp": [
			{
				"need": "0",
				"title": "",
				"action": [
					{
						"type": "comment",
						"text": "This is the initial level, just fill in the title"
					}
				]
			},
			{
				"need": "20",
				"title": "",
				"action": [
					{
						"type": "setValue",
						"name": "status:atk",
						"operator": "+=",
						"value": "10"
					},
					{
						"type": "setValue",
						"name": "status:def",
						"operator": "+=",
						"value": "10"
					}
				]
			},
			{
				"need": "40",
				"title": "",
				"action": [
					{
						"type": "tip",
						"text": "Congratulations on upgrading"
					}
				]
			}
		]
	},
	"values": {
		"lavaDamage": 100,
		"poisonDamage": 10,
		"weakValue": 20,
		"redGem": 3,
		"blueGem": 3,
		"greenGem": 5,
		"redPotion": 100,
		"bluePotion": 250,
		"yellowPotion": 500,
		"greenPotion": 800,
		"breakArmor": 0.9,
		"counterAttack": 0.1,
		"purify": 3,
		"hatred": 2,
		"animateSpeed": 300,
		"moveSpeed": 100,
		"statusCanvasRowsOnMobile": 3,
		"floorChangeTime": 100
	},
	"flags": {
		"statusBarItems": [
			"enableFloor",
			"enableLv",
			"enableHP",
			"enableMana",
			"enableAtk",
			"enableDef",
			"enableMDef",
			"enableMoney",
			"enableExp",
			"enableKeys",
			"enablePZF",
			"enableSkill"
		],
		"autoScale": true,
		"extendToolbar": false,
		"flyNearStair": true,
		"flyRecordPosition": false,
		"itemFirstText": false,
		"equipboxButton": false,
		"enableAddPoint": false,
		"enableNegativeDamage": false,
		"betweenAttackMax": false,
		"useLoop": false,
		"startUsingCanvas": false,
		"statusCanvas": false,
		"enableEnemyPoint": true,
		"enableGentleClick": true,
		"ignoreChangeFloor": true,
		"canGoDeadZone": false,
		"enableMoveDirectly": true,
		"enableRouteFolding": true,
		"disableShopOnDamage": false,
		"blurFg": false,
		"hideLeftStatusBar": false
	}
}