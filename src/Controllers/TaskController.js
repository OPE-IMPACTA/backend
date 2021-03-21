const BaseController = SystemLoad.controller('BaseController');
const TaskRepository = SystemLoad.repository('TaskRepository');

class TaskController extends BaseController {

    constructor() {
        super();
    }

    async create(request, response) {

        try {
            const task = await TaskRepository.create(request.body)
            this.responder(response, task,'', 200)
        } catch (error) {
            this.responder(response, '','Houve um erro, tente mais tarde!', 500)
        }
    }

    async getAll(request, response) {

        try {
            const task = await TaskRepository.getAll()
            this.responder(response, task,'', 200)
        } catch (error) {
            this.responder(response, '','Houve um erro, tente mais tarde!', 500)
        }
    }

    async update(request, response) {

        try {
            const { id } = request.params
            const task = await TaskRepository.updateById(id, request.body)
            var body = request.body;
            body.id = id
            this.responder(response, request.body,'', 200)
        } catch (error) {
            this.responder(response, '','Houve um erro, tente mais tarde!', 500)
        }
    }

    async delete(request, response) {

        try {
            const { id } = request.params
            const task = await TaskRepository.delete(id)
            this.responder(response, task,'', 200)
        } catch (error) {
            this.responder(response, '','Houve um erro, tente mais tarde!', 500)
        }
    }

}




module.exports = new TaskController();