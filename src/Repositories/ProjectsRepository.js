const model = SystemLoad.model('Projects');
const AbstractRepository = SystemLoad.repository('AbstractRepository');

class ProjectsRepository extends AbstractRepository {

    constructor(model) {
        super(model);
    }
}

module.exports = new ProjectsRepository(model);
