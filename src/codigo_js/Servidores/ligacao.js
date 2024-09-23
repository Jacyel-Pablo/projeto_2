import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import dotenv, { parse } from "dotenv"

// Ligação de dados com banco de dados

const rotas = express.Router()

// Variavel do prisma

const prisma = new PrismaClient()

rotas.get("/submit", async (request, response) => {
    const email = request.query.email
    const apelido = request.query.apelido
    const senha = await bcrypt.hash(request.query.senha, parseInt(process.env.PULO))

    async function main() {
        await prisma.usuario.create({
            data: {
                "email": email,
                "apelido": apelido,
                "senha": senha
            }
        })
    }

    main().then(async () => {
        prisma.$disconnect()

    }).catch(async (e) => {
        console.log(e)
        prisma.$disconnect()
        process.exit(1)
    })
})

// Validar login e senha
rotas.get("/valida", async (request, response) => {    
    const senha_user = await bcrypt.hash(request.query.senha, parseInt(process.env.PULO))

    async function main()
    {
        let dados = await prisma.usuario.findUnique({
            where: {email: request.query.email}
        })

        // if (dados.senha == senha_user) {
        //     response.send(true)
        // } else {
        //     response.send(false)
        // }
    }

    main().then(async () => {
        await prisma.$disconnect()
    }).catch(async (e) => {
        console.log(e)
        prisma.$disconnect()
        process.exit(1)
    })
})

// Enviar filmes para o banco de dados

rotas.get("/enviar_filmes", async (request, response) => {
    let capa = request.query.capa
    let nome = request.query.nome
    let star = request.query.star
    let avaliacao = request.query.avaliacao
    let sinopse = request.query.sinopse

    async function main()
    {
        await prisma.filmes.create({
            data: {
                "capa": capa,
                "nome": nome,
                "star": star,
                "avaliacao": avaliacao,
                "sinopse": sinopse
            }
        })
    }

    main().then(async ()=>{
        await prisma.$disconnect()
    }).catch(async (e)=> {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })
})

rotas.get("/pegar_index_ultimo_filme", async (request, response) => {

    async function main()
    {
        const ultima_tabela = await prisma.filmes.count()

        response.send({"ultimo_index":ultima_tabela})
    }

    main().then(async () => {
        await prisma.$disconnect()
    }).catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })
})

rotas.get("/pegar_ultima_tabela_filmes", async (request, response) => {
    let numero = request.query.numeros

    let sql = `
        SELECT * FROM filmes
        WHERE id=${numero}
    `

    async function main()
    {
        let dados = await prisma.filmes.findUnique({
            where: {
                "id": Number(numero)
            }
        })

        response.send(dados)
    }

    main().then(async () => {
        await prisma.$disconnect()
    }).catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })
})

export default rotas