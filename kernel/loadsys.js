module.exports = {
    model: (model) => require(`${__dirname}/../src/Models/${model}`),
    repository: (repository) => require(`${__dirname}/../src/Repositories/${repository}`),
    controller: (controller) => require(`${__dirname}/../src/Controllers/${controller}`),
    middleware: (middleware) => require(`${__dirname}/../src/Middlewares/${middleware}`),
    request: (request) => require(`${__dirname}/../src/Requests/${request}`),
    route: (route) => require(`${__dirname}/../routes/${route}`),
    config: (config) => require(`${__dirname}/../config/${config}`),
    service: (service) => require(`${__dirname}/../src/Services/${service}`),
    helper: (helper) => require(`${__dirname}/../src/Helpers/${helper}`),
    error: (error) => require(`${__dirname}/../src/Errors/${error}`),
    kernel: (kernel) => require(`${__dirname}/../kernel/${kernel}`),
    seed: (seeders) => require(`${__dirname}/../database/seeders/${seeders}`),
    constant: (constant) => require(`${__dirname}/../src/Constants/${constant}`),
    template: (template) => require(`${__dirname}/../src/Templates/${template}`)
};
