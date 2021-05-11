const BaseController = SystemLoad.controller('BaseController');
const UserRepository = SystemLoad.repository('UserRepository');
const HttpHelper = SystemLoad.helper('HttpHelper');
const QueryBuilder = SystemLoad.repository('QueryBuilder');

const mongoose = require('mongoose');

class UserController extends BaseController {

    constructor() {
        super("Users");
    }

    async store(request, response) {
        try {
            const result = await UserRepository.create(request.body)
            const { _id, name, email, group_id } = result

            HttpHelper.response(response, 200, { _id, name, email, group_id }, 'Usuário criado com sucesso');
        } catch (error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }

    async update(request, response) {
        try {
            const { id } = request.params;
            await UserRepository.updateById(id, request.body);

            const queryBuilder = new QueryBuilder()
                .match({
                    _id: mongoose.Types.ObjectId(id)
                })
                .project({
                    name: 1,
                    email: 1,
                    group_id: 1
                })
                .build()

            const result = await UserRepository.aggregate(queryBuilder)
            HttpHelper.response(response, 200, result, 'Usuário alterado com sucesso.');
        } catch (error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.params;
            await UserRepository.delete(id);
            HttpHelper.response(response, 200, [], 'Usuário deletado com sucesso.');
        } catch (error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }

    async index(request, response) {
        try {
            const queryBuilder = new QueryBuilder()
                .lookup({
                    from: 'groups',
                    foreignField: '_id',
                    localField: 'group_id',
                    as: 'groups'
                })
                .unwind({
                    path: '$groups'
                })
                .project({
                    name: 1,
                    email: 1,
                    group_id: 1,
                    group: '$groups.group',
                })
                .sort({name: 1})
                .build()

            const result = await UserRepository.aggregate(queryBuilder)

            console.log(result)
            HttpHelper.response(response, 200, result);
        } catch (error) {
            HttpHelper.response(response, 500, [], 'Houve um erro, tente mais tarde!');
        }
    }
}

module.exports = new UserController();
