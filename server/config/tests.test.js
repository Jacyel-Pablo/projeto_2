import app from "./server_paginas.js";
import request from "supertest";
import { before, it, describe } from "node:test"
import assert from "node:assert";

// Dados de um usuário para testes

function dados()
{
    let user = {
        email: "testando123@gmail.com",
        apelido: "JacyelGamer2",
        senha: "123"
    }

    return user
}

let user;

// Token de validação do usuário para testes
let token;

describe("Esse e o teste das rotas", () => {

    before(() => {
        user = dados()
    })

    describe("Teste da rota de /submit", () => {
        it("Testando se a rota de submit está certa", async () => {
            const response = await request(app).post(`/submit`).send(user);
            assert.strictEqual(response.status, 201);
        })

        it("Testando se a rota de submit está retornando o erro", async () => {
            const response = await request(app).post("/submit");
            assert.strictEqual(response.status, 404);
        })
    })

    describe("Teste da rota de /valida", () => {
        it("Testando se a rota de /validar está dando certo", async () => {
            const response = await request(app).get(`/valida?email=${user.email}&senha=${user.senha}`).then(dados => {
                token = dados._body.email_encrypt

                assert.strictEqual(dados.status, 200);
            })
        })
        
        it("Testando se a rota de validar está retornado o erro", async () => {
            const response = await request(app).get("/valida");
            assert.strictEqual(response.status, 404);
        })
    })

    describe("Teste da rota token", () => {
        it("Testando se a rota de /validar_token está dando certo", async () => {
            const response = await request(app).get(`/validar_token?token=${token}`);
            assert.strictEqual(response.status, 200);
        })

        it("Testando se a rota de /validar_token está retornando o erro", async () => {
            const response = await request(app).get("/validar_token");
            assert.strictEqual(response.status, 404);
        })
    })

    describe("Teste de rota /lista", () => {
        it("Testando se a rota de /lista está dando certo", async () => {
            const response = await request(app).get(`/lista?email=${user.email}`).set("Authorization", token);
            assert.strictEqual(response.status, 200);
        })

        it("Testando se a rota de /lista está retornando o erro", async () => {
            const response = await request(app).get("/lista");
            assert.strictEqual(response.status, 404);
        })
    })
})