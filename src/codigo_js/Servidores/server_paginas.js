import { PrismaClient } from "@prisma/client"
import express from "express"
import cors from "cors"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { isNumeric, criar_token, valida_token } from "./middleware.js"

const app = express()

app.use(express.json())

app.use(
    cors({
      origin: '*',
      methods: 'GET',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      preflightContinue: false,
    })
);

// Variavel do prisma

const prisma = new PrismaClient()

app.post("/submit", async (request, response) => {
    const email = request.query.email
    const apelido = request.query.apelido
    const senha = await bcrypt.hash(request.query.senha, Number(process.env.PULO))

    async function main() {
        await prisma.usuario_projeto_2.create({
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
app.get("/valida", async (request, response) => { 
    const senha_user = request.query.senha

    async function main()
    {
        let dados = await prisma.usuario_projeto_2.findUnique({
            where: {email: request.query.email}
        })

        try {
            if (await bcrypt.compare(senha_user, dados.senha) && dados.length != 0) {
                delete dados.senha

                dados["email_encrypt"] = criar_token({email_encrypt: dados.email})

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

// Validação do token de login

app.get(("/validar_token"), (request, response) => {
    const token = request.query.token

    try {
        response.send(valida_token(token))

    } catch(e) {
        response.send(false)
    }
})

// Enviar filmes para o banco de dados

app.post("/enviar_filmes", async (request, response) => {
    let capa = request.query.capa
    let nome = request.query.nome
    let sinopse = request.query.sinopse

    async function main()
    {
        await prisma.filmes_projeto_2.create({
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

app.get("/pegar_index_ultimo_filme", async (request, response) => {

    async function main()
    {
        const ultima_tabela = await prisma.filmes_projeto_2.findMany()

        const lista_index_filme = []
        for (let i = 0; i < ultima_tabela.length; i++) {

            if (i <= 3 && await prisma.filmes_projeto_2.count() >= i + 1) {
                lista_index_filme.push(ultima_tabela[ultima_tabela.length - (i + 1)].id_filmes)
            }
        }
        // response.send({"ultimo_index":ultima_tabela})
        response.send(lista_index_filme)
    }

    main().then(async () => {
        await prisma.$disconnect()
    }).catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })
})

app.get("/pegar_filmes_da_tabela", async (request, response) => {
    const numero = request.query.numeros
    const token = request.query.token

    async function main()
    {
        if (valida_token(token)) {
            try {
                // O if vai verificar se a algum projeto dentro do banco ou não
                if (await prisma.filmes_projeto_2.count() != 0 && isNumeric(numero) == true) {
    
                    let dados = await prisma.filmes_projeto_2.findUnique({
                        where: {
                            "id_filmes": Number(numero)
                        }
                    })
    
                    if (dados != null) {
                        response.send(dados)
                    } else {
                        response.send(false)
                    }
    
                } else {
                    response.send(false)
                }
        
            } catch (e) {
                console.log(e)
                response.send(false)
            }
        } else {
            response.send(false)
        }
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
app.get("/avaliacao_user", async (request, response) => {
    const id_filme = request.query.id_filme
    const email = request.query.email

    async function main()
    {
        try{
            const dados = await prisma.estrelas_projeto_2.findMany({
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
app.get("/votos", async (request, response) => {
    const id_filme = parseInt(request.query.id)
    const token = request.query.token

    async function main() {
        if (valida_token(token) == true) {
            try{
                const dados = await prisma.estrelas_projeto_2.count({
                    where: {
                        id_filmes: id_filme
                    }
                })
                
                response.send(dados.toString())
    
            } catch(e) {
                response.send("0")
            }

        } else {
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

// registra se o usúario apertou ou não a estrela
app.post("/ativa_desativa_estrela", (request, response) => {
    const ativa_desativa = request.query.condicao_estrela
    const email1 = request.query.email
    const id_filme = parseInt(request.query.id)

    async function main() {
        if (ativa_desativa == "off") {
            await prisma.estrelas_projeto_2.deleteMany({
                where: {
                    id_filmes: id_filme,
                    email: email1
                }
            })

        } else {
            await prisma.estrelas_projeto_2.create({
                data: {
                    id_filmes: id_filme,
                    email: email1
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
app.get("/alterar_nome", (request, response) => {
    const email = request.query.email
    const nome = request.query.nome

    async function main()
    {
        try {
            await prisma.usuario_projeto_2.update({
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

app.get("/lista", (request, response) => {
    const email = request.query.email

    async function main()
    {
        try {
            const dados_lista = await prisma.estrelas_projeto_2.findMany({
                where: {
                    email: email
                }
            })
    
            const lista_filmes = []
    
            let dados
    
            for (let i = 0; i < dados_lista.length; i++) {
                dados = await prisma.filmes_projeto_2.findMany({
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

// Sistema de comentarios

// Adicionado os dados no servidor

app.post("/enviar_comentarios", async (request, response) => {
    const email = request.query.email
    const id_filmes = Number(request.query.id_filmes)
    const apelido = request.query.apelido
    const comentario = request.query.comentario
    const data = new Date().toISOString()

    async function main()
    {
        try{
            await prisma.comentarios_filmes_projeto_2.create({
                data: {
                    "email": email,
                    "id_filmes": id_filmes,
                    "apelido": apelido,
                    "comentario": comentario,
                    "data": data
                }
            })
    
        } catch (e) {
            console.log("Erro", e)
        }
    }

    main().then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })
})

app.get("/lista_comentarios", (request, response) => {
    const filme = Number(request.query.filme)

    async function main()
    {
        try{
            const lista_comentarios = await prisma.comentarios_filmes_projeto_2.findMany({
                where: {
                    id_filmes: filme
                }
            })

            if (lista_comentarios.length == 0) {
                response.send(false)

            } else {
                response.send(lista_comentarios)
            }

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

// app.get("/Dados_dados_filme", (request, response) => {
//     response.send(    
//     [
//         ["duna_Parte_2", "https://th.bing.com/th/id/OIP.t00ptKD6SzQXCqjZ4rYypwHaHa?rs=1&pid=ImgDetMain", "Duna: Parte 2", "/meia.png", "4,0", "Em Duna: Parte 2, Paul Atreides (Timothée Chalamet) se une a Chani (Zendaya) e aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família. Uma jornada espiritual, mística e marcial se inicia. Para se tornar Muad'Dib, enquanto tenta prevenir o futuro horrível, mas inevitável que ele testemunhou, Paul Atreides vê uma Guerra Santa em seu nome, espalhando-se por todo o universo conhecido. Enfrentando uma escolha entre o amor de sua vida e o destino do universo, Paul deve evitar um futuro terrível que só ele pode prever. Se tudo sair como planejado, ele poderá guiar a humanidade para um futuro promissor."],
//         ["zona_de_risco", "https://elimeira.com.br/wp-content/uploads/2024/02/zona-de-risco.jpeg", "Zona de Risco", "/meia.png", "3,0", "Em Land of Bad, um piloto de drone das Forças Aéreas é a única esperança de uma força-tarefa presa em uma emboscada. No thriller de ação, a missão de um esquadrão de operações especiais da Força Delta vira um grande desastre. Cercados pelo inimigo em um território remoto nas Filipinas, a única chance de resgate está nas mãos de Reaper (Russel Crowe), um piloto de drone, e Kinney (Liam Hemsworth), um jovem oficial da aeronáutica. Eles têm 48 horas para resgatar os soldados antes que vire um banho de sangue."],
//         ["a_serva", "https://br.web.img3.acsta.net/c_310_420/pictures/24/02/26/15/51/5309637.jpg", "A Serva", "/zero.png", "0,0", "Há 200 anos, Vicenta María (Cristina González del Valle) seguiu sua vocação para proteger outras mulheres jovens necessitadas, que não tinham as mesmas oportunidades e desejavam emigrar de suas aldeias para a cidade grande.<br>Nesse contexto, Lera, uma empregada doméstica que fugiu da Ucrânia, é presa e acusada de roubo. Na cela de um quartel, ela conhece Mihaela e Julia, duas prostitutas com quem partilha a história que salvou sua vida, envolvendo Vicenta María."],
//         ["os_farofeiros_2", "https://th.bing.com/th/id/OIP.rFDYUreRHlSKfOUthDdDiQAAAA?w=270&h=400&rs=1&pid=ImgDetMain", "Os Farofeiros 2", "/meia.png", "3,1", "Em Os Farofeiros 2, acompanhamos um novo capítulo da história dos amigos Alexandre (Antônio Fragoso), Lima (Maurício Manfrini), Rocha (Charles Paraventi) e Diguinho (Nilton Bicudo). Quando Alexandre é reconhecido como o melhor gerente de vendas na empresa em que trabalha, ele ganha como recompensa por seus esforços uma viagem para a Bahia com toda a família. Porém, os outros três amigos não estão muito felizes com a forma como Alexandre comanda as coisas. Para tentar amolecer o coração dos amigos e garantir sua tão esperada promoção, ele resolve levar todos - acompanhados das esposas e dos filhos - para a viagem ao Nordeste."],
//         ["kung_fu_panda_4", "https://th.bing.com/th/id/OIP.94api0uULtTrc4uZy1vlsAAAAA?w=474&h=709&rs=1&pid=ImgDetMain", "Kung Fu Panda 4", "/meia.png", "3,8", "Depois de três aventuras arriscando sua própria vida para derrotar os mais poderosos vilões, Po, o Grande Dragão Guerreiro( Jack Black) é escolhido para se tornar o Líder Espiritual do Vale da Paz. A escolha em si já problemática ao colocar o mestre de kung fu mais improvável do mundo em um cargo como esse e além disso, ele precisa encontrar e treinar um novo Dragão Guerreiro antes de assumir a honrada posição e a pessoa certa parece ser Zhen (Awkwafina) uma raposa com muitas habilidades, mas que não gosta muito da ideia de ser treinada. Como se os desafios já não fossem o bastante, a Camaleoa (Viola Davis), uma feiticeira perversa, tenta trazer de volta todos os vilões derrotados por Po do reino espiritual."]
//     ])
// })

app.listen(3000, console.log("O Servido está online"))