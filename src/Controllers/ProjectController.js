const BaseController = SystemLoad.controller('BaseController');
const ProjectRepository = SystemLoad.repository('ProjectRepository');
const HttpHelper = SystemLoad.helper('HttpHelper');
const QueryBuilder = SystemLoad.repository('QueryBuilder');

const mongoose = require('mongoose');

class ProjectController extends BaseController {

    constructor() {
        super("Projects");
    }

    async index(request, response) {
        try {
            const queryBuilder = new QueryBuilder()
                .lookup({
                    from: 'users',
                    foreignField: '_id',
                    localField: 'user_id',
                    as: 'users'
                })
                .unwind({
                    path: '$users'
                })
                .lookup({
                    from: 'clients',
                    foreignField: '_id',
                    localField: 'client_id',
                    as: 'clients'
                })
                .unwind({
                    path: '$clients'
                })
                .project({
                    user: '$users.name',
                    user_id: 1,
                    client: '$clients.name',
                    client_id: 1,
                    description: 1,
                    status: 1,
                    name: 1
                })
                .sort({ name: 1 })
                .build()

            const result = await ProjectRepository.aggregate(queryBuilder)
            HttpHelper.response(response, 200, result);
        } catch (error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }

    async store(request, response) {
        try {
            const result = await ProjectRepository.create(request.body)
            const { _id, cnpj, company, department, name, email, phone } = result

            HttpHelper.response(response, 200, { _id, cnpj, company, department, name, email, phone }, 'Projeto criado com sucesso');
        } catch (error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }

    async update(request, response) {
        try {
            const { id } = request.params;
            await ProjectRepository.updateById(id, request.body);

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

            const result = await ProjectRepository.aggregate(queryBuilder)
            HttpHelper.response(response, 200, result, 'Projeto alterado com sucesso.');
        } catch (error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.params;
            await ProjectRepository.delete(id);
            HttpHelper.response(response, 200, [], 'Projeto deletado com sucesso.');
        } catch (error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }
}

module.exports = new ProjectController();
