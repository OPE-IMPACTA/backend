require('./../../config/connection-seeder');
const HelpModel = require("./../../src/Models/Help");

class HelpSeeder {

  #data = [
      {"field": "click", "action": "Clica em um botão específico via uma classe ou id css"},
      {"field": "wait", "action": "Espera um elemento de classe ou id css específico ser renderizadocss"},
      {"field": "fill", "action": "Preenche um elemento html especificado pela chave com o valor"},
      {"field": "visit", "action": "Visita a url específica"}
  ];

  async save() {
      await HelpModel.create(this.#data).then(() => {
          console.log("Criado com sucesso.");
      }).catch(error => {
          throw new Error(`Erro ao salvar o registro! Error: ${error}`);
      });

  }

}

module.exports = new HelpSeeder();
