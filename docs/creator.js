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
    "/creator/": {
        "get": {
            "tags": [
                "Creator Endpoints"
            ],
            "summary": "Get Creators List",
            "parameters": [
            ]
        }
    },
    "/creator/contests": {
        "get": {
            "tags": [
                "Creator Endpoints"
            ],
            "summary": "Get Creator's Contests List",
            "parameters": [
                token
            ]
        }
    },
    "/creator/projects": {
        "get": {
            "tags": [
                "Creator Endpoints"
            ],
            "summary": "Get Creator's Projects List",
            "parameters": [
                token
            ]
        }
    },
}