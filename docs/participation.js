const token = {
    "in": "header",
    "name": "token",
    "schema": {
        "type": "string"
    },
    "required": true,
    "description": "Token from auth"
}

module.exports = {
    "/participation/": {
        "get": {
            "tags": [
                "Participation Endpoints"
            ],
            "summary": "Get All Participations",
        }
    },
    "/participation/project/{projectID}": {
        "get": {
            "tags": [
                "Participation Endpoints"
            ],
            "summary": "Get All Project Participations",
            "parameters": [
                {
                    "in": "path",
                    "name": "projectID",
                    "schema": {
                        "type": "string",
                    }
                },
            ]
        }
    },
    "/participation/contest/{contestID}": {
        "get": {
            "tags": [
                "Participation Endpoints"
            ],
            "summary": "Get All Contest Participations",
            "parameters": [
                {
                    "in": "path",
                    "name": "contestID",
                    "schema": {
                        "type": "string",
                    }
                },
            ]
        },
        "post": {
            tags: [
                'Participation Endpoints'
            ],
            summary: 'Join contest ( participate in contest as creator )',
            "parameters": [
                {
                    "in": "path",
                    "name": "contestID",
                    "schema": {
                        "type": "string",
                    }
                },
                token
            ]
        }
    },
    "/participation/image/{type}/{id}": {
        "put": {
            "tags": [
                "Participation Endpoints"
            ],
            "summary": "Upload Design",
            "parameters": [
                {
                    "in": "path",
                    "name": "type",
                    "schema": {
                        "type": "string",
                    }
                },
                {
                    "in": "path",
                    "name": "id",
                    description: 'id is target project or contest id',
                    "schema": {
                        "type": "string",
                    }
                },
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "image": {
                                "type": "object"
                            }
                        }
                    },
                    "required": true,
                    "description": "image field is an image object",
                },
                token
            ]
        }
    },
    "/participation/{participationID}/update": {
        "put": {
            "tags": [
                "Participation Endpoints"
            ],
            "summary": "Update Participation Info",
            "parameters": [
                {
                    "in": "path",
                    "name": "participationID",
                    "schema": {
                        "type": "string",
                    }
                },
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "desc": {
                                "type": "string"
                            },
                        }
                    },
                    "required": true,
                },
                token
            ]
        }
    },
    "/participation/{participationID}/rate": {
        "put": {
            "tags": [
                "Participation Endpoints"
            ],
            "summary": "Update Rating",
            "parameters": [
                {
                    "in": "path",
                    "name": "participationID",
                    "schema": {
                        "type": "string",
                    }
                },
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "rate": {
                                "type": "number",
                                description: 'user rate 0-5'
                            },
                        }
                    },
                    "required": true,
                },
                token
            ]
        }
    },
    "/participation/{participationID}/comment": {
        "put": {
            "tags": [
                "Participation Endpoints"
            ],
            "summary": "Update Comment",
            "parameters": [
                {
                    "in": "path",
                    "name": "participationID",
                    "schema": {
                        "type": "string",
                    }
                },
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "text": {
                                "type": "string",
                                description: 'comment text'
                            },
                        }
                    },
                    "required": true,
                },
                token
            ]
        }
    },
}