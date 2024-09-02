import conectar from "./migration.js"

let enviar = document.getElementById("enviar")

async function cadastro(apelido, email, senha)
{
    const banco = await conectar()

    let sql = `
        INSERT INTO enviar(apelido, email, senha)
        VALUES (?, ?, ?)
    `

    await banco.run(sql, [apelido.value, email.value, senha.value])
}

enviar.addEventListener("click", () => {
    let apelido = document.getElementById("apelido")
    let email = document.getElementById("email")
    let senha = document.getElementById("senha")
    cadastro(apelido, email, senha)
})