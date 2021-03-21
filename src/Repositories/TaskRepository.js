const model = SystemLoad.model('Tasks');
const AbstractRepository = SystemLoad.repository('AbstractRepository');

class TaskRepository extends AbstractRepository {

    constructor(model) {
        super(model);
    }
}

module.exports = new TaskRepository(model);
