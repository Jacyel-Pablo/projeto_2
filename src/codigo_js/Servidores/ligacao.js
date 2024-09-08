import express from "express";
import conectar from "./migration.js";

// Ligação de dados com banco de dados

const rotas = express.Router()

rotas.get("/submit", async (request, response) => {
    const banco = await conectar()

    const tabela = request.query.tabela
    const email = request.query.email
    const apelido = request.query.apelido
    const senha = request.query.senha

    let sql = `
        INSERT INTO ${tabela}(email, apelido, senha)
        VALUES ("${email}", "${apelido}", "${senha}")
    `

    await banco.run(sql)
})

// Validar login e senha
rotas.get("/valida", async (request, response) => {
    const banco = await conectar()
    
    try{
        let sql = `
            SELECT * FROM usuario
            WHERE email = "${request.query.email}"
        `

        response.send(await banco.all(sql))

    } catch(e) {
        response.send({})
    }
})

// Enviar filmes para o banco de dados

rotas.get("/enviar_filmes", async (request, response) => {
    const banco = await conectar()

    let capa = request.query.capa
    let nome = request.query.nome
    let star = request.query.star
    let avaliacao = request.query.avaliacao
    let sinopse = request.query.sinopse

    let sql = `
        INSERT INTO filmes(capa, nome, star, avaliação, sinopse)
        VALUES ("${capa}", "${nome}", "${star}", "${avaliacao}", "${sinopse}")
    `

    await banco.run(sql)
})

rotas.get("/pegar_index_ultimo_filme", async (request, response) => {
    const banco = await conectar()

    let sql = `
        SELECT COUNT(*) FROM filmes
    `

    let ultima_tabela = await banco.all(sql)
    ultima_tabela = ultima_tabela[0]['COUNT(*)']

    response.send({"ultimo_index":ultima_tabela})
})

rotas.get("/pegar_ultima_tabela_filmes", async (request, response) => {
    const banco = await conectar()

    let numero = request.query.numeros

    let sql = `
        SELECT * FROM filmes
        WHERE id=${numero}
    `

    response.send(await banco.all(sql))
})

export default rotas