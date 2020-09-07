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
    "/public/{creatorID}": {
        "get": {
            "tags": [
                "Users Endpoints"
            ],
            "parameters": [
                {
                    "in": "path",
                    "name": "creatorID",
                    "schema": {
                        "type": "string"
                    },
                    "description": "Id of the creator"
                }
            ],
            "summary": "Return User Public Informations"
        }
    },
    "/user": {
        "get": {
            "tags": [
                "Users Endpoints"
            ],
            "summary": "Get user information",
            "parameters": [
                {
                    "in": "header",
                    "name": "token",
                    "schema": {
                        "type": "string"
                    },
                    "required": true,
                    "description": "Token from auth"
                }
            ]
        }
    },
    "/admin/register": {
        "post": {
            "tags": [
                "Admin Endpoints"
            ],
            "summary": "Admin Register",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "name": {
                                type:"string"
                            },
                            "email": {
                                "type": "string"
                            },
                            "password": {
                                "type": "string"
                            }
                        }
                    }
                }
            ]
        }
    },
    "/client/register": {
        "post": {
            "tags": [
                "Users Endpoints"
            ],
            "summary": "Client Register",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "name": {
                                type:"string"
                            },
                            "email": {
                                "type": "string"
                            },
                            "password": {
                                "type": "string"
                            }
                        }
                    }
                }
            ]
        }
    },
    "/creator/register": {
        "post": {
            "tags": [
                "Users Endpoints"
            ],
            "summary": "Creator Register",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "name": {
                                type:"string"
                            },
                            "email": {
                                "type": "string"
                            },
                            "password": {
                                "type": "string"
                            }
                        }
                    }
                }
            ]
        }
    },
    "/login": {
        "post": {
            "tags": [
                "Users Endpoints"
            ],
            "summary": "User Login",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "type": {
                                "type": "string"
                            },
                            "email": {
                                "type": "string"
                            },
                            "password": {
                                "type": "string"
                            }
                        }
                    }
                }
            ]
        }
    },
    "/update": {
        "put": {
            "tags": [
                "Users Endpoints"
            ],
            "summary": "Update user information",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "description": "tags field only for creator type user",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": "string"
                            },
                            "email": {
                                "type": "string"
                            },
                            "address": {
                                "type": "string"
                            },
                            "phone_no": {
                                "type": "string"
                            },
                            "tags": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                token
            ]
        }
    },
    "/update/profile_pict": {
        "put": {
            "tags": [
                "Users Endpoints"
            ],
            "summary": "Update User Profile Pict",
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
                    "description": "image field is an image object",
                },
                token
            ]
        }
    },
    "/update/password": {
        "put": {
            "tags": [
                "Users Endpoints"
            ],
            "summary": "Update user password",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": "string"
                            },
                            "email": {
                                "type": "string"
                            },
                            "address": {
                                "type": "string"
                            },
                            "phone_no": {
                                "type": "string"
                            }
                        }
                    }
                },
                token
            ]
        }
    },
    "/verify/send": {
        "put": {
            "tags": [
                "Users Endpoints"
            ],
            "summary": "Send verification email",
            "parameters": [
                token
            ]
        }
    },
    "/verify/{token}": {
        "put": {
            "tags": [
                "Users Endpoints"
            ],
            "summary": "Verify User",
            "parameters": [
                {
                    in: 'path',
                    name: 'token',
                    required: true,
                    schema: {
                        type: 'string',
                    }
                }
            ]
        }
    },
    "/reset/{email}/{type}": {
        "put": {
            "tags": [
                "Users Endpoints"
            ],
            "summary": "Send reset password email",
            "parameters": [
                { in: 'path', name: 'email', schema: { type: 'string' }, required: true },
                { in: 'path', name: 'type', schema: { type: 'string' }, required: true, description: 'user type' },
            ]
        }
    },
    "/reset/{token}": {
        "put": {
            "tags": [
                "Users Endpoints"
            ],
            "summary": "Reset user password",
            "parameters": [
                {
                    in: 'path',
                    name: 'token',
                    required: true,
                    schema: {
                        type: 'string',
                    }
                },
                {
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            newPassword: { type: 'string' }
                        }
                    }
                }
            ]
        }
    },
}