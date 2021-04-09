const BaseController = SystemLoad.controller('BaseController');
const GenerateTokenService = SystemLoad.service('JWT/GenerateTokenService');
const LogoutService = SystemLoad.service('JWT/LogoutService');

class AuthController extends BaseController {

    constructor() {
        super("Auth");
    }

    async login(request, response) {
        try {
            const token = GenerateTokenService.create(request.user)

            const { _id, name, email } = request.user

            response.set('Authorization', token);

            this.responder(response, { _id, name, email },'', 200)
        } catch (error) {
            this.responder(response, { erro: 'Houve um erro, tente mais' }, '', 500)
        }
    }

    async logout(request, response) {
        try {
            const {authorization} = request.headers;
            await LogoutService.addToken(authorization);

            this.responder(response, {},'',204)
        } catch (error) {
            this.responder(response, { erro: 'Houve um erro, tente mais' }, '', 500)
        }
    }
}

module.exports = new AuthController();
