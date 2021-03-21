const BaseController = SystemLoad.controller('BaseController');
const ProjectsRepository = SystemLoad.repository('ProjectsRepository');

class ProjectsController extends BaseController {

    constructor() {
        super();
    }

    async create(request, response) {

        try {
            const projects = await ProjectsRepository.create(request.body)
            this.responder(response, projects,'', 200)
        } catch (error) {
            this.responder(response, '','Houve um erro, tente mais tarde!', 500)
        }
    }

    async getAll(request, response) {

        try {
            const projects = await ProjectsRepository.getAll()
            this.responder(response, projects,'', 200)
        } catch (error) {
            this.responder(response, '','Houve um erro, tente mais tarde!', 500)
        }
    }

    async update(request, response) {

        try {
            const { id } = request.params
            const projects = await ProjectsRepository.updateById(id, request.body)
            this.responder(response, projects,'', 200)
        } catch (error) {
            this.responder(response, '','Houve um erro, tente mais tarde!', 500)
        }
    }

    async delete(request, response) {

        try {
            const { id } = request.params
            const projects = await ProjectsRepository.delete(id)
            this.responder(response, projects,'', 200)
        } catch (error) {
            this.responder(response, '','Houve um erro, tente mais tarde!', 500)
        }
    }

}




module.exports = new ProjectsController();