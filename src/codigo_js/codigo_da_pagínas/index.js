const enviar = document.getElementById("enviar")

enviar.addEventListener("click", () => {
    let email = document.getElementById("email")
    let senha = document.getElementById("senha")
    window.location.href = "/menu.html"

    fetch(`/valida?email=${email.value}&senha=${senha.value}`).then(dados => dados.json()).then(dados => {
        // if (dados == false) {
        //     email.value = " "
        //     senha.value = ""
        //     alert("Email ou senha incorretos")

        // } else {
        //     window.location.href = "/menu.html"
        // }
    })
})