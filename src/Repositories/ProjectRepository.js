const model = SystemLoad.model('Project');
const AbstractRepository = SystemLoad.repository('AbstractRepository');

class ProjectRepository extends AbstractRepository {

    constructor(model) {
        super(model);
    }
}

module.exports = new ProjectRepository(model);
