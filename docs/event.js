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
    '/event': {
        get: {
            tags: [
                "Event Endpoints"
            ],
            "summary": "Get All Events",
        },
        post: {
            tags: [
                "Event Endpoints"
            ],
            "summary": "Create New Event",
            parameters: [
                token,
                {
                    in: "body",
                    name: "body",
                    required: true,
                    description: "multipart/formdata, image is image object",
                    schema: {
                        type: "object",
                        properties: {
                            "image": {
                                "type": "object"
                            },
                            title: {
                                type: "string"
                            },
                            host: {
                                type: "string"
                            },
                            event_date: {
                                type: "date"
                            },
                            due_date: {
                                type: 'date'
                            },
                            event_type: {
                                type: "string"
                            },
                            desc: {
                                type: "string"
                            },
                            price: {
                                type: "number"
                            }
                        }
                    }
                }
            ]
        }
    },
    "/event/{eventID}": {
        "put": {
            "tags": [
                "Event Endpoints"
            ],
            "summary": "Update Event",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "properties": {
                            title: {
                                type: "string"
                            },
                            host: {
                                type: "string"
                            },
                            event_date: {
                                type: "date"
                            },
                            due_date: {
                                type: 'date'
                            },
                            event_type: {
                                type: "string"
                            },
                            desc: {
                                type: "string"
                            },
                            price: {
                                type: "number"
                            }
                        }
                    },
                    "required": true,
                },
                token,
                {
                    "in": "path",
                    "name": "eventID",
                    "schema": {
                        "type": "string",
                    },
                    "required": true,
                },
            ]
        },
        delete: {
            "tags": [
                "Event Endpoints"
            ],
            "summary": "Delete Event",
            parameters: [
                token,
                {
                    "in": "path",
                    "name": "eventID",
                    "schema": {
                        "type": "string",
                    },
                    "required": true,
                },
            ]
        },
        get: {
            "tags": [
                "Event Endpoints"
            ],
            "summary": "Get Event By ID",
            parameters: [
                {
                    "in": "path",
                    "name": "eventID",
                    "schema": {
                        "type": "string",
                    },
                    "required": true,
                },
            ]
        }
    },
    "/event/{eventID}/image": {
        put: {
            tags: [
                "Event Endpoints"
            ],
            summary: "Update Event Image",
            parameters: [
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
                {
                    "in": "path",
                    "name": "eventID",
                    "schema": {
                        "type": "string",
                    },
                    "required": true,
                },
                token,
            ]
        }
    }
}