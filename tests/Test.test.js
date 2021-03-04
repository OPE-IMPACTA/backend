const request = require("supertest");
const app = require("../app");
const date = new Date().getTime()

let id;
let adminAccessToken;
let deleteId;

describe('Endpoint Tests', () => {
    beforeAll(async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                "email": "master@master.com",
                "password": "12345678"
            })
        adminAccessToken = response.headers.authorization

        const expected = {
            "title": `Title`,
            "description": "Teste Criado para JEST-TESTE",
            "url": "www.teste.com.br",
            "project": "project teste",
            "operations": [
                { "click": ".login-btn" },
                { "wait": ".modal-X" },
                { "fill": {
                        "class": ".email",
                        "value": "root@localhost.com"
                    }
                },
                { "fill": {
                        "class": ".password",
                        "value": "vacina2021"
                    }
                },
                { "action": ".submit" }
            ]
        }

        const httpResponse = await request(app)
            .post('/tests')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send(expected)

        id = httpResponse.body._id
    })

    afterAll(async () => {
        await request(app)
            .delete(`/tests/${deleteId}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
    })

    test('Deve retornar statusCode 200 e o body maior que zero', async () => {
        const httpResponse = await request(app)
            .get('/tests')
            .set('Authorization', `Bearer ${adminAccessToken}`)

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body.length).toBeGreaterThan(0);
    })

    test('Deve retornar statusCode 400 e mensagem de erro', async () => {
        const httpResponse = await request(app)
            .get('/tests/Incorreto')
            .set('Authorization', `Bearer ${adminAccessToken}`)
        const expected = 'Houve um erro, tente mais tarde!'

        expect(httpResponse.statusCode).toBe(400)
        expect(expected).toMatch(httpResponse.body.message)
    })

    test('Deve retornar statusCode 200 e mensagem que não existe registro', async () => {
        const httpResponse = await request(app)
            .get('/tests/6015a47114d09a152b2af251')
            .set('Authorization', `Bearer ${adminAccessToken}`)
        const expected = 'Nenhum registro encontrado'

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body.message).toMatch(expected)
    })

    test('Deve retornar statusCode 200 e o id', async () => {
        const httpResponse = await request(app)
            .get(`/tests/${id}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body._id).toBe(id)
    })

    test('Deve retornar statusCode 200 e body com dados dos campos criado', async () => {
        const expected = {
            "title": `Title${date}`,
            "description": "Texto texto texto",
            "url": "www.teste.com.br",
            "project": "project teste",
            "operations": [
                { "click": ".login-btn" },
                { "wait": ".modal-X" },
                { "fill": {
                        "class": ".email",
                        "value": "root@localhost.com"
                    }
                },
                { "fill": {
                        "class": ".password",
                        "value": "vacina2021"
                    }
                },
                { "action": ".submit" }
            ]
        }
        const httpResponse = await request(app)
            .post(`/tests`)
            .send(expected)
            .set('Authorization', `Bearer ${adminAccessToken}`)

        deleteId = httpResponse.body._id

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body.title).toMatch(expected.title)
        expect(httpResponse.body.description).toMatch(expected.description)
        expect(httpResponse.body.url).toMatch(expected.url)
        expect(httpResponse.body.project).toMatch(expected.project)
        expect(httpResponse.body.operations).toEqual(expected.operations)

    })

    test('Deve retornar os erros informados pela validição pois o campo já existe', async () => {
        const fields = {
            "fieldError": `fieldInvalid`
        }
        const httpResponse = await request(app)
            .post(`/tests`)
            .send(fields)
            .set('Authorization', `Bearer ${adminAccessToken}`)
        const { errors } = httpResponse.body

        expect(httpResponse.statusCode).toBe(400)
        expect(errors).not.toBeUndefined();
    })

    test('Deve retornar statusCode 400 e uma mensagem de erro', async () => {
        const fields = {
            "title": `Title`,
            "description": "Texto texto texto",
            "url": "www.teste.com.br",
            "project": "project teste",
            "operations": [
                { "click": ".login-btn" },
                { "wait": ".modal-X" },
                { "fill": {
                        "class": ".email",
                        "value": "root@localhost.com"
                    }
                },
                { "fill": {
                        "class": ".password",
                        "value": "vacina2021"
                    }
                },
                { "action": ".submit" }
            ]
        }
        const httpResponse = await request(app)
            .put(`/tests/Incorreto`)
            .send(fields)
            .set('Authorization', `Bearer ${adminAccessToken}`)
        const expected = 'Houve um erro, tente mais tarde!'

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body.message).toMatch(expected)
    })

    test('Deve retornar statusCode 200 e o sucesso da alteração', async () => {
        const fields = {
            "title": `Title${date}`,
            "description": "Texto texto texto",
            "url": "www.teste.com.br",
            "project": "project teste",
            "operations": [
                { "click": ".login-btn" },
                { "wait": ".modal-X" },
                { "fill": {
                        "class": ".email",
                        "value": "root@localhost.com"
                    }
                },
                { "fill": {
                        "class": ".password",
                        "value": "vacina2021"
                    }
                },
                { "action": ".submit" }
            ]
        }
        const httpResponse = await request(app)
            .put(`/tests/${id}`)
            .send(fields)
            .set('Authorization', `Bearer ${adminAccessToken}`)

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body.title).toMatch(fields.title)
        expect(httpResponse.body.description).toMatch(fields.description)
        expect(httpResponse.body.url).toMatch(fields.url)
        expect(httpResponse.body.project).toMatch(fields.project)
        expect(httpResponse.body.operations).toEqual(fields.operations)
    })

    test('Deve retornar statusCode 200 e uma mensagem de erro que não foi possível atualizar', async () => {
        const fields = {
            "title": `Title${date}`,
            "description": "Texto texto texto",
            "url": "www.teste.com.br",
            "project": "project teste",
            "operations": [
                { "click": ".login-btn" },
                { "wait": ".modal-X" },
                { "fill": {
                        "class": ".email",
                        "value": "root@localhost.com"
                    }
                },
                { "fill": {
                        "class": ".password",
                        "value": "vacina2021"
                    }
                },
                { "action": ".submit" }
            ]
        }
        const httpResponse = await request(app)
            .put(`/tests/${id}`)
            .send(fields)
            .set('Authorization', `Bearer ${adminAccessToken}`)
        const expected = 'Não foi possível alterar'

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body.message).toMatch(expected)
    })

    test('Deve retornar statusCode 400 e uma mensagem de erro ', async () => {
        const httpResponse = await request(app)
            .delete(`/tests/Incorreto`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
        const expected = 'Houve um erro, tente mais tarde!'

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body.message).toMatch(expected)
    })

    test('Deve retornar statusCode 200 e uma mensagem de sucesso ', async () => {
        const httpResponse = await request(app)
            .delete(`/tests/${id}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
        const expected = 'Deletado com sucesso'

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body.message).toMatch(expected)
    })
})

