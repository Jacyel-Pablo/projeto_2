function config_default()
{
    const nome = document.getElementById("nome")
    const lapis = document.getElementById("lapis")
    const input = document.getElementById("input_alterar_nome")

    var click_lapis = false

    function nome_user() {        
        nome.innerHTML = localStorage.getItem("apelido")
    }

    function alterar_nome_lapis_false()
    {
        nome.innerHTML = ""
        input.style.width = "150px"
    }

    function alterar_nome_lapis_true()
    {
        if (input.value == "") {
            alert("O nome não pode ser vazio")

        } else {
            fetch(`http://localhost:3000/alterar_nome?email=${localStorage.getItem("email")}&nome=${input.value}`).then(dados => dados.json()).then(dados => {
                if (dados == true) {
                    nome.innerHTML = input.value
                    input.style.width = "0px"
                    click_lapis = false
                    localStorage.setItem("apelido", input.value)
                    input.value = ""

                } else {
                    alert("Usúario já exitente")
                }
            })
        }
    }

    nome_user()

    lapis.addEventListener("click", () => {
        if (click_lapis == false) {
            alterar_nome_lapis_false()
            click_lapis = true

        } else {
            alterar_nome_lapis_true()

        }
    })
}

// adicionar os filmes Lista de Favoritos
const box2 = document.getElementById("box2")

function favoritos()
{
    console.log("oi")

    fetch(`/lista?email=${localStorage.getItem("email")}`).then(dados => dados.json())
    .then(dados => {
        for (let i = 0; i < dados.length; i++) {
            box2.insertAdjacentHTML("afterbegin", 
                `
                <a id="${dados[i][0].id_filmes}" class="love__link" href="dados__filme.html">
                    <div class="caixa__favoritos bio__txt" style="background-color: white;">
                        <div class="container1">
                            <img class="capa" src="${dados[i][0].capa}" alt="capa do filme">
                        </div>

                        <h3 class="nome__filme">${dados[i][0].nome}</h3>
                    </div>
                </a>
            `
            )
        }
    })
}

favoritos()
