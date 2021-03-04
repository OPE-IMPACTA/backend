const BaseController = SystemLoad.controller('BaseController');
const TestRepository = SystemLoad.repository('TestRepository');
const ProducerKafka = SystemLoad.service('Kafka/Producer');
const { STATUS } = SystemLoad.constant('Application')
const { messageCreate, messageUpdate, messageDelete, messageError, messageWithOutData } = SystemLoad.helper('MessagesHelper')

class TestController extends BaseController {

    async index(request, response) {
        try {
            let resultTests = await TestRepository.getAll()

            const message = resultTests.length === 0 ? messageWithOutData.msgSuccess : ''

            this.responder(response, resultTests, message, 200)
        } catch (error) {
            this.responder(response, {}, messageError.msgSuccess, 400)
        }
    }

    async get(request, response) {
        try {
            const resultTests = await TestRepository.findById(request.params.id)
            const message = !resultTests ? messageWithOutData.msgSuccess : ''

            this.responder(response, resultTests, message, 200)
        } catch (error) {
            this.responder(response, {}, messageError.msgSuccess, 400)
        }
    }

    async submitById(request, response) {
        try {
            const {
                id,
                url,
                operations
            } = await TestRepository.findById(request.params.id)

            ProducerKafka.send('e2e-tests', JSON.stringify({ id, url, operations }), `test-${id}`)
            await TestRepository.updateById(id, { status: STATUS.PENDING })

            this.responder(response, { id, url, operations }, 'Enviado para a fila', 200)
        } catch (error) {
            this.responder(response, {}, messageError.msgSuccess, 400)
        }
    }

    async create(request, response) {

        try {
            const created_at = new Date()
            const result = await TestRepository.create({ user_id: request.user._id, ...request.body, created_at })

            this.responder(response, result, messageCreate.msgSuccess, 200)
        } catch (error) {
            this.responder(response, {}, messageCreate.msgFailure, 400)
        }
    }

    async update(request, response) {

        try {
            const { id } = request.params
            const updated_at = new Date()

            const result = await TestRepository.updateById(id, { ...request.body, status: STATUS.NEW, updated_at })
            if (result.nModified !== 0) {
                const resultUpdated = await TestRepository.findById(id)
                return this.responder(response, resultUpdated, messageUpdate.msgSuccess, 200)
            }
            this.responder(response, {}, messageUpdate.msgFailure, 200)
        } catch (error) {
            this.responder(response, {}, messageError.msgSuccess, 400)
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.params

            const result = await TestRepository.delete(id)
            if (result.n !== 0) {
                return this.responder(response, {}, messageDelete.msgSuccess, 200)
            }
            this.responder(response, {}, messageDelete.msgFailure, 200)

        } catch (error) {
            this.responder(response, {}, messageError.msgSuccess, 400)
        }
    }
}

module.exports = new TestController();
