
class BaseController {

    constructor(prefix) {
    }

    responder(responser, data, message = '', code) {
        data = data || {}

        if (message.length !== 0) {
            data['message'] = message
        }
        responser.status(code).json(data)
    }

}

module.exports = BaseController;
