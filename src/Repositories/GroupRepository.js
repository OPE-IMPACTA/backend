const model = SystemLoad.model('Group');
const AbstractRepository = SystemLoad.repository('AbstractRepository');

class GroupRepository extends AbstractRepository {

    constructor(model) {
        super(model);
    }

}

module.exports = new GroupRepository(model);