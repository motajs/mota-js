var events_c12a15a8_c380_4b28_8144_256cba95f760 = 
{
	"commonEvent": {
		"Add point event": [
			{
				"type": "comment",
				"text": "By passing parameters,flag:arg1 Indicates the current added value"
			},
			{
				"type": "choices",
				"choices": [
					{
						"text": "attack+${1*flag:arg1}",
						"action": [
							{
								"type": "setValue",
								"name": "status:atk",
								"operator": "+=",
								"value": "1*flag:arg1"
							}
						]
					},
					{
						"text": "defense+${2*flag:arg1}",
						"action": [
							{
								"type": "setValue",
								"name": "status:def",
								"operator": "+=",
								"value": "2*flag:arg1"
							}
						]
					},
					{
						"text": "life+${200*flag:arg1}",
						"action": [
							{
								"type": "setValue",
								"name": "status:hp",
								"operator": "+=",
								"value": "200*flag:arg1"
							}
						]
					}
				]
			}
		],
		"Key Recovery Shop": [
			{
				"type": "comment",
				"text": "This event is referenced in the global store(Global StorekeyShop)"
			},
			{
				"type": "comment",
				"text": "Do not delete this event before dereferencing it"
			},
			{
				"type": "comment",
				"text": "Players in the Quick List (VThis public event can be used in"
			},
			{
				"type": "while",
				"condition": "1",
				"data": [
					{
						"type": "choices",
						"text": "\t[merchant,trader]Do you have extra keys you want to sell?",
						"choices": [
							{
								"text": "Yellow Key (10gold)",
								"color": [
									255,
									255,
									0,
									1
								],
								"action": [
									{
										"type": "if",
										"condition": "item:yellowKey >= 1",
										"true": [
											{
												"type": "setValue",
												"name": "item:yellowKey",
												"operator": "-=",
												"value": "1"
											},
											{
												"type": "setValue",
												"name": "status:money",
												"operator": "+=",
												"value": "10"
											}
										],
										"false": [
											"\t[merchant,trader]You dont have the yellow key!"
										]
									}
								]
							},
							{
								"text": "Blue Key (50gold)",
								"color": [
									0,
									0,
									255,
									1
								],
								"action": [
									{
										"type": "if",
										"condition": "item:blueKey >= 1",
										"true": [
											{
												"type": "setValue",
												"name": "item:blueKey",
												"operator": "-=",
												"value": "1"
											},
											{
												"type": "setValue",
												"name": "status:money",
												"operator": "+=",
												"value": "50"
											}
										],
										"false": [
											"\t[merchant,trader]You dont have the blue key!"
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
	}
}