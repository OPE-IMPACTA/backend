const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');
const Redis = SystemLoad.kernel('redis');
const blacklist = new Redis('blacklist:');

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
        await blacklist.set(tokenHash, '', expiredAt);
    },
    existsToken: async token => {
        const tokenHash = createTokenHash(token);
        const result = await blacklist.exists(tokenHash);
        return result === 1;
    }
};
