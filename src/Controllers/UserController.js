const BaseController = SystemLoad.controller('BaseController');
const UserRepository = SystemLoad.repository('UserRepository');
const HttpHelper = SystemLoad.helper('HttpHelper');

class UserController extends BaseController {

    constructor() {
        super("Users");
    }

    async store(request, response) {

        await UserRepository.create(request.body).then(result => {

            const data = {
                "name": request.body.name,
                "email": request.body.email,
                "group": request.body.group_id
            };

            const log = {
                date: new Date(),
                user_id: request.user._id,
                data: data
            };

            this.rds.hset("Store", result._id, log);

            return HttpHelper.response(response, 200, result, 'Usuário criado com sucesso ..');
        }).catch(error => {
            return HttpHelper.response(response, 500, [], 'erro ao criar usuario');
        });
    }

    async update(request, response) {

        const { id, data } = request.body;

        const findOld = await UserRepository.findByEmail(request.user.email);

        await UserRepository.updateById(id, data).then(result => {

            const old = {
                "name": findOld.name,
                "email": findOld.email,
                "password": "******",
                "group_id": findOld.group_id
            };

            if (data.password) {
                data.password = "******";
            }

            const date = new Date();
            const log = {
                date: date,
                user_id: request.user._id,
                data: { new: data, old: old }
            };

            this.rds.hset("Update", `${date}-${request.user._id}`, log);

            return HttpHelper.response(response, 200, [], 'Usuário alterado com sucesso.');
        }).catch(error => {
            return HttpHelper.response(response, 500, [], 'Erro ao alterar usuário.');
        });
    }

    async delete(request, response) {

        const findOld = await UserRepository.findById(request.params.id);

        await UserRepository.delete(request.params.id).then(result => {

            const old = {
                "name": findOld.name,
                "email": findOld.email,
                "password": "******",
                "group_id": findOld.group_id
            };

            const log = {
                date: new Date(),
                user_id: request.user._id,
                data: old
            };

            this.rds.hset("Delete", request.params.id, log);

            return HttpHelper.response(response, 200, [], 'Usuário deletado com sucesso ..');
        }).catch(error => {
            return HttpHelper.response(response, 500, [], 'erro ao deletar usuario ..');
        });

    }

    async search(request, response) {

        UserRepository.getOne({ name: new RegExp(request.params.name, 'i') }).then(result => {
            return HttpHelper.response(response, 200, this.#usersDataFormat(result));
        }).catch(error => {
            return HttpHelper.response(response, 500, [], 'erro ao listar os usuários.');
        })
    }

    async index(request, response) {

        UserRepository.getAll().then(result => {
            return HttpHelper.response(response, 200, this.#usersDataFormat(result));
        }).catch(error => {
            return HttpHelper.response(response, 500, [], 'erro ao listar os usuários.');
        })
    }

    #usersDataFormat(array) {
        return array.map(item => ({
            _id: item._id,
            name: item.name,
            email: item.email,
            group_id: item.group_id
        }))
    }
}

module.exports = new UserController();
