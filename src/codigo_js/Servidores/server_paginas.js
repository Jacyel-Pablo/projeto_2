import express from "express"
import cors from "cors"
import rotas from "./ligacao.js"

// Indo para pasta principal
let path1 = process.cwd().split("\\")
let path = ""

for(let i = 0; i < path1.length - 3; i++) {
    if (i == 0) {
        path += path1[i]

    } else {
        path += "/" + path1[i]

    }
}

// Criando um servido
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

// Rotas de comunicação com o servidor
app.use(rotas)

// Pagína index.html

app.get("/", (request, response) => {
    response.sendFile(path + "/public/index.html")
})

// Modo dev
app.get("/.dev", (request, response) => {
    response.sendFile(path + "/public/pagínas/modo_dev.html")
})

app.get("/.dev.css", (request, response) => {
    response.sendFile(path + "/public/css/modo_dev.css")
})

app.get("/.dev.js", (request, response) => {
    response.sendFile(path + "/src/codigo_js/codigo_da_pagínas/modo_dev.js")
})

// Pagína index.html

app.get("/index.html/index.css", (request, response) => {
    response.sendFile(path + "/public/css/index.css")
})

app.get("/index.js", (resquest, response) => {
    response.sendFile(path + "/src/codigo_js/codigo_da_pagínas/index.js")
})

// Pagína criar conta.html

app.get("/criar_conta.html", (request, response) => {
    response.sendFile(path + "/public/pagínas/criar conta.html")
})

app.get("/criar_conta.js", (request, response) => {
    response.sendFile(path + "/src/codigo_js/codigo_da_pagínas/criar_conta.js")
})

// Pagína menu.html

app.get("/menu.html", (request, response) => {
    response.sendFile(path + "/public/pagínas/menu.html")
})

app.get("/menu.css", (request, response) => {
    response.sendFile(path + "/public/css/menu.css")
})

app.get("/script.js", (request, response) => {
    response.sendFile(path + "/src/codigo_js/codigo_da_pagínas/script.js")
})

// Pagína user__config.html
app.get("/user__config.html", (request, response) => {
    response.sendFile(path + "/public/pagínas/user__config.html")
})

app.get("/user__config.html/user__config.css", (request, response) => {
    response.sendFile(path + "/public/css/user__config.css")
})

app.get("/user__config.js", (request, response) => {
    response.sendFile(path + "/src/codigo_js/codigo_da_pagínas/user__config.js")
})

// Pagína dados__filme.html
app.get("/dados__filme.html", (request, response) => {
    response.sendFile(path + "/public/pagínas/dados__filme.html")
})

app.get("/dados__filme.html/dados__filme.css", (request, response) => {
    response.sendFile(path + "/public/css/dados__filme.css")
})

// Assets

// imagem Seta voltar.png

app.get("/Seta_voltar.png", (request, response) => {
    response.sendFile(path + "/public/Resources/user__config/Seta voltar.png")
})

// Estrelas 
app.get("/full.png", (request, response) => {
    response.sendFile(path + "/public/Resources/full.png")
})

app.get("/meia.png", (request, response) => {
    response.sendFile(path + "/public/Resources/meia.png")
})

app.get("/zero.png", (request, response) => {
    response.sendFile(path + "/public/Resources/zero.png")
})

// Dados da parte menu

app.get("/Dados_menu", (request, response) => {
    response.send([
        ["https://th.bing.com/th/id/OIP.t00ptKD6SzQXCqjZ4rYypwHaHa?rs=1&pid=ImgDetMain", "Duna: Parte 2", "/meia.png", "4,0"],
        ["https://elimeira.com.br/wp-content/uploads/2024/02/zona-de-risco.jpeg", "Zona de Risco", "/meia.png", "3,0"],
        ["https://br.web.img3.acsta.net/c_310_420/pictures/24/02/26/15/51/5309637.jpg", "A Serva", "/zero.png", "0,0"],
        ["https://th.bing.com/th/id/OIP.rFDYUreRHlSKfOUthDdDiQAAAA?w=270&h=400&rs=1&pid=ImgDetMain", "Os Farofeiros 2", "/meia.png", "3,1"]
    ])
})

// Dados da pagína dados__filme.html

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

// Pagína de erro

app.use((request, response) => {
    response.status(404).sendFile(path + "/public/pagínas/pagina_arquivo_nao_encontrado.html")
})

app.listen(3000, console.log("O Servido está online"))