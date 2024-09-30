const enviar = document.getElementById("enviar")

enviar.addEventListener("click", () => {
    let capa = document.getElementById("capa")
    capa = capa.value
    let nome = document.getElementById("nome")
    nome = nome.value
    let sinopse = document.getElementById("sinopse")
    sinopse = sinopse.value

    fetch(`/enviar_filmes?capa=${capa}&nome=${nome}&sinopse=${sinopse}`)

    window.location.href = "/"
})