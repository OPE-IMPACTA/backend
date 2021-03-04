const BaseController = SystemLoad.controller('BaseController');
const HelpRepository = SystemLoad.repository('HelpRepository');
const { messageCreate, messageUpdate, messageDelete, messageError, messageWithOutData } = SystemLoad.helper('MessagesHelper')

class HelpController extends BaseController {

    async index(request, response) {
        try {
            let helpActions = await HelpRepository.getAll()
            const message = helpActions.length === 0 ? messageWithOutData.msgSuccess : ''

            this.responder(response, helpActions, message, 200)
        } catch (error) {
            this.responder(response, {}, messageError.msgSuccess, 400)
        }
    }

    async get(request, response) {
        try {
            let helpActions = await HelpRepository.findById(request.params.id)
            const message = !helpActions ? messageWithOutData.msgSuccess : ''

            this.responder(response, helpActions, message, 200)
        } catch (error) {
            this.responder(response, {}, messageError.msgSuccess, 400)
        }
    }

    async create(request, response) {

        try {
            const result = await HelpRepository.create(request.body)
            this.responder(response, result, messageCreate.msgSuccess, 200)
        } catch (error) {
            this.responder(response, {}, messageCreate.msgFailure, 400)
        }
    }

    async update(request, response) {
        const { id } = request.params

        try {
            const result = await HelpRepository.updateById(id, request.body)

            if (result.nModified !== 0) {
                const resultUpdated = await HelpRepository.findById(id)
                return this.responder(response, resultUpdated, messageUpdate.msgSuccess, 200)
            }
            this.responder(response, {}, messageUpdate.msgFailure, 200)
        } catch (error) {
            this.responder(response, {}, messageError.msgSuccess, 400)
        }
    }

    async delete(request, response) {
        const { id } = request.params

        try {
            const result = await HelpRepository.delete(id)

            if (result.n !== 0) {
                this.responder(response, {}, messageDelete.msgSuccess, 400)
            }
            return this.responder(response, {}, messageDelete.msgFailure, 400)
        } catch (error) {
            this.responder(response, {}, messageError.msgSuccess, 400)
        }
    }
}

module.exports = new HelpController();
