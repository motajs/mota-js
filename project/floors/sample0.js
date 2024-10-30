main.floors.sample0=
{
    "floorId": "sample0",
    "title": "model 0 layer",
    "name": "0",
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "defaultGround": "ground",
    "images": [],
    "bgm": "bgm.mp3",
    "ratio": 1,
    "map": [
    [  0,  0,220,  0,  0, 20, 87,  3, 58, 59, 60, 61, 64],
    [  0,246,  0,246,  0, 20,  0,  3, 57, 72, 63, 43, 44],
    [219,  0,  0,  0,219, 20,  0,  3, 53, 54, 55, 56, 69],
    [ 20, 20,125, 20, 20, 20,  0,  3, 49, 50, 51, 52, 68],
    [251,247,256,234,248,  6,  0,  3, 35, 36, 46, 47, 48],
    [  6,  6,125,  6,  6,  6,  0,  3,  0,  0,  0,  0,  0],
    [208,227,212,216,278,  5,  0,  1,  1,  1,319,  1,  1],
    [201,205,217,215,224,  5,  0,  1, 27, 28, 29, 30, 31],
    [  5,  5,125,  5,  5,  5,  0,  1, 21, 22, 23, 24, 26],
    [  0,  0,263,  0,  0,  0, 45,  1,  1,  1,121,  1,  1],
    [  4,  4,133,  4,  4,  4,  0,  0,  0,  0,  0, 85,124],
    [ 87, 11, 12, 13, 14,  4,  4,  2,  2,122,  2,  2,  2],
    [ 88, 89, 90, 91, 92, 93, 94,  2, 81, 82, 83, 84, 86]
],
    "firstArrive": [
        {
            "type": "setText",
            "background": "winskin.png",
            "time": 0
        },
        "\t[Sample Tips]The first time you reach a certain level, you can trigger firstArrive event, which can be similar toRMXPIn“Automatically execute scripts”.\n\nThis event supports all event types and is often used to trigger conversations, for example:",
        "\t[hero]\b[up,hero]Who am I? Where do I come from? Where am I going?",
        "\t[Fairy,fairy]You ask me...I dont know either....",
        "This level mainly introduces props, doors, monsters, etc. Various information about events will be described in more detail in the next level."
    ],
    "events": {
        "2,10": [
            "\t[Girl,npc0]\b[this]These are barricades, stairs, portals.",
            "\t[Girl,npc1]\b[this]The damage value of the blood web, the damage value of each step after poisoning, and the value of the attack and defense reduction when weakened are all in the full tower attributes (shortcut keyB) of the global value (values) is defined in .\n\nRoadblocks will also be automatically routed around as much as possible.",
            "\t[Girl,npc2]\b[this]Stairs and portals need to be selected on the map (shortcut keyX)of“Floor conversion”To define the target floor and location, refer to the existing writing methods in the template.",
            {
                "type": "hide",
                "time": 500
            }
        ],
        "2,5": [
            "\t[elder,wizard]\b[this]Imitation, bloodsucking, poisoning, weakening, curse.\n\nPlease note that blood suckers need to be setvalueThis is the blood-sucking value. Please refer to the writing method of the Dark Mage in the template.",
            {
                "type": "hide",
                "time": 500
            }
        ],
        "2,3": [
            "\t[elder,wizard]\b[this]Field, pincer attack.\nPlease note that the area monster needs to be setvalueFor the damage value, please refer to the writing method of the junior wizard in the template.",
            "\t[elder,wizard]\b[this]When field, sniping, laser and flanking occur at the same time, field, sniping, laser are calculated first (calculated at the same time), and then flanking is calculated.\nAutomatic pathfinding will also try to avoid these areas.",
            {
                "type": "hide",
                "time": 500
            }
        ],
        "12,10": {
            "trigger": null,
            "enable": false,
            "noPass": null,
            "displayDamage": true,
            "data": [
                "\t[Fairy,fairy]\b[this]Only after enabling events upstairs can you see me and talk to me to trigger events.",
                {
                    "type": "hide",
                    "time": 500
                }
            ]
        },
        "2,8": [
            "\t[elder,wizard]\b[this]These are all kinds of monsters, and the data of all monsters is in project Folder enemys.js in settings.\n(Note that enemys, rather than enemies）",
            "\t[elder,wizard]\b[this]These monsters are:\n\\i[greenSlime]ordinary,\\i[bat]First attack,\\i[bluePriest]Magic Attack,\\i[rock]Sturdy,\\i[swordsman]2batter,\\i[vampire]Multiple combos,\\i[redKnight]Armor Break,\\i[ghostSoldier]Counterattack,\\i[slimeman]Purification.",
            "\t[elder,wizard]\b[this]Triggered after defeating the monster afterBattle event.\n\nVarious information about the event will be described in more detail on the next level.",
            {
                "type": "hide",
                "time": 500
            }
        ],
        "9,11": [
            "\t[elder,trader]\b[this]These are doors that require corresponding keys to open.\nThe door of the mechanism must be opened using a special method.",
            "\t[elder,trader]\b[this]Can be triggered after opening the door afterOpenDoor event.\n\nVarious information about the event will be described in more detail on the next level.",
            {
                "type": "hide",
                "time": 500
            }
        ],
        "10,9": [
            "\t[elder,man]\b[down,null]These are some of the props supported by this template.\n\nProps are divided into items,constants,tools,equips Four categories.\nitems These are items that can be picked up and used immediately, such as gems, blood bottles, etc.\nconstants These are permanent items, such as Monster Manuals, Floor Teleporters, Lucky Coins, etc.\ntools These are consumable items, such as pickaxes, bombs, and centrally symmetrical aircraft.\nequips For equipment, such as swords and shields.",
            "\t[elder,man]\b[up]Regarding the prop effects, defined inprojectFolderitems.jsmiddle.\nCurrently, most props have default behaviors. If you have customized needs, please modify the block properties of the props.",
            "\t[elder,man]\b[up]Can be triggered after picking up the props afterGetItem event.\n\nVarious information about the event will be described in more detail on the next level.",
            {
                "type": "hide",
                "time": 500
            }
        ]
    },
    "changeFloor": {
        "6,0": {
            "floorId": "sample1",
            "stair": "downFloor"
        },
        "0,11": {
            "floorId": "sample0",
            "loc": [
                0,
                12
            ]
        },
        "0,12": {
            "floorId": "sample0",
            "stair": "upFloor"
        },
        "1,12": {
            "floorId": "sample0",
            "loc": [
                1,
                12
            ]
        },
        "2,12": {
            "floorId": "sample0",
            "loc": [
                2,
                12
            ]
        },
        "3,12": {
            "floorId": "sample0",
            "loc": [
                6,
                1
            ],
            "direction": "up"
        },
        "4,12": {
            "floorId": "sample0",
            "loc": [
                0,
                9
            ],
            "direction": "left",
            "time": 1000
        },
        "5,12": {
            "floorId": "sample0",
            "loc": [
                6,
                10
            ],
            "time": 0,
            "portalWithoutTrigger": false
        },
        "6,12": {
            "floorId": "sample0",
            "loc": [
                10,
                10
            ],
            "direction": "left",
            "time": 1000
        }
    },
    "afterBattle": {
        "2,6": [
            "\t[ghostSoldier]\b[this]No way, how could you defeat me!\n(An event triggered by defeating a monster)"
        ],
        "0,9": [
            "This is a height of 48 pixels instead of 32 Pixel enemies.\nHigh enemy materials are stored in materials In folder enemy48.png part."
        ]
    },
    "afterGetItem": {
        "9,1": [
            "Skill support depends on the status bar“magic”and script editing“Key processing”, see the help documentation for details“Personalization”One section."
        ],
        "12,2": [
            "The jumping sounds of the jumping boots and support monsters are added by script.\nIf you want to add sound effects to any jump command, please refer to the help document“script——Replicate Function”chapter."
        ],
        "8,3": [
            "Does the bomb only blow up the monster in front of it or the monsters in four or even eight directions?\nBy its tile properties (shortcut keyC)“Effects”Decide.\nFor monsters that cannot be blown up, please check the box in the monsters tile properties.“Do not fry”,\nPlease refer to the writing methods of the Devil in Black and the Dark Wizard in the template.\nV2.8.1Starting from now, bombing monsters can increase the amount of gold./Triggers a post-war event, see the notes on its usage effects for details."
        ],
        "10,3": [
            "“Go upstairs”and“Go downstairs”The target layer is the whole tower attribute (shortcut keyB)of“Floor List”Determined by the order."
        ],
        "12,3": [
            "If you want to make props like the Life Wand that can be used in batches, please refer to the Life Wand block properties (shortcut keyB)middle\n useItemEvent The way of writing.\nThe basic principle is to use [Accept User Input] to let the player enter the number of items they want to use in the pop-up window, and then determine whether the players input is legal. If the input is legal, the corresponding number of items will be deducted and the item effects will be settled.\nIt should be noted that when using an item, an item will be consumed first, so remember to edit it. useItemEvent Use first core.addItem Restore an item."
        ],
        "8,4": [
            "The item category of Sword and Shield is set toequipsTo equip,\nIf set toitemsThe attribute will be increased directly.",
            "In the whole tower properties (shortcut keyB) to set whether to enable the equipment bar button.\nIf enabled the loadout button will replace the upload button.\nRegardless of whether it is enabled or not, the player can double-click the inventory button to call out the equipment inventory."
        ],
        "9,4": [
            "The type of equipment is determined by the attributes of the entire tower (shortcut keyB)“Equipment Slot”Decide.\nEach piece of equipment“type”It is“Equipment Slot”In the index, for example, by default 0 Represents weapons.\nAt the same time, only the equipment in the first equipment slot can“Normal attack animation”The properties will take effect."
        ],
        "10,4": [
            "Each floor“Kelou Chuan”The checkbox determines whether the floor can be flown to.\n\nWarriors cannot use floor teleporters on floors that cannot be flown to.",
            "The order of the floors you fly is determined by the properties of the entire tower (shortcut keyB)“Floor List”Determined.\n\nWhether the floor transmitter must be used near the stairs is determined by the system switch in the overall tower properties."
        ],
        "11,4": [
            "Whether the wall-breaking pickaxe breaks the wall in front of it or the walls in all four directions is determined by its block properties (shortcut keyC)of“Effects”Decide.\nWhich tiles (except monsters and props) can be broken is determined by the tile properties of the tile.“Can break shock”Decide."
        ],
        "12,4": [
            "exist 2.8.1 After the update, the ice blocks that can be destroyed by the ice pick were moved to animates Down.\nIf you want to make an item that can remove a specific tile with a specific trigger, you can refer to the Icebreaker Item Block Properties.\n useItemEffect and canUseItemEffect The way of writing."
        ],
        "11,8": [
            "Since there is not enough space in the status bar, the Iron Gate Key (and possibly the Green Key, depending on whether the system switch of the entire tower attributes is checked or not) will be placed in the prop bar.\nWhen you encounter a green door or an iron door, the key will still be used to open the door automatically."
        ],
        "12,8": [
            "The item is the Big Yellow Door Key by default. If you want to change it to a key box, just modify its block properties (shortcut keyC)of“Prop Category”foritemsThats it."
        ],
        "8,7": [
            "To modify the effects of consumables, go to the full tower properties (shortcut keyB), find and modifyvalues(Global value) The corresponding specific value can be used.\nIf you have advanced requirements (such as changes in gem values in each area), please modify the floor properties (shortcut keyV) The bottom“Gem Blood Bottle Effect”.\nIf you have more advanced needs, please refer to the help documentation."
        ],
        "11,7": [
            "Similar to the Big Yellow Door Key, if you set the Yellow Gem tile property to items , then the yellow gem will trigger when it is picked up itemEffect Effect.\n\nNote: Touch or use events (useItemEvent)right items,tools,constants Both work.\nThis means that if the tile property of a yellow gem is items , then when you pick up a yellow gem, it will not go into your backpack, and its“Pick up and use”and“Touch or use event”will be triggered."
        ],
        "12,7": [
            "Due to the existence of attribute values such as lifesucking, flanking, and purification, players may want to avoid blood bottles and emeralds as much as possible when automatically finding their way.\nThey can turn this feature on and off themselves in the game settings."
        ]
    },
    "afterOpenDoor": {
        "11,12": [
            "You opened a green door, triggering a afterOpenDoor event."
        ],
        "10,6": [
            "This is a door with a height of 48 pixels instead of 32 Pixel door.\nHigh door and highNPCThe materials are stored in materials In folder npc48.png part."
        ]
    },
    "cannotMove": {},
    "bgmap": [

],
    "fgmap": [
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,10169,  0,10177,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,10170,  0,10185,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,10169,  0,10179,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,10172,  0,10180,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,10186,  0,10181,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,10187,  0,10182,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,10188,  0,10183,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
],
    "width": 13,
    "height": 13,
    "autoEvent": {},
    "beforeBattle": {},
    "cannotMoveIn": {}
}