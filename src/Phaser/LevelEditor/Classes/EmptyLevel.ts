export default {
    "phaser": {
        "width": 0,
        "height": 0,
        "theme": "default",
        "layers" : {
            "background" : {
                "spriteSheet": "background",
                "spriteSheetType": "multi",
                "objects": [],
                "depth": 0
            },
            "objects" : [],
            "players" : {
                "spriteSheet": "player",
                "spriteSheetType": "multi",
                "objects": [],
                "depth": 2
            },
        }
    },
    "blockly": {
        "toolbox": {
            "kind": "categoryToolbox",
            "contents": [
                {
                    "kind": "category",
                    "name": "Actions",
                    "colour": "#a5a55b",
                    "contents": [
                        {
                            "type": "movement",
                            "kind": "block"
                        },
                        {
                            "type": "rotate",
                            "kind": "block"
                        },
                        {
                            "type": "changeStatus",
                            "kind": "block"
                        }
                    ]
                },
                {
                    "kind": "category",
                    "name": "Text",
                    "colour": "#e13030",
                    "contents": [
                        {
                            "type": "text",
                            "kind": "block"
                        }
                    ]
                },
                {
                    "kind": "category",
                    "name": "Numbers",
                    "colour": "#0d44ba",
                    "contents": [
                        {
                            "type": "numberSpecial",
                            "kind": "block"
                        }
                    ]
                },
                {
                    "kind": "category",
                    "name": "Loops",
                    "colour": "#36e82a",
                    "contents": [
                        {
                            "type": "for_X_times",
                            "kind": "block"
                        },
                        {
                            "type": "while_do",
                            "kind": "block"
                        }
                    ]
                },
                {
                    "kind": "category",
                    "name": "Conditions",
                    "colour": "#0b6b0c",
                    "contents": [
                        {
                            "type": "if_do",
                            "kind": "block"
                        },
                        {
                            "type": "if_else_do",
                            "kind": "block"
                        },
                        {
                            "type": "and_or",
                            "kind": "block"
                        },
                        {
                            "type": "comparator",
                            "kind": "block"
                        }
                    ]
                }
            ]
        },
        "workspaceBlocks": []
    }
};