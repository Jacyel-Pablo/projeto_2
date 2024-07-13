"use strict";
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
function lancamento() {
    const dados = fetch('/Dados_menu').then(dados => dados.json()).then(dados => {
        for (let i = 0; i < 4; i++) {
            const imagem = document.getElementById('imagem' + (i + 1).toString());
            imagem.setAttribute('src', dados[i][0]);

            const nome = document.getElementById('nome' + (i + 1).toString());
            nome.innerHTML = dados[i][1];

            const star = document.getElementById('star' + (i + 1).toString());
            star.setAttribute('src', dados[i][2]);

            const ava = document.getElementById('ava' + (i + 1).toString());
            ava.innerHTML = dados[i][3];
        }
    });
}
function dados_filme() {
    fetch('/Dados_dados_filme').then(dados => dados.json()).then(dados => {
        const nome_filme = localStorage.getItem('filme');

        // O id_nome mais o for vão procurar na matriz em qual das listas está o nome do filme
        let id_nome = ""

        for (let i = 0; i < dados.length; i++) {
            if (dados[i].indexOf(nome_filme) != -1) {
                id_nome = i
                break
            }
        }

        // colocando os dados

        const poster = document.getElementById('poster');
        poster.setAttribute('src', dados[id_nome][1]);

        const nome_filme1 = document.getElementById('nome__filme');
        nome_filme1.innerHTML = dados[id_nome][2];

        const star = document.getElementById('star');
        star.setAttribute('src', dados[id_nome][3]);

        const avalia = document.getElementById('avalia');
        avalia.innerHTML = dados[id_nome][4];

        const sinopse_txt = document.getElementById('sinopse__txt');
        sinopse_txt.innerHTML = dados[id_nome][5];
    });
}
