const jwt = require('jsonwebtoken');

class GenerateTokenService {

    create(user) {
        const payload = {
            id: user.id,
            group_id: user.group_id
        };

        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: process.env.TIME_EXPIRE_JWT });
        return token;
    }

}

module.exports = new GenerateTokenService();
