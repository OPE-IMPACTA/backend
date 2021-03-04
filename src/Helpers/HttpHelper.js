class HttpHelper {

    static response(response, status, result, msg) {
        return response.status(status).json({
            data: result,
            Message: msg
        });
    }
}

module.exports = HttpHelper;
