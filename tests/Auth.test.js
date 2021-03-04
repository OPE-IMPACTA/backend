const request = require("supertest");
const app = require("../app");

describe("Autenticação", () => {

    let authorization;

    test("O endereço de email deve ser inválido [Requests/UserRequest@check('email')]", () => {

        return request(app)
            .post("/auth/login")
            .send(
                {
                    "email": "",
                    "password": "12345678",
                }
            )
            .then(response => {
                const expected = {
                    value: '',
                    msg: 'Endereço de email inválido',
                    param: 'email',
                    location: 'body'
                };
                const [ email ] = response.body.errors;

                expect(email).toEqual(expected);
                expect(response.statusCode).toBe(400);
            });
    });

    test("Campo senha tem que ser vazio [Requests/UserRequest@check('password')]", () => {

        return request(app)
            .post("/auth/login")
            .send(
                {
                    "email": "teste@email.com.br",
                    "password": "",
                }
            )
            .then(response => {
                const expected = {
                    value: "",
                    msg: "Campo senha não pode ser vazio",
                    param: "password",
                    location: "body"
                };
                const [ password ] = response.body.errors;

                expect(password).toEqual(expected);
                expect(response.statusCode).toBe(400);
            });
    });

    test("Login com usuário e senha deve retonar o token JWT no Header authorization", () => {

        return request(app)
            .post("/auth/login")
            .send(
                {
                    "email": "teste@email.com.br",
                    "password": "12345678",
                }
            )
            .then(response => {
                expect(response.header).toHaveProperty('authorization');
                authorization = response.header.authorization;
            });

    });

    test("Logout para inserir token JWT na blacklist do redis", () => {

        return request(app)
            .get("/auth/logout")
            .set({'Authorization': 'Bearer ' + authorization})
            .then(response => {
                expect(response.statusCode).toBe(204);
            });

    });

});
