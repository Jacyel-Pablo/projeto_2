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
        CREATE TABLE usuario(
            email VARCHAR(230) NOT NULL UNIQUE,
            apelido VARCHAR(70) NOT NULL UNIQUE,
            senha VARCHAR(200) NOT NULL
        )
    `
    
    await banco.run(sql)
}

configuracao_default()