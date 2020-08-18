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
    "/project/": {
        "post": {
            "tags": [
                "Project Endpoints"
            ],
            "summary": "Create new Project",
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
                    "required": true,
                },
                token
            ]
        },
        "get": {
            "tags": [
                "Project Endpoints"
            ],
            "summary": "Get All Projects",
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
                    "required": true,
                },
                token
            ]
        }
    },
    "/project/user": {
        "get": {
            "tags": [
                "Project Endpoints"
            ],
            "summary": "Get All User's Project",
            "parameters": [
                token
            ]
        }
    },
    "/project/{projectID}/reference": {
        "put": {
            "tags": [
                "Project Endpoints"
            ],
            "summary": "Adding Reference",
            "parameters": [
                {
                    "in": "path",
                    "name": "projectID",
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
        },
        "delete": {
            "tags": [
                "Project Endpoints"
            ],
            "summary": "Remove Reference",
            "parameters": [
                {
                    "in": "path",
                    "name": "projectID",
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
    "/project/{projectID}": {
        "get": {
            "tags": [
                "Project Endpoints"
            ],
            "summary": "Get Project by Id",
            "parameters": [
                { in: 'path', name: 'projectID', schema: { type: 'string' } },
                token
            ]
        },
        "put": {
            "tags": [
                "Project Endpoints"
            ],
            "summary": "Update Project",
            "parameters": [
                { in: 'path', name: 'projectID', schema: { type: 'string' } },
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
                            budget: { type: 'string' },
                            status: { type: 'string' },
                            startDate: { type: 'date' },
                        }
                    }
                },
                token
            ]
        },
        "delete": {
            "tags": [
                "Project Endpoints"
            ],
            "summary": "Cancel Project by Id",
            "parameters": [
                { in: 'path', name: 'projectID', schema: { type: 'string' } },
                token
            ]
        },
    },
    "/project/{projectID}/join": {
        "put": {
            "tags": [
                "Project Endpoints"
            ],
            "summary": "Join Project",
            "parameters": [
                { in: 'path', name: 'projectID', schema: { type: 'string' } },
                token
            ]
        },
    },
    "/project/{projectID}/approve/{userID}": {
        "put": {
            "tags": [
                "Project Endpoints"
            ],
            "summary": "Join Project",
            "parameters": [
                { in: 'path', name: 'projectID', schema: { type: 'string' } },
                { in: 'path', name: 'userID', schema: { type: 'string' }, description: 'creator id who joined project and waiting for confirmation' },
                token
            ]
        },
    },
}