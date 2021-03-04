const model = SystemLoad.model('Test-end2end');
const AbstractRepository = SystemLoad.repository('AbstractRepository');

class TestRepository extends AbstractRepository {

    constructor(model) {
        super(model);
    }
}

module.exports = new TestRepository(model);
