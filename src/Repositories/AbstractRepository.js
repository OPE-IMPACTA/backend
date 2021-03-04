class AbstractRepository {

    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data);
    }

    async getAll() {
        return await this.model.find({});
    }

    async getOne(condition) {
        return await this.model.find(condition);
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async updateById(id, data) {
        return this.model.updateOne({_id: id}, {$set: data});
    }

    async delete(id) {
        return this.model.deleteOne({_id: id});
    }

    async countByFilter(field, value) {
        return this.model.countDocuments({field: value});
    }
}

module.exports = AbstractRepository;