const BaseController = SystemLoad.controller('BaseController');
const GenerateTokenService = SystemLoad.service('JWT/GenerateTokenService');
const LogoutService = SystemLoad.service('JWT/LogoutService');
const HttpHelper = SystemLoad.helper('HttpHelper');

class AuthController extends BaseController {

    constructor() {
        super("Auth");
    }

    async login(request, response) {
        try {
            const token = GenerateTokenService.create(request.user)
            const { _id, name, email } = request.user
            response.set('Authorization', token);

            HttpHelper.response(response, 200, { _id, name, email });
        } catch (error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }

    async logout(request, response) {
        try {
            const {authorization} = request.headers;
            await LogoutService.addToken(authorization);
            
            HttpHelper.response(response, 204, '');
        } catch (error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }
}

module.exports = new AuthController();
