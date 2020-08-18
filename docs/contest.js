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
    "/contest": {
        "get": {
            "tags": [
                "Contest Endpoints"
            ],
            "summary": "Get All Contests",
        },
        "post": {
            "tags": [
                "Contest Endpoints"
            ],
            "summary": "Create new Contest",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "category": {
                                "type": "string"
                            },
                            "subCategory": {
                                "type": "string"
                            },
                        }
                    },
                    required: true,
                },
                token
            ]
        }
    },
    "/contest/ongoing": {
        "get": {
            "tags": [
                "Contest Endpoints"
            ],
            "summary": "Get Ongoing Contests",
        }
    },
    "/contest/user": {
        "get": {
            "tags": [
                "Contest Endpoints"
            ],
            "summary": "Get User's Contests",
            "parameters": [
                token
            ]
        }
    },
    "/contest/{contestID}": {
        "get": {
            "tags": [
                "Contest Endpoints"
            ],
            "summary": "Get Contest by Id",
            "parameters": [
                { in: 'path', name: 'contestID', schema: { type: 'string' } },
                token
            ]
        },
        "put": {
            "tags": [
                "Contest Endpoints"
            ],
            "summary": "Update Contest",
            "parameters": [
                { in: 'path', name: 'contestID', schema: { type: 'string' } },
                {
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            category: { type: 'string' },
                            subCategory: { type: 'string' },
                            desc: { type: 'string' },
                            purpose: { type: 'string' },
                            industryType: { type: 'string' },
                            social: { type: 'string' },
                            creatorPermission: { type: 'string' },
                            notes: { type: 'string' },
                            durationHours: { type: 'number' },
                            pricingPack: { type: 'string' },
                            contestType: { type: 'string' },
                            status: { type: 'string' },
                            startDate: { type: 'date' },
                            winner: {type:'string'},
                        }
                    }
                },
                token
            ]
        },
        "delete": {
            "tags": [
                "Contest Endpoints"
            ],
            "summary": "Cancel Contest by Id",
            "parameters": [
                { in: 'path', name: 'contestID', schema: { type: 'string' } },
                token
            ]
        },
    },
    "/contest/reference": {
        "put": {
            "tags": [
                "Contest Endpoints"
            ],
            "summary": "Adding Reference",
            "parameters": [
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
                    "description":"image field is an image object",
                },
                token
            ]
        },
        "delete": {
            "tags": [
                "Contest Endpoints"
            ],
            "summary": "Remove Reference",
            "parameters": [
                {
                    "in": "path",
                    "name": "contestID",
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
                            "url": {
                                "type": "string"
                            }
                        }
                    },
                    "required": true,
                    "description": "Url of the reference"
                },
                token
            ]
        }
    },
}