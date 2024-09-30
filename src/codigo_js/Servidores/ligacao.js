import express from "express";
import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt"
// import dotenv, { parse } from "dotenv"

// Ligação de dados com banco de dados

const rotas = express.Router()

// Variavel do prisma

const prisma = new PrismaClient()

rotas.get("/submit", async (request, response) => {
    const email = request.query.email
    const apelido = request.query.apelido
    const senha = request.query.senha //await bcrypt.hash(request.query.senha, parseInt(process.env.PULO))

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
    const senha_user = request.query.senha //await bcrypt.hash(request.query.senha, parseInt(process.env.PULO))

    async function main()
    {
        let dados = await prisma.usuario.findUnique({
            where: {email: request.query.email}
        })

        try {
            if (dados.senha == senha_user) {
                delete dados.senha
                response.send(dados)
            } else {
                response.send(false)
            }
        } catch(e) {
            console.log(e)
            response.send(false)
        }
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
    let sinopse = request.query.sinopse

    async function main()
    {
        await prisma.filmes.create({
            data: {
                "capa": capa,
                "nome": nome,
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
                "id_filmes": Number(numero)
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

// rotas dados__filme.html
// rota de avaliação de filmes visualizar quantas estrelas um filme tem
rotas.get("/avaliacao_user", async (request, response) => {
    const id_filme = request.query.id_filme
    const email = request.query.email

    async function main()
    {
        try{
            const dados = await prisma.estrelas.findMany({
                where: {
                    id_filmes: parseInt(id_filme)
                }
            })

            let valor = false

            for (let i = 0; i < dados.length; i++) {
                if (dados[i].email == email) {
                    valor = true

                }
            }

            response.send(valor)

        } catch (e) {
            console.log(e)
            response.send(false)
        }
    }

    main().then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })
})

// rota de contar as estrelas que um filme possui
rotas.get("/votos", async (request, response) => {
    const id_filme = parseInt(request.query.id)

    async function main() {
        try{
            const dados = await prisma.estrelas.count({
                where: {
                    id_filmes: id_filme
                }
            })
            
            response.send(dados.toString())

        } catch(e) {
            response.send("0")
        }
    }

    main().then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })
})

// registra se o usúario apertou ou não a estrela
rotas.get("/ativa_desativa_estrela", (request, response) => {
    const ativa_desativa = request.query.condicao_estrela
    const email = request.query.email
    const id_filme = parseInt(request.query.id)

    async function main() {
        if (ativa_desativa == "off") {
            await prisma.estrelas.deleteMany({
                where: {
                    id_filmes: id_filme,
                    email: email
                }
            })

        } else {
            await prisma.estrelas.create({
                data: {
                    id_filmes: id_filme,
                    email: email
                }
            })
        }
    }

    main().then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.log(e)
        prisma.$disconnect()
        process.exit(1)
    })
})

// user_config.js altera nome
// Função de alterar
rotas.get("/alterar_nome", (request, response) => {
    const email = request.query.email
    const nome = request.query.nome

    async function main()
    {
        try {
            await prisma.usuario.update({
                where: {
                    email: email
                },
                data: {
                    apelido: nome
                }
            })

            response.send(true)
            
        } catch(e) {
            response.send(false)
        }
    }

    main().then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)

    })
})

// Função adicionar os filmes na lista de favorios

rotas.get("/lista", (request, response) => {
    const email = request.query.email

    async function main()
    {
        try {
            const dados_lista = await prisma.estrelas.findMany({
                where: {
                    email: email
                }
            })
    
            const lista_filmes = []
    
            let dados
    
            for (let i = 0; i < dados_lista.length; i++) {
                dados = await prisma.filmes.findMany({
                    where: {
                        id_filmes: dados_lista[i].id_filmes
                    }
                })
    
                lista_filmes.push(dados)
            }
    
            response.send(lista_filmes)

        } catch (e) {
            console.log(e)
            response.send([])
        }
    }

    main().then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })
})

export default rotas