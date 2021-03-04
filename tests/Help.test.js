const request = require("supertest");
const app = require("../app");
let id;
let action;
let adminAccessToken;

describe('Help Actions', () => {
    beforeAll(async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                "email": "master@master.com",
                "password": "12345678"
            })
        adminAccessToken = response.headers.authorization

        const httpResponse = await request(app)
            .get('/help/actions')
            .set('Authorization', `Bearer ${adminAccessToken}`)
        const [ firstField ] = httpResponse.body
        id = firstField._id
        action = firstField.action
    })

    test('Deve retornar statusCode 200 e o body com dados', async () => {
        const httpResponse = await request(app)
            .get('/help/actions')
            .set('Authorization', `Bearer ${adminAccessToken}`)
        const expected = [ '_id', 'field', 'action', '__v' ]

        expect(httpResponse.statusCode).toBe(200)
        for (let index = 0; index < httpResponse.body.length; index++) {
            expect(Object.keys(httpResponse.body[index])).toEqual(expected)
        }
    })

    test('Deve retornar statusCode 400 e mensagem de erro', async () => {
        const httpResponse = await request(app)
            .get('/help/actions/Incorreto')
            .set('Authorization', `Bearer ${adminAccessToken}`)
        const expected = 'Houve um erro, tente mais tarde!'

        expect(httpResponse.statusCode).toBe(400)
        expect(expected).toMatch(httpResponse.body.message)
    })

    test('Deve retornar statusCode 200 e mensagem que não existe registro', async () => {
        const httpResponse = await request(app)
            .get('/help/actions/6015a47114d09a152b2af251')
            .set('Authorization', `Bearer ${adminAccessToken}`)

        const expected = "Nenhum registro encontrado"

        expect(httpResponse.statusCode).toBe(200)
        expect(expected).toMatch(httpResponse.body.message)
    })

    test('Deve retornar statusCode 200 e body com dados', async () => {
        const httpResponse = await request(app)
            .get(`/help/actions/${id}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
        const expected = [ '_id', 'field', 'action', '__v' ]
        expect(Object.keys(httpResponse.body)).toEqual(expected)
        expect(httpResponse.statusCode).toBe(200)
    })

    test('Deve retornar statusCode 200 e body com dados dos campos criado', async () => {
        const date = new Date().getTime()
        const expected = {
            "field": `NewField${date}`,
            "action": "NewAction"
        }
        const httpResponse = await request(app)
            .post(`/help/actions/`)
            .send(expected)
            .set('Authorization', `Bearer ${adminAccessToken}`)
        const [ firstFieldBody ] = httpResponse.body

        expect(httpResponse.statusCode).toBe(200)
        expect(firstFieldBody.field).toMatch(expected.field)
        expect(firstFieldBody.action).toMatch(expected.action)
    })

    test('Deve retornar statusCode 400 e se o campo já existe na base', async () => {
        const fields = {
            "field": `click`,
            "action": "NewAction"
        }
        const httpResponse = await request(app)
            .post(`/help/actions/`)
            .send(fields)
            .set('Authorization', `Bearer ${adminAccessToken}`)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).not.toBeUndefined();
    })

    test('Deve retornar os erros informados pela validição pois o campo já existe', async () => {
        const fields = {
            "fieldError": `MatheusTeste`,
            "actionError": "NewAction"
        }
        const httpResponse = await request(app)
            .post(`/help/actions/`)
            .send(fields)
            .set('Authorization', `Bearer ${adminAccessToken}`)
        const { errors } = httpResponse.body

        expect(httpResponse.statusCode).toBe(400)
        expect(errors).not.toBeUndefined();
    })

    test('Deve retornar statusCode 400 e uma mensagem de erro', async () => {
        const fields = {
            "action": `Estou Atualizando esse campo`
        }
        const httpResponse = await request(app).put(`/help/actions/Incorreto`)
            .send(fields)
            .set('Authorization', `Bearer ${adminAccessToken}`)
        const expected = 'Houve um erro, tente mais tarde!'

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body.message).toMatch(expected)
    })

    test('Deve retornar statusCode 200 e uma mensagem de erro que não foi possível atualizar', async () => {
        const fields = {
            "action": action
        }
        const httpResponse = await request(app).put(`/help/actions/${id}`)
            .send(fields)
            .set('Authorization', `Bearer ${adminAccessToken}`)
        const expected = 'Não foi possível alterar'

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body.message).toMatch(expected)
    })

    test('Deve retornar statusCode 400 e uma mensagem de erro ', async () => {
        const httpResponse = await request(app)
            .delete(`/help/actions/Incorreto`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
        const expected = 'Houve um erro, tente mais tarde!'

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body.message).toMatch(expected)
    })
})
