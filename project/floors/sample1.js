main.floors.sample1=
{
    "floorId": "sample1",
    "title": "model 1 layer",
    "name": "1",
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "defaultGround": "grass",
    "images": [
        {
            "name": "bg.jpg",
            "canvas": "bg",
            "x": 0,
            "y": 0
        }
    ],
    "weather": [
        "snow",
        6
    ],
    "ratio": 1,
    "map": [
    [  7,131,  8,152,  9,130, 10,152,166,165,132,165,166],
    [  0,  0,  0,  0,  0,  0,  0,152,165,164,  0,162,165],
    [152,152,152,152,121,152,152,152,  0,  0,229,  0,  0],
    [ 43, 33, 44,151,  0,  0,  0,152,165,161,  0,163,165],
    [ 21, 22, 21,151,  0,  0,  0,152,166,165,  0,165,166],
    [151,  0,151,151,  0, 87,  0,152,152,152, 85,153,153],
    [  0,  0,  0,151,  0,  0,  0,152,152,221,  0,221,153],
    [  0,  0,  0,151,  0,  0,  0,121,  0,  0,  0,  0,153],
    [151,  0,151,151,  0,153,153,153,153,153,153,153,153],
    [  0,  0,  0,  0,  0,  0,  0,164,  0,  0,163,  0,  0],
    [  1,  1,  1,  1,  0, 20,  0,  0,  0,162,  0,161,  0],
    [  1,  0,123,  1,  0, 20,124,  0,121,  0,122,  0,126],
    [  1,  0,  0,  1, 88, 20,  0,  0,  0,  0,  0,  0,  0]
],
    "firstArrive": [],
    "events": {
        "1,7": [
            {
                "type": "setBlock",
                "number": "redKing",
                "loc": [
                    [
                        1,
                        5
                    ]
                ],
                "time": 1500
            },
            {
                "type": "sleep",
                "time": 500
            },
            "\t[redKing]\b[this,1,5]Welcome to the Magic Tower, you are the 100th challenger.\nIf you can defeat all my men, I will fight you one on one.\nNow you have to accept my arrangement.",
            {
                "type": "setBlock",
                "number": "blueKing",
                "loc": [
                    [
                        1,
                        6
                    ],
                    [
                        0,
                        7
                    ],
                    [
                        1,
                        8
                    ],
                    [
                        2,
                        7
                    ]
                ],
                "time": 500
            },
            "\t[hero]\b[hero]What?",
            {
                "type": "animate",
                "name": "hand",
                "loc": "hero"
            },
            {
                "type": "setValue",
                "name": "status:atk",
                "operator": "/=",
                "value": "10"
            },
            {
                "type": "setValue",
                "name": "status:def",
                "operator": "/=",
                "value": "10"
            },
            {
                "type": "hide",
                "loc": [
                    [
                        1,
                        6
                    ],
                    [
                        0,
                        7
                    ],
                    [
                        2,
                        7
                    ],
                    [
                        1,
                        8
                    ]
                ],
                "time": 500
            },
            {
                "type": "hide",
                "loc": [
                    [
                        1,
                        5
                    ]
                ],
                "time": 500
            },
            {
                "type": "hide"
            },
            {
                "type": "setCurtain",
                "color": [
                    0,
                    0,
                    0
                ],
                "time": 1250
            },
            {
                "type": "sleep",
                "time": 700
            },
            {
                "type": "changeFloor",
                "floorId": "sample1",
                "loc": [
                    1,
                    11
                ],
                "direction": "right",
                "time": 1000
            },
            {
                "type": "trigger",
                "loc": [
                    2,
                    11
                ]
            }
        ],
        "2,11": [
            "\t[Jack,thief]\b[this]Hey! Wake up! Wake up!",
            {
                "type": "setCurtain",
                "time": 1500
            },
            "\t[hero]\b[hero]Um, where am I?",
            "\t[Jack,thief]\b[this]You were captured by the devil and thrown into prison, locked up with me, but luckily I just dug a secret escape tunnel yesterday!",
            {
                "type": "openDoor",
                "loc": [
                    3,
                    11
                ]
            },
            {
                "type": "comment",
                "text": "{type: openDoor} Not only can you open“Door”, can also be used to open walls, etc."
            },
            {
                "type": "sleep",
                "time": 300
            },
            "\t[Jack,thief]\b[this]Im leaving now, good luck!",
            {
                "type": "move",
                "time": 750,
                "steps": [
                    "right:2",
                    "down:1"
                ]
            },
            "The one above ismoveEvents can beNPCetc. to move.\nFor details, please see the writing method of the theft incident in the sample.",
            "\t[hero]\b[hero]How do you run so fast?..."
        ],
        "4,2": [
            "\t[elder,man]\b[this]There are two types of stores in this tower, global stores and non-global stores.\n\nThe so-called non-global store is similar to the old man selling keys in the lower right corner. You must touch it to trigger the event.\n\nThe global store can be used directly in the quick store.",
            "\t[elder,man]\b[this]To register a global store, you need to find“Global Store”, and add your store information.",
            "\t[elder,man]\b[this]After the store information is added, it can be called at the required event{\"type\": \"openShop\"}to open the global store you added.",
            "\t[elder,man]\b[this]In the example above, the left side is a simulated51The gold coin shop on the first floor, on the right is a replica24Layer of experience store.\n\nOnce a store is visited, it can be used in the Quick Store.",
            "\t[elder,man]\b[this]If you need to disable the quick shop on a certain floor, you can set it in its floor properties.“Quick Store”.\nIf you need to permanently disable the store (until you re-open it via touchNPCOpen), use{\"type\":\"disableShop\"}",
            {
                "type": "hide",
                "time": 500
            }
        ],
        "1,0": [
            {
                "type": "openShop",
                "id": "shop1",
                "open": true
            }
        ],
        "5,0": [
            {
                "type": "openShop",
                "id": "shop2",
                "open": true
            }
        ],
        "7,7": [
            "\t[elder,man]\b[this]This is a typical killing monster, opening the door, and forced combat event.",
            "\t[elder,man]\b[this]The four arrows below represent one-way traffic and are valid when drawn on any layer.",
            {
                "type": "hide",
                "time": 500
            }
        ],
        "9,7": [
            {
                "type": "closeDoor",
                "id": "specialDoor",
                "loc": [
                    8,
                    7
                ]
            },
            {
                "type": "hide"
            }
        ],
        "10,4": [
            "\t[blackKing]\b[this]You are finally here.",
            "\t[hero]\b[hero]Let our princess go!",
            "\t[blackKing]\b[this]What if I don’t want to?",
            "\t[hero]\b[hero]No need to say more, draw your swords!",
            {
                "type": "battle",
                "loc": [
                    10,
                    2
                ]
            },
            {
                "type": "openDoor",
                "loc": [
                    8,
                    7
                ]
            },
            "\t[blackKing]I didnt expect you to become so strong.... You are awesome.\nThe princess is now in your hands, please treat her well.",
            {
                "type": "hide"
            }
        ],
        "10,0": [
            "\t[hero]\b[hero]Princess, Im here to save you~",
            "\t[Princess,princess]\b[this]Get me out! Ive had enough of this place!",
            "\t[hero]\b[hero]Dont be afraid, princess, lets go.~",
            {
                "type": "win",
                "reason": "Rescue the Princess"
            }
        ],
        "6,11": [
            "\t[Fairy,fairy]\b[this]By calling {\"type\": \"closeDoor\"} You can close a door or wall in an open space.\nFor example, the mechanism door below me.",
            {
                "type": "closeDoor",
                "id": "steelDoor",
                "loc": [
                    6,
                    12
                ]
            },
            "\t[Fairy,fairy]\b[this]By calling {\"type\": \"openDoor\"} Can open a door or hidden wall without a key.",
            {
                "type": "openDoor",
                "loc": [
                    6,
                    12
                ]
            },
            "\t[Fairy,fairy]\b[this]At the same time, you can also operate on other levels, such as the mechanism door downstairs, which is now open for you.",
            {
                "type": "openDoor",
                "loc": [
                    11,
                    10
                ],
                "floorId": "sample0"
            },
            "\t[Fairy,fairy]\b[this]If the current floor show or hide Specified time If you specify a parameter, it will be displayed with animation effect, and the specified parameter will be calculated as the fade-in and fade-out time (in milliseconds).",
            "\t[Fairy,fairy]\b[this]Come downstairs and meet me now.~",
            {
                "type": "show",
                "loc": [
                    [
                        12,
                        10
                    ]
                ],
                "floorId": "sample0"
            },
            {
                "type": "hide",
                "time": 500
            }
        ],
        "8,11": [
            {
                "type": "setValue",
                "name": "flag:man_times",
                "operator": "+=",
                "value": "1"
            },
            "\t[elder,man]\b[this]Use in text$+{}An expression can be calculated and displayed.\n",
            "\t[elder,man]\b[this]For example:\nYour current attack power is${status:atk}, defense is${status:def}.\nTen times the sum of attack and defense is${10*(status:atk+status:def)}, the product of attack and defense is${status:atk*status:def}.\nYou have${item:yellowKey}The yellow key,${item:blueKey}The blue key,${item:redKey}The red key.\nYou have${item:pickaxe}A broken,${item:bomb}A fried${item:centerFly}Fly.\nThis is your first${flag:man_times}Talk to me again.",
            "\t[elder,man]\b[this]At the same time, you can also{\"type\": \"setValue\"}To set a warriors attributes, props, or aFlag.",
            "\t[elder,man]\b[this]For example:\nNow I will improve your attack and defense50%, and then add ten times the sum of attack and defense to the health value.",
            {
                "type": "setValue",
                "name": "status:atk",
                "operator": "*=",
                "value": "1.5"
            },
            {
                "type": "setValue",
                "name": "status:def",
                "operator": "*=",
                "value": "1.5"
            },
            {
                "type": "setValue",
                "name": "status:hp",
                "operator": "+=",
                "value": "10*(status:atk+status:def)"
            },
            "\t[elder,man]\b[this]Send you again500gold,1000experience,1break2fry3fly!",
            {
                "type": "setValue",
                "name": "status:money",
                "operator": "+=",
                "value": "500"
            },
            {
                "type": "setValue",
                "name": "status:exp",
                "operator": "+=",
                "value": "1000"
            },
            {
                "type": "setValue",
                "name": "item:pickaxe",
                "operator": "+=",
                "value": "1"
            },
            {
                "type": "setValue",
                "name": "item:bomb",
                "operator": "+=",
                "value": "2"
            },
            {
                "type": "setValue",
                "name": "item:centerFly",
                "operator": "+=",
                "value": "3"
            },
            "\t[elder,man]\b[this]status:xxx Represents a certain attribute of a warrior.\ninxxxYou can obtain many items such as life, attack, defense, shield, gold coins, experience, etc.\n\nitem:xxx Represents the number of a certain item of a warrior.\nxxxFor propsIDFor details, please refer toitems.jsThe definition in .\n\nflag:xxx Represents a customFlagor variable.\nxxxforFlag/Variable names can be defined by yourself and can be composed of letters, numbers, underscores, and even Chinese characters.\nUndefined but used directlyFlagThe default value is0.",
            "\t[elder,man]\b[this]You can now resume the conversation with me and see further changes to the property values."
        ],
        "10,11": [
            {
                "type": "while",
                "condition": "true",
                "data": [
                    {
                        "type": "switch",
                        "condition": "flag:woman_times",
                        "caseList": [
                            {
                                "case": "0",
                                "action": [
                                    "\t[elder,trader]This is a complex example that will teach you how to useif Statements to make conditional decisions, and choices Provide options for the user to choose from.",
                                    "\t[elder,trader]The first time you visit I will display this text; from the second time onwards I will sell you the key.\nThe key price will increase with the number of visits.\nWhen you have sold a total of seven keys, you will be given a large yellow door key and it will disappear and never appear again.",
                                    "\t[elder,trader]The logic of this part is relatively long. Please look carefully at the writing of the sample. It is very easy to read and understand."
                                ]
                            },
                            {
                                "case": "8",
                                "action": [
                                    "\t[elder,trader]Youve already purchased enough keys. If I continue to sell you more, Ill be in danger.",
                                    "\t[elder,trader]Since you have contributed so much money to me, I will give you a big yellow door key. I hope you can use it well.",
                                    {
                                        "type": "setValue",
                                        "name": "item:bigKey",
                                        "operator": "+=",
                                        "value": "1"
                                    },
                                    "\t[elder,trader]Im leaving now. Bye.~",
                                    {
                                        "type": "hide",
                                        "time": 500
                                    },
                                    {
                                        "type": "exit"
                                    }
                                ]
                            },
                            {
                                "case": "default",
                                "action": [
                                    {
                                        "type": "choices",
                                        "text": "\t[elder,trader]Do you need a key, boy?\nI have plenty here!",
                                        "choices": [
                                            {
                                                "text": "Yellow Key (${9+flag:woman_times}gold)",
                                                "action": [
                                                    {
                                                        "type": "if",
                                                        "condition": "status:money>=9+flag:woman_times",
                                                        "true": [
                                                            {
                                                                "type": "setValue",
                                                                "name": "status:money",
                                                                "operator": "-=",
                                                                "value": "9+flag:woman_times"
                                                            },
                                                            {
                                                                "type": "setValue",
                                                                "name": "item:yellowKey",
                                                                "operator": "+=",
                                                                "value": "1"
                                                            }
                                                        ],
                                                        "false": [
                                                            "\t[elder,trader]You dont have enough money!",
                                                            {
                                                                "type": "continue"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "text": "Blue Key (${18+2*flag:woman_times}gold)",
                                                "action": [
                                                    {
                                                        "type": "if",
                                                        "condition": "status:money>=18+2*flag:woman_times",
                                                        "true": [
                                                            {
                                                                "type": "setValue",
                                                                "name": "status:money",
                                                                "operator": "-=",
                                                                "value": "18+2*flag:woman_times"
                                                            },
                                                            {
                                                                "type": "setValue",
                                                                "name": "item:blueKey",
                                                                "operator": "+=",
                                                                "value": "1"
                                                            }
                                                        ],
                                                        "false": [
                                                            "\t[elder,trader]You dont have enough money!",
                                                            {
                                                                "type": "continue"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "text": "Red Key (${36+4*flag:woman_times}gold)",
                                                "action": [
                                                    {
                                                        "type": "if",
                                                        "condition": "status:money>=36+4*flag:woman_times",
                                                        "true": [
                                                            {
                                                                "type": "setValue",
                                                                "name": "status:money",
                                                                "operator": "-=",
                                                                "value": "36+4*flag:woman_times"
                                                            },
                                                            {
                                                                "type": "setValue",
                                                                "name": "item:redKey",
                                                                "operator": "+=",
                                                                "value": "1"
                                                            }
                                                        ],
                                                        "false": [
                                                            "\t[elder,trader]You dont have enough money!",
                                                            {
                                                                "type": "continue"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "text": "leave",
                                                "action": [
                                                    {
                                                        "type": "exit"
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
                        "name": "flag:woman_times",
                        "operator": "+=",
                        "value": "1"
                    }
                ]
            }
        ],
        "12,11": [
            "\t[elder,recluse]\b[this]use {\"type\":\"input\"} A pop-up window can be used to request players to enter numbers",
            "\t[elder,recluse]\b[this]For example: an input window will pop up, and your input result will be added directly to your attack power.",
            {
                "type": "input",
                "text": "Please enter the value you want to increase the attack power:"
            },
            {
                "type": "if",
                "condition": "(flag:input>0)",
                "true": [
                    {
                        "type": "setValue",
                        "name": "status:atk",
                        "operator": "+=",
                        "value": "flag:input"
                    },
                    {
                        "type": "tip",
                        "text": "Operation successful, attack+${flag:input}"
                    },
                    "Operation successful, attack+${flag:input}"
                ],
                "false": []
            },
            "\t[elder,recluse]\b[this]For details, please refer to the writing method of this event in the template."
        ]
    },
    "changeFloor": {
        "4,12": {
            "floorId": "sample0",
            "loc": [
                6,
                0
            ]
        },
        "5,5": {
            "floorId": "sample2",
            "stair": "downFloor",
            "direction": "up"
        },
        "10,12": null
    },
    "afterBattle": {
        "9,6": [
            {
                "type": "setValue",
                "name": "flag:door",
                "operator": "+=",
                "value": "1"
            }
        ],
        "11,6": [
            {
                "type": "setValue",
                "name": "flag:door",
                "operator": "+=",
                "value": "1"
            }
        ]
    },
    "afterGetItem": {},
    "afterOpenDoor": {},
    "cannotMove": {},
    "bgmap": [

],
    "fgmap": [

],
    "autoEvent": {
        "10,5": {
            "0": {
                "condition": "flag:door==2",
                "currentFloor": true,
                "priority": 0,
                "delayExecute": false,
                "multiExecute": false,
                "data": [
                    {
                        "type": "openDoor"
                    }
                ]
            },
            "1": null
        }
    },
    "width": 13,
    "height": 13,
    "beforeBattle": {}
}