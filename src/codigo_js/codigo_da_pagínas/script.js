"use strict";
function salvar_filme()
{
    const filme1 = document.getElementsByTagName('a');
    if (filme1 != null) {
        for (let i = 0; i < filme1.length; i++) {
            filme1[i].addEventListener('click', () => {
                let name__filme = filme1[i].id;
                console.log(filme1[i].id);
                if (name__filme.split(" ").length > 1) {
                    name__filme = name__filme.split(" ");
                    localStorage.setItem('filme', name__filme[1]);
                }
                else {
                    localStorage.setItem('filme', name__filme);
                }
            });
        }
    }
}
function lancamento() {
    fetch('/Dados_menu').then(dados => dados.json()).then(dados => {
        // Acessando ultimo valor da tabela
        fetch("/pegar_index_ultimo_filme").then(dados1 => dados1.json()).then(dados1 => {
            let ultimo_index = dados1["ultimo_index"]
            let contado = 5

            for (let i = 0; i < 4; i++) {
                ultimo_index -= i
                // Pegar tag a
                contado -= 1
                console.log(contado)
                let a = document.getElementsByTagName("a")
                a[contado - 1].id = `filme${contado} ${ultimo_index}`

                fetch(`/pegar_ultima_tabela_filmes?numeros=${ultimo_index}`).then(tabela => tabela.json()).then(tabela => {
                    tabela = tabela[0]

                    const imagem = document.getElementById('imagem' + (4 - i).toString());
                    imagem.setAttribute('src', tabela.capa);
        
                    const nome = document.getElementById('nome' + (4 - i).toString());
                    nome.innerHTML = tabela.nome;
        
                    const star = document.getElementById('star' + (4 - i).toString());
                    star.setAttribute('src', tabela.star);
        
                    const ava = document.getElementById('ava' + (4 - i).toString());
                    ava.innerHTML = tabela.avaliação;
                })
                ultimo_index = dados1["ultimo_index"]

            }
        })
    });
}
function dados_filme() {
    const nome_filme = localStorage.getItem('filme');
    fetch(`/pegar_ultima_tabela_filmes?numeros=${nome_filme}`).then(dados => dados.json()).then(dados => {
        dados = dados[0]
        // colocando os dados

        const poster = document.getElementById('poster');
        poster.setAttribute('src', dados.capa);

        const nome_filme1 = document.getElementById('nome__filme');
        nome_filme1.innerHTML = dados["nome"];

        const star = document.getElementById('star');
        star.setAttribute('src', dados["star"]);

        const avalia = document.getElementById('avalia');
        avalia.innerHTML = dados["avaliação"];

        const sinopse_txt = document.getElementById('sinopse__txt');
        sinopse_txt.innerHTML = dados["sinopse"];
    });
}
