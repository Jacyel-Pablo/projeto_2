const botao_enviar = document.getElementById("enviar")

botao_enviar.addEventListener("click", () => {
    let apelido = document.getElementById("apelido")
    apelido = apelido.value
    let email = document.getElementById("email")
    email = email.value
    let senha = document.getElementById("senha")
    senha = senha.value

    fetch(`/submit?tabela=usuario&email=${email}&apelido=${apelido}&senha=${senha}`)
})