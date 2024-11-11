import style from "../Estilos/dados__filme.module.css"
import Nav_bar from "./nav_bar"
import estrela_full from "../Resources/full.png"
import estrela_zero from "../Resources/zero.png"
import { useState, useEffect } from "react";

export default function Dados__filme()
{

    const [dados, setDados] = useState({
        poster: "https://th.bing.com/th/id/OIP.qlFuyLoeOSg012B3TDCogAAAAA?rs=1&pid=ImgDetMain",
        nome__filme: "",
        star: "",
        avalia: "0",
        sinopse__txt: ""
    })

    const nome_filme = localStorage.getItem('filme');

    function dados_filme() {

        // Adicionar os dados na tela
        fetch(`http://localhost:3000/pegar_filmes_da_tabela?numeros=${nome_filme}`).then(infor => infor.json()).then(infor => {
            // colocando os dados

            setDados(copiar => ({
                ...copiar,
                poster: infor.capa,
                nome__filme: infor["nome"],
                sinopse__txt: infor["sinopse"]
            }))
            
            fetch(`http://localhost:3000/avaliacao_user?id_filme=${nome_filme}&email=${localStorage.getItem("email")}`).then(dados1 => dados1.json()).then(dados1 => {
                if (dados1 == true) {
                    setDados(copiar => ({
                        ...copiar,
                        star: estrela_full
                    }))
    
                } else {
                    setDados(copiar => ({
                        ...copiar,
                        star: estrela_zero
                    }))
                }
            })
        
            fetch(`http://localhost:3000/votos?id=${nome_filme}&token=${localStorage.getItem("token")}`).then(dados2 => dados2.json()).then(dados2 => {
                setDados(copiar => ({
                    ...copiar,
                    avalia: dados2
                }))
            })
        });
    }

    useEffect(() => dados_filme(), [])

    async function adicionar_remover_estrela()
    {
        await fetch(`http://localhost:3000/avaliacao_user?id_filme=${nome_filme}&email=${localStorage.getItem("email")}`).then(infor => infor.json()).then(infor => {
            if (infor == true) {
                fetch(`http://localhost:3000/votos?id=${nome_filme}`).then(dados2 => dados2.json()).then(async dados2 => {
                    // O dados2 - 1 vai tirar um voto do usúario já que ele já havia votado para esse filme
                    dados2 -= 1

                    setDados(copiar => ({
                        ...copiar,
                        avalia: dados2,
                        star: estrela_zero
                    }))

                    await fetch(`http://localhost:3000/ativa_desativa_estrela?condicao_estrela=off&email=${localStorage.getItem("email")}&id=${localStorage.getItem("filme")}`, {
                        method: "POST"
                    })
                })

            } else {
                fetch(`http://localhost:3000/votos?id=${nome_filme}`).then(dados2 => dados2.json()).then(async dados2 => {
                    dados2 += 1

                    setDados(copiar => ({
                        ...copiar,
                        avalia: dados2,
                        star: estrela_full
                    }))

                    fetch(`http://localhost:3000/ativa_desativa_estrela?condicao_estrela=on&email=${localStorage.getItem("email")}&id=${localStorage.getItem("filme")}`, {
                        method: "POST"
                    })
                })

            }
        })
    }

    return(
        <div className={style.corpo}>
            <div className={style.parte1}>
                <div className={style.infor__filme}>
                    <div className={style.foto}>
                        <img id="poster" className={style.poster} src={dados.poster} alt="Poster do filme"/>
                    </div>

                    <h2 id="nome__filme" className={style.nome__filme}>{dados.nome__filme}</h2>

                    <div className={style.avalicao}>
                        <img id="star" src={dados.star} onClick={() => adicionar_remover_estrela()} alt="estrela" className={style.estrela1}/>
                        <p id="avalia" className={style.avaliacao__filme}>{dados.avalia}</p>
                    </div>
                </div>

                <div className={style.sinopse}>
                    <h1 className={style.sinopse1}>Sinopse</h1>
                    <p id="sinopse__txt" className={style.sinopse__txt}>{dados.sinopse__txt}</p>
                </div>
            </div>

            <Nav_bar/>
        </div>
    )
}