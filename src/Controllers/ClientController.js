const BaseController = SystemLoad.controller('BaseController');
const ClientRepository = SystemLoad.repository('ClientRepository');
const HttpHelper = SystemLoad.helper('HttpHelper');
const QueryBuilder = SystemLoad.repository('QueryBuilder');

const mongoose = require('mongoose');

class ClientController extends BaseController {

    constructor() {
        super("Clients");
    }

    async index(request, response) {
        try {
            const queryBuilder = new QueryBuilder()
                .project({
                    cnpj: 1,
                    company: 1,
                    department: 1,
                    name: 1,
                    email: 1,
                    phone: 1
                })
                .build()
            
            const result = await ClientRepository.aggregate(queryBuilder)
            HttpHelper.response(response, 200, result);
        } catch (error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }

    async store(request, response) {
        try {
            const result = await ClientRepository.create(request.body)
            const { _id, cnpj, company, department, name, email, phone } = result

            HttpHelper.response(response, 200, { _id, cnpj, company, department, name, email, phone }, 'Cliente criado com sucesso');
        } catch(error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }

    async update(request, response) {
        try {
            const { id } = request.params;
            await ClientRepository.updateById(id, request.body);
            
            const queryBuilder = new QueryBuilder()
                .match({
                    _id: mongoose.Types.ObjectId(id)
                })
                .project({
                    cnpj: 1,
                    company: 1,
                    department: 1,
                    name: 1,
                    email: 1,
                    phone: 1
                })
                .build()
            
            const result = await ClientRepository.aggregate(queryBuilder)
            HttpHelper.response(response, 200, result, 'Cliente alterado com sucesso.');
        } catch(error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.params;
            await ClientRepository.delete(id);
            HttpHelper.response(response, 200, [], 'Cliente deletado com sucesso.');
        } catch(error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }
}

module.exports = new ClientController();
