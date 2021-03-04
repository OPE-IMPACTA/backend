const crypto = require('crypto')
const bcrypt = require('bcrypt');

const BaseController = SystemLoad.controller('BaseController');
const UserRepository = SystemLoad.repository('UserRepository');
const GenerateTokenService = SystemLoad.service('JWT/GenerateTokenService');
const LogoutService = SystemLoad.service('JWT/LogoutService');
const mailer = SystemLoad.service('SendGrid/mailer')
const { forgotPasswordHtml, confirmResetPasswordHtml } = SystemLoad.template('mail/auth/AuthTemplates')

class AuthController extends BaseController {

    constructor() {
        super("Auth");
    }

    async login(request, response) {
        const token = GenerateTokenService.create(request.user);
        const { _id, name, email } = request.user

        this.#log("Logado", request.user._id);

        response.set('Authorization', token);

        this.responder(response, { _id, name, email },'', 200)
    }

    async logout(request, response) {
        try {
            const {authorization} = request.headers;
            await LogoutService.addToken(authorization);

            this.#log("Deslogado", request.user._id);

            this.responder(response, {},'',204)
        } catch (error) {
            this.responder(response, {erro: error.message}, '', 500)
        }
    }

    generateToken(size) {
        return crypto.randomBytes(size).toString('hex')
    }

    generateDateExpires() {
        const now = new Date()
        now.setHours(now.getHours() + 1)
        return now
    }

    async forgotPassword(request, response) {

        const { email, name } = request.body
        const passwordResetToken = this.generateToken(20)
        const passwordResetExpires = this.generateDateExpires()

        try {
            await UserRepository.updateByEmail(email, { passwordResetToken, passwordResetExpires })
            let link = "http://" + request.headers.host + "/auth/reset_password/" + passwordResetToken;
            link = `http://${request.headers.host}/auth/reset_password/${passwordResetToken}`
            const text = forgotPasswordHtml(name, link)

            const result = await mailer.sendMail(email, process.env.FROM_EMAIL, 'Solicitação de mudança de senha', text)
            if (result)
                this.responder(response, { email: email, message: `Um e-mail de redefinição foi enviado para o ${ email }.` }, '', 200)

        } catch (err) {
            this.responder(response, {}, 'Erro em esqueci a senha, tente novamente', 400)
        }
    }

    async resetPassword(request, response) {
        try {
            const resetPassword = {
                password: request.body.password,
                passwordResetToken: null,
                passwordResetExpires: null
            }

            await UserRepository.updateById(request.password._id, resetPassword)
            const text = confirmResetPasswordHtml(request.password.name)
            await mailer.sendMail(request.password.email, process.env.FROM_EMAIL, 'Confirmação de mudança de senha', text)

            this.responder(response, { email: request.password.email, message: `Senha resetada com sucesso` }, '', 200)
        } catch (err) {
            this.responder(response, {}, 'Erro em esqueci a senha, tente novamente', 400)
        }
    }

    async getPasswordReset(request, response) {
        try {
            let link = `${ process.env.ENDPOINT_APP_ORIGIN }/#/ResetPassword?token=${ request.params.token }`;
            response.redirect(link)
        } catch (err) {
            this.responder(response, {}, 'Erro em esqueci a senha, tente novamente', 400)
        }
    }

    #log(type, user_id) {
        const log = {
            date: new Date(),
            user_id: user_id
        };
        this.rds.hset(type, user_id, log);
    }
}

module.exports = new AuthController();
