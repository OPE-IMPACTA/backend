const BaseController = SystemLoad.controller('BaseController');
const TaskRepository = SystemLoad.repository('TaskRepository');
const HttpHelper = SystemLoad.helper('HttpHelper');
const QueryBuilder = SystemLoad.repository('QueryBuilder');

const mongoose = require('mongoose');

class TaskController extends BaseController {

    constructor() {
        super("Tasks");
    }

    async index(request, response) {
        try {
            const queryBuilder = new QueryBuilder()
                .project({
                    project_id: 1,
                    user_id: 1,
                    description: 1,
                    startDate: 1,
                    endDate: 1,
                    hours: 1
                })
                .build()
            
            const result = await TaskRepository.aggregate(queryBuilder)
            HttpHelper.response(response, 200, result);
        } catch (error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }

    async store(request, response) {
        try {
            const result = await TaskRepository.create(request.body)
            const { _id, cnpj, company, department, name, email, phone } = result

            HttpHelper.response(response, 200, { _id, cnpj, company, department, name, email, phone }, 'Task criado com sucesso');
        } catch(error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }

    async update(request, response) {
        try {
            const { id } = request.params;
            await TaskRepository.updateById(id, request.body);
            
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
            
            const result = await TaskRepository.aggregate(queryBuilder)
            HttpHelper.response(response, 200, result, 'Task alterado com sucesso.');
        } catch(error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.params;
            await TaskRepository.delete(id);
            HttpHelper.response(response, 200, [], 'Task deletado com sucesso.');
        } catch(error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }
}

module.exports = new TaskController();
