require('./../../config/connection-seeder');
const GroupModel = require("./../../src/Models/Group");

class GroupSeeder {

    #data = [{
        "group": "admin",
    },{
        "group": "guest",
    }];

    async save() {
        await GroupModel.create(this.#data).then(() => {
            console.log("Criado com sucesso.");
        }).catch(error => {
            throw new Error(`Erro ao salvar o registro! Error: ${error}`);
        });

    }

}

module.exports = new GroupSeeder();