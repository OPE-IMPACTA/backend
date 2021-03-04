const lodash = require("lodash");

const command = require('commander');

(async (callback) => {
    try {
        command
            .option('-s --seed [seedName]', 'seed name')
            .parse(process.argv);

        const commander = command.opts();

        const key = Object.keys(commander).toString();
        switch (key) {
            case 'seed':
                const seeders = require(`./database/seeders/${lodash.capitalize(commander.seed)}Seeder`);
                await seeders.save();
        }

        callback(null);
        process.exit(0);

    } catch (e) {
        callback(e);
        process.abort();
    }

    function callback(error) {
        if (error) {
            console.error(`Error: ${error.message}`);
        }
    }

})();
