const BaseController = SystemLoad.controller('BaseController');
const GroupRepository = SystemLoad.repository('GroupRepository');

class GroupController extends BaseController {

    async index(request, response) {
        const groups = await GroupRepository.getAll();
        this.responder(response, groups,'', 200)
    }

}

module.exports = new GroupController();