const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');


function createTokenHash(token) {
    return createHash('sha256')
        .update(token)
        .digest('hex');
}

module.exports = {
    addToken: async token => {
        token = token.replace(/Bearer/, "").trim();
        const expiredAt = jwt.decode(token).exp;
        const tokenHash = createTokenHash(token);
    },
    existsToken: async token => {
        const tokenHash = createTokenHash(token);
    }
};
