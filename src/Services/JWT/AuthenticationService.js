const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserRepository = SystemLoad.repository('UserRepository');
const { InvalidArgumentError } = SystemLoad.error('Error');
const LogoutService = SystemLoad.service('JWT/LogoutService');

function checkUser(user) {
    if (!user) {
        throw new InvalidArgumentError('Não existe usuário com esse e-mail!');
    }
}

async function checkTokenBlacklist(token) {
    const tokenBlacklist = await LogoutService.existsToken(token);
    if (tokenBlacklist) {
        throw new jwt.JsonWebTokenError('Token inválido por logout!');
    }
}

async function checkPassword(password, passwordHash) {
    const isValid = await bcrypt.compare(password, passwordHash);
    if (!isValid) {
        throw new InvalidArgumentError('E-mail ou senha inválidos!');
    }
}

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        async (email, password, done) => {
            try {
                const user = await UserRepository.findByEmail(email);
                checkUser(user);
                await checkPassword(password, user.password);

                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                await checkTokenBlacklist(token);
                const payload = jwt.verify(token, process.env.JWT_KEY);
                const user = await UserRepository.findById(payload.id);

                done(null, user, { token: token, group_id: payload.group_id } );
            } catch (error) {
                done(error);
            }
        }
    )
)

module.exports = passport;
