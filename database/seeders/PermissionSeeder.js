require('./../../config/connection-seeder');
const PermissionModel = require("./../../src/Models/Permission");
const GroupModel = require("./../../src/Models/Group");

class PermissionSeeder {

    #data = [
        {
            "group": "",
            "permissions": [
                {
                    "resource": "users/*",
                    "methods": ["GET", "POST", "PUT", "DELETE"],
                    "action": "allow"
                },
                {
                    "resource": "listar",
                    "methods": ["GET"],
                    "action": "allow"
                }
            ]
        },
        {
            "group": "",
            "permissions": [
                {
                    "resource": "auth/login",
                    "methods": ["POST"],
                    "action": "allow"
                }
            ]
        }
    ];

    async save() {

        const groupAdmin = GroupModel.findOne({"group": "admin"});
        const groupGuest = GroupModel.findOne({"group": "guest"});

        const [ admin, guest ]  = await Promise.all([groupAdmin, groupGuest]);

        if (!admin || !guest) {
            throw new Error(`Necessário informar um grupo existente para atribuir a esse permissão`);
        }

        this.#data[0].group = admin._id;
        this.#data[1].group = guest._id;

        await PermissionModel.create(this.#data).then(() => {
            console.log("Criado com sucesso.");
        }).catch(error => {
            throw new Error(`Erro ao salvar o registro! Error: ${error}`);
        });

    }

}

module.exports = new PermissionSeeder();