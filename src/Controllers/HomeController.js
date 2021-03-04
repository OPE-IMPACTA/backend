const ProducerKafka = SystemLoad.service('Kafka/Producer');
const UserRepository = SystemLoad.repository('UserRepository');

class HomeController {

    constructor() {}

    async producerNode(request, response)  {
        ProducerKafka.send('e2e-event-node', JSON.stringify({
            operations: [
                { click: ".login-btn" },
                { wait: ".modal-X" },
                { fill: { class: ".email", value: "root@localhost.com" } },
                { fill: { class: ".password", value: "vacina2021" } },
                { action: ".submit" }
            ]
        }), 'nodejs');

        response.json('Fim producer NodeJs ...');
    }

    async producerGoLang(request, response)  {
        ProducerKafka.send('e2e-test', JSON.stringify({
            id: "602ae2f2d81d1701dd108759",
            url: "https://www.google.com",
            operations: [
                { fill: { type: "name", field: "q", value: "i9xp tecnologia" } },
                { submit: { type: "name", field: "q" } }
            ]
        }), 'golang');

        response.json('Fim producer GoLang ...');
    }

}

module.exports = new HomeController();
