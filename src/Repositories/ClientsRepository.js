const model = SystemLoad.model('Clients');
const AbstractRepository = SystemLoad.repository('AbstractRepository');

class ClientsRepository extends AbstractRepository {

    constructor(model) {
        super(model);
    }
}

module.exports = new ClientsRepository(model);
