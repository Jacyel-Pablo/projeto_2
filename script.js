const filme1 = document.getElementsByTagName('a')

if (filme1 != null) {

    for (let i = 0; i < filme1.length; i++) {
        filme1[i].addEventListener('click', () => {

            let name__filme = filme1[i].id
            
            if (name__filme.split(" ").length > 1) {
                name__filme = name__filme.split(" ")
                localStorage.setItem('filme', name__filme[1])

            } else {
                localStorage.setItem('filme', name__filme)

            }
        })
    }
}

function lancamento() {
    const dados = fetch('dados.json').then(dados => dados.json()).then(dados => {

        for (let i = 0; i < 4; i++) {
            console.log(dados["filme4"][0])
            document.getElementById('imagem' + (i + 1).toString()).setAttribute('src', dados['filme' + (i + 1).toString()][0])
            document.getElementById('nome' + (i + 1).toString()).innerHTML = dados['filme' + (i + 1).toString()][1]
            document.getElementById('star' + (i + 1).toString()).setAttribute('src', dados['filme' + (i + 1).toString()][2])
            document.getElementById('ava' + (i + 1).toString()).innerHTML = dados['filme' + (i + 1).toString()][3]
        }

    })
}

function dados_filme() {
    fetch('dados.json').then(dados => dados.json()).then(dados => {
        const nome_filme = localStorage.getItem('filme')

        const poster = document.getElementById('poster')
        poster.setAttribute('src', dados[nome_filme][0])

        const nome_filme1 = document.getElementById('nome__filme')
        nome_filme1.innerHTML = dados[nome_filme][1]

        const star = document.getElementById('star')
        star.setAttribute('src', dados[nome_filme][2])

        const avalia = document.getElementById('avalia')
        avalia.innerHTML = dados[nome_filme][3]

        const sinopse_txt = document.getElementById('sinopse__txt')
        sinopse_txt.innerHTML = dados[nome_filme][4]
    })
}