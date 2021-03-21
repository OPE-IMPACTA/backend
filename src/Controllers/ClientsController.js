const BaseController = SystemLoad.controller('BaseController');
const ClientsRepository = SystemLoad.repository('ClientsRepository');

class ClientsController extends BaseController {

    constructor() {
        super();
    }

    async create(request, response) {

        try {
            const clients = await ClientsRepository.create(request.body)
            this.responder(response, clients,'', 200)
        } catch (error) {
            this.responder(response, '','Houve erro, tente mais tarde!', 500)
        }
    }
}

module.exports = new ClientsController();
