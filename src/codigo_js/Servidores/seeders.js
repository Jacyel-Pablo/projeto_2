import conectar from "./migration.js"

async function configuracao_default()
{
    const banco = await conectar()

    let sql = `
        CREATE TABLE filmes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            capa VARCHAR(300) NOT NULL,
            nome VARCHAR(120) NOT NULL,
            star VARCHAR(200) NOT NULL,
            avaliação VARCHAR(4) NOT NULL,
            sinopse VARCHAR(1000) NOT NULL
        )
    `
    
    await banco.run(sql)

    sql = `
        INSERT INTO filmes(capa, nome, star, avaliação, sinopse)
        VALUES ("https://th.bing.com/th/id/OIP.t00ptKD6SzQXCqjZ4rYypwHaHa?rs=1&pid=ImgDetMain", "Duna: Parte 2", "/meia.png", "4,0", "Em Duna: Parte 2, Paul Atreides (Timothée Chalamet) se une a Chani (Zendaya) e aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família. Uma jornada espiritual, mística e marcial se inicia. Para se tornar Muad'Dib, enquanto tenta prevenir o futuro horrível, mas inevitável que ele testemunhou, Paul Atreides vê uma Guerra Santa em seu nome, espalhando-se por todo o universo conhecido. Enfrentando uma escolha entre o amor de sua vida e o destino do universo, Paul deve evitar um futuro terrível que só ele pode prever. Se tudo sair como planejado, ele poderá guiar a humanidade para um futuro promissor.")
    `
    
    await banco.run(sql)
}

configuracao_default()