import style from "../Estilos/dados__filme.module.css"
import Nav_bar from "./nav_bar"
import estrela_full from "../Resources/full.png"
import estrela_zero from "../Resources/zero.png"
import { useState, useEffect } from "react";

export default function Dados__filme()
{
    var id_comentarios = 0

    const [dados, setDados] = useState({
        poster: "https://th.bing.com/th/id/OIP.qlFuyLoeOSg012B3TDCogAAAAA?rs=1&pid=ImgDetMain",
        nome__filme: "",
        star: "",
        avalia: "0",
        sinopse__txt: "",
        lista_comentarios: [],

        comentario_user: ""
    })

    const nome_filme = localStorage.getItem('filme');

    function dados_filme() {

        // Adicionar os dados na tela
        fetch(`http://localhost:3000/pegar_filmes_da_tabela?numeros=${nome_filme}&token=${localStorage.getItem("token")}`).then(infor => infor.json()).then(infor => {
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

    function adicionar_comentario(elemento)
    {
        setDados(copiar => ({
            ...copiar,
            comentario_user: elemento.target.value
        }))
    }

    var contado_index = 0

    useEffect(() => {
        dados_filme()

        fetch(`http://localhost:3000/lista_comentarios?filme=${localStorage.getItem("filme")}`).then(dados1 => dados1.json()).then(async dados1 => {
            const comentarios_user_p = []

            for (let i = 0; i < dados1.length; i++) {
                contado_index = i
                comentarios_user_p.push(
                    <div key={i} className={style.container_comentarios}>
                        <div className={style.container_comentarios_infor_user}>
                            <img className={style.container_comentarios_infor_user_foto} src="https://media.tenor.com/Lk6mMX3yHqUAAAAd/little-witch-academia-atsuko-kagari.gif" alt="Foto do usúario" />
                            <p className={style.container_comentarios_infor_user_nome}>{dados1[i].apelido}</p>
                        </div>

                        <div className={style.container_comentarios_div}>
                            <p>{dados1[i].comentario}</p>
                        </div>
                        <p className={style.container_comentarios_data}>{dados1[i].data.split("T")[0].split("-")[2] + "/" + dados1[i].data.split("T")[0].split("-")[1] + "/" + dados1[i].data.split("T")[0].split("-")[0]}</p>
                    </div>
                )
            }
            
            setDados((copiar) => ({
                ...copiar,
                lista_comentarios: comentarios_user_p
            }))
        })

    }, [])

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

    async function botao_enviar()
    {

        contado_index += 1

        const add_comentario = []
        add_comentario.push(dados.lista_comentarios)
        add_comentario.push(
            <div key={contado_index} className={style.container_comentarios}>
                <div className={style.container_comentarios_infor_user}>
                    <img className={style.container_comentarios_infor_user_foto} src="https://media.tenor.com/Lk6mMX3yHqUAAAAd/little-witch-academia-atsuko-kagari.gif" alt="Foto do usúario" />
                    <p className={style.container_comentarios_infor_user_nome}>{localStorage.getItem("apelido")}</p>
                </div>

                <div className={style.container_comentarios_div}>
                    <p>{dados.comentario_user}</p>
                </div>
                <p className={style.container_comentarios_data}>{new Date().toISOString().split("T")[0].split("-")[2] + "/" + new Date().toISOString().split("T")[0].split("-")[1] + "/" + new Date().toISOString().split("T")[0].split("-")[0]}</p>
            </div>
        )

        console.log(add_comentario)

        setDados((copiar) => ({
            ...copiar,
            lista_comentarios: add_comentario
        }))

        await fetch(`http://localhost:3000/enviar_comentarios?email=${localStorage.getItem("email")}&id_filmes=${localStorage.getItem("filme")}&apelido=${localStorage.getItem("apelido")}&comentario=${dados.comentario_user}`, {
            method: "POST"
        })

        // console.log(dados.lista_comentarios)
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

                <div className={style.comentario_box}>
                    <div className={style.comentarios_usuarios}>{dados.lista_comentarios}</div>

                    <div className={style.comentario_box1}>

                        <input className={style.comentario_campo} type="text" placeholder="Faça um comentario" onChange={(elemento) => adicionar_comentario(elemento)} value={dados.comentario_user}/>
                        <input className={style.comentario_botao_enviar} onClick={() => botao_enviar()} type="button" value="Enviar" />
                    
                    </div>
                </div>
            </div>

            <Nav_bar/>
        </div>
    )
}