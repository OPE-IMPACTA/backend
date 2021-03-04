const bcrypt = require('bcrypt');
const model = SystemLoad.model('User');
const AbstractRepository = SystemLoad.repository('AbstractRepository');

class UserRepository extends AbstractRepository {

    constructor(model) {
        super(model);
    }

    async findByEmail(email) {
        return this.model.findOne({ email: email })
    }

    async getPasswordReset(data) {
        return this.model.findOne(data)
            .select('+passwordResetToken passwordResetExpires email name');
    }

    async create(data) {
        data.password = await bcrypt.hash(data.password, 12);
        return this.model.create(data);
    }

    async updateById(id, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 12);
        }
        return this.model.updateOne({_id: id}, {$set: data});
    }

    async updateByEmail(email, data) {
        return this.model.updateOne({email: email}, {$set: data});
    }
}

module.exports = new UserRepository(model);