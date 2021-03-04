const Redis = SystemLoad.kernel('redis');

class BaseController {

    constructor(prefix) {
        this.rds = new Redis(prefix);
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
