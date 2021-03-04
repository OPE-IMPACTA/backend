const Kafka = require('node-rdkafka');

class Producer {

    #connectedKafka = false

    constructor() {
        this.#initialize();
    }

    async #initialize() {
        this.producer = new Kafka.Producer({
            'metadata.broker.list': `broker:${process.env.PORT_BROKER}`,
            'dr_msg_cb': true
        });

        this.producer.connect();

        await this.#createEvents();

        this.producer.setPollInterval(100);
    }

    async #createEvents() {

        this.producer.on('ready', () => {
            this.#connectedKafka = true;
        });

        this.producer.on('delivery-report', (err, report) => {
            if (err) {
                console.warn('Error producing', err)
            } else {
                const {topic, partition, value} = report;
                console.log(`Successfully produced record to topic "${topic}" partition ${partition} ${value}`);
            }
        });

        this.producer.on('event.error', (err) => {
            console.warn('event.error', err);
        });
    }

    async send(topic, data, key) {

        this.producer.produce(topic, -1, Buffer.from(data), key, Date.now());
    }
}

module.exports = new Producer();
