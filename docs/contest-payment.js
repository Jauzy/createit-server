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
    "/payment/unapproved": {
        "get": {
            "tags": [
                "Contest Payment Endpoints"
            ],
            "summary": "Get All Unapproved Contest Payment",
            parameters: [
                token
            ]
        },
    },
    "/payment/approve/{paymentID}": {
        "post": {
            "tags": [
                "Contest Payment Endpoints"
            ],
            "summary": "Approve Payment",
            "parameters": [
                {
                    "in": "path",
                    "name": "paymentID",
                    "schema": {
                        "type": "string",
                    }
                }, token
            ]
        }
    },
    "/payment/{contestID}": {
        "get": {
            "tags": [
                "Contest Payment Endpoints"
            ],
            "summary": "Get Payment Info by Contest ID",
            "parameters": [
                {
                    "in": "path",
                    "name": "contestID",
                    "schema": {
                        "type": "string"
                    },
                    required: true
                }, token
            ]
        },
        "post": {
            "tags": [
                "Contest Payment Endpoints"
            ],
            "summary": "Create and Update Payment Info for Contest",
            "parameters": [
                {
                    "in": "path",
                    "name": "contestID",
                    "schema": {
                        "type": "string"
                    },
                    required: true
                }, token,
                {
                    in: 'body',
                    name: 'body',
                    schema: {
                        type: 'object',
                        properties: {
                            bank: { type: 'string' },
                            account_no: { type: 'string' },
                            amount: { type: 'string' },
                        }
                    }
                }
            ]
        }
    },
    "/payment/{contestID}/proof": {
        "post": {
            "tags": [
                "Contest Payment Endpoints"
            ],
            "summary": "Upload Proof of Payment",
            "parameters": [
                {
                    "in": "path",
                    "name": "contestID",
                    "schema": {
                        "type": "string",
                    }
                }, token,
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
            ]
        }
    },
}