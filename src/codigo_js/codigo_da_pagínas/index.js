const enviar = document.getElementById("enviar")

enviar.addEventListener("click", () => {
    let email = document.getElementById("email")
    let senha = document.getElementById("senha")

    fetch(`/valida?email=${email.value}`).then(dados => dados.json()).then(dados => {
        if (dados.length == 0) {
            email.value = " "
            senha.value = ""
            alert("Email ou senha incorretos")

        } else {
            console.log(dados)
            if (senha.value == dados.senha && senha.value.length != 0) {
                window.location.href = "/menu.html"
            } else {
                email.value = " "
                senha.value = ""
                alert("Email ou senha incorretos")
            }
        }
    })
})