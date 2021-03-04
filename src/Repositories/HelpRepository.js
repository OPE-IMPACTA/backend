const model = SystemLoad.model('Help');
const AbstractRepository = SystemLoad.repository('AbstractRepository');

class HelpRepository extends AbstractRepository {

    constructor(model) {
        super(model);
    }
}

module.exports = new HelpRepository(model);
