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
    '/payment-event': {
        get: {
            tags: [
                "Event Payment Endpoints"
            ],
            summary: "Get All Unapproved Payments",
            parameters: [
                token
            ]
        }
    },
    '/payment-event/user': {
        get: {
            tags: [
                "Event Payment Endpoints"
            ],
            summary: "Get All User Payments",
            parameters: [
                token
            ]
        }
    },
    '/payment-event/{paymentID}/approve': {
        put: {
            tags: [
                "Event Payment Endpoints"
            ],
            summary: "Approve Payment by Admin",
            parameters: [
                token,
                {
                    in: 'path',
                    required: true,
                    name: 'paymentID',
                    schema: {
                        type: "string"
                    }
                }
            ]
        }
    },
    '/payment-event/{paymentID}/proof': {
        put: {
            tags: [
                "Event Payment Endpoints"
            ],
            summary: "Upload Proof of Payment",
            parameters: [
                token,
                {
                    in: 'path',
                    required: true,
                    name: 'paymentID',
                    schema: {
                        type: "string"
                    }
                },
                {
                    in: 'body',
                    required: true,
                    name: 'body',
                    description: "multipart/formdata, image is image object",
                    schema: {
                        type: "object",
                        properties: {
                            image: {
                                type: "object"
                            }
                        }
                    }
                }
            ]
        }
    },
    '/payment-event/{paymentID}': {
        put: {
            tags: [
                "Event Payment Endpoints"
            ],
            summary: "Update Payment",
            parameters: [
                token,
                {
                    in: 'path',
                    required: true,
                    name: 'paymentID',
                    schema: {
                        type: "string"
                    }
                },
                {
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: {
                        type: "object",
                        properties: {
                            bank: {
                                type: "string"
                            },
                            account_no: {
                                type: "string"
                            }
                        }
                    }
                }
            ]
        },
        delete: {
            tags: [
                "Event Payment Endpoints"
            ],
            summary: "Delete Payment",
            parameters: [
                token,
                {
                    in: 'path',
                    required: true,
                    name: 'paymentID',
                    schema: {
                        type: "string"
                    }
                },
            ]
        },
        get: {
            tags: [
                "Event Payment Endpoints"
            ],
            summary: "Get Payment By ID",
            parameters: [
                {
                    in: 'path',
                    required: true,
                    name: 'paymentID',
                    schema: {
                        type: "string"
                    }
                },
            ]
        }
    },
    '/payment-event/event/{eventID}': {
        post: {
            tags: [
                "Event Payment Endpoints"
            ],
            summary: "Create new Payment to Event",
            parameters: [
                token,
                {
                    in: 'path',
                    required: true,
                    name: 'eventID',
                    schema: {
                        type: "string"
                    }
                },
                {
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            bank: {
                                type: "string"
                            },
                            account_no: {
                                type: "string"
                            }
                        }
                    }
                }
            ]
        },
        get: {
            tags: [
                "Event Payment Endpoints"
            ],
            summary: "Get All Payment From Event",
            parameters: [
                {
                    in: 'path',
                    required: true,
                    name: 'eventID',
                    schema: {
                        type: "string"
                    }
                },
            ]
        }
    },
}