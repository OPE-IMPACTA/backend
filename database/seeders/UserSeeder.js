const bcrypt = require('bcrypt');

require('./../../config/connection-seeder');
const UserModel = require("./../../src/Models/User");
const GroupModel = require("./../../src/Models/Group");

class UserSeeder {

  #data = {
    "name": "Master",
    "email": "master@master.com",
    "password": "12345678",
    "group_id": ""
  };

  async save() {
      const group = await GroupModel.findOne({"group": "admin"});

      if (!group) {
          throw new Error(`Necessário informar um grupo existente para atribuir a esse usuário`);
      }

      this.#data.group_id = group._id;
      this.#data.password = await bcrypt.hash(this.#data.password, 12);

      await UserModel.create(this.#data).then(() => {
          console.log("Criado com sucesso.");
      }).catch(error => {
          throw new Error(`Erro ao salvar o registro! Error: ${error}`);
      });

  }

}

module.exports = new UserSeeder();