module.exports = {
    "properties": {
        "project_id": {
            "type": "string"
        },
        "user_id": {
            "type": "string",
        },
        "description": {
            "type": "string",
        },
        "startDate": {
            "type": "string",
        },
        "endDate": {
            "type": "string",
        },
        "hours": {
            "type": "string",
        }
    },
    "required": ["project_id", "user_id", "description", "startDate", "hours"]
}