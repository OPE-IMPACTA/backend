module.exports = {
    "properties": {
        "name": {
            "type": "string",
            "default": "Master"
        },
        "email": {
            "type": "string",
            "default": "master2@master.com"
        },
        "password": {
            "type": "string",
            "default": "12345678"
        },
        "group_id": {
            "type": "string",
            "default": "Hash do group_id"
        }
    },
    "required": ["name", "email", "password", "group_id"]
}