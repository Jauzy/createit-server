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
    "/payment-project/unapproved": {
        "get": {
            "tags": [
                "Project Payment Endpoints"
            ],
            "summary": "Get All Unapproved Project Payment",
            parameters: [
                token
            ]
        },
    },
    "/payment-project/approve/{paymentID}": {
        "post": {
            "tags": [
                "Project Payment Endpoints"
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
    "/payment-project/get/{paymentID}": {
        "get": {
            "tags": [
                "Project Payment Endpoints"
            ],
            "summary": "Get Payment Info",
            "parameters": [
                {
                    "in": "path",
                    "name": "paymentID",
                    "schema": {
                        "type": "string"
                    },
                    required: true
                }, token
            ]
        },
    },
    "/payment-project/update/{paymentID}": {
        "post": {
            "tags": [
                "Project Payment Endpoints"
            ],
            "summary": "Update Payment Info for Project ( Client )",
            "parameters": [
                {
                    in: 'body',
                    name: 'body',
                    schema: {
                        type: 'body',
                        properties: {
                            sender_bank: { type: 'string' },
                            sender_account_no: { type: 'string' }
                        }
                    }
                },
                {
                    "in": "path",
                    "name": "paymentID",
                    "schema": {
                        "type": "string"
                    },
                    required: true
                }, token
            ]
        },
    },
    "/payment-project/update/{paymentID}/proof": {
        "post": {
            "tags": [
                "Project Payment Endpoints"
            ],
            "summary": "Upload Proof of Payment",
            "parameters": [
                {
                    "in": "path",
                    "name": "paymentID",
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
    "/payment-project/{projectID}": {
        "get": {
            "tags": [
                "Project Payment Endpoints"
            ],
            "summary": "Get Payments from Project",
            "parameters": [
                {
                    "in": "path",
                    "name": "projectID",
                    "schema": {
                        "type": "string"
                    },
                    required: true
                }, token
            ]
        },
        "post": {
            "tags": [
                "Project Payment Endpoints"
            ],
            "summary": "Create and Update Payment for Project ( Creator )",
            "parameters": [
                {
                    in: 'body',
                    name: 'body',
                    schema: {
                        type: 'body',
                        properties: {
                            receiver_bank: { type: 'string' },
                            receiver_account_no: { type: 'string' },
                            amount: { type: 'number' },
                        }
                    }
                },
                {
                    "in": "path",
                    "name": "projectID",
                    "schema": {
                        "type": "string"
                    },
                    required: true
                }, token
            ]
        },
    },
}