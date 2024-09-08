const enviar = document.getElementById("enviar")

enviar.addEventListener("click", () => {
    let capa = document.getElementById("capa")
    capa = capa.value
    let nome = document.getElementById("nome")
    nome = nome.value
    let estrela = document.getElementById("estrela")
    estrela = estrela.value
    let avaliacao = document.getElementById("avaliacao")
    avaliacao = avaliacao.value
    let sinopse = document.getElementById("sinopse")
    sinopse = sinopse.value

    fetch(`/enviar_filmes?capa=${capa}&nome=${nome}&star=${estrela}&avaliacao=${avaliacao}&sinopse=${sinopse}`)
})