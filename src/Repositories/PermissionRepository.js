const model = SystemLoad.model('Permission');
const AbstractRepository = SystemLoad.repository('AbstractRepository');

class PermissionRepository extends AbstractRepository {

    constructor(model) {
        super(model);
    }

    async getAll(condition) {
        return await this.model.find(condition);
    }

}

module.exports = new PermissionRepository(model);