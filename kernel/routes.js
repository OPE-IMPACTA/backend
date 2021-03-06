// Routes
let routes = [
    {
        base: '/',
        file: 'home'
    },
    {
        base: '/users',
        file: 'user'
    },
    {
        base: '/group',
        file: 'group'
    },
    {
        base: '/auth',
        file: 'auth'
    },
    {
        base: '/clients',
        file: 'client'
    },
    {
        base: '/projects',
        file: 'project'
    },
    {
        base: '/tasks',
        file: 'task'
    } 
];

module.exports = {

    load: (app) => {

        routes.forEach(element => {
            let file = SystemLoad.route(element.file);
            app.use(element.base, file);
        });
    }
};
