module.exports = {
    "properties": {
        "errors": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "msg": {
                        "type": "string"
                    },
                    "param": {
                        "type": "string"
                    },
                    "location": {
                        "type": "string",
                    }
                }
            }
        }
    }
}
