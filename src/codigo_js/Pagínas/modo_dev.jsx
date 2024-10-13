import style from "../Estilos/modo_dev.module.css"
import { useState } from "react"

export default function Modo_dev()
{
    const [dados, setDados] = useState({
        capa: "",
        nome: "",
        sinopse: ""
    })

    function getDados(e)
    {
        setDados(copiar => ({
            ...copiar,
            [e.target.id]: e.target.value
        }))
    }

    function enviar()
    {
        fetch(`http://localhost:3000/enviar_filmes?capa=${dados.capa}&nome=${dados.nome}&sinopse=${dados.sinopse}`, {
            method: "POST"
        })

        window.location.href = "/"
    }

    return(
        <div className={style.corpo}>
            <form className={style.formulario}>
                <p className={style.textos}>Coloque o diretorioda da capa:</p>
                <input id="capa" onChange={(e) => getDados(e)} type="text" className={style.input_form} placeholder="Insira o caminho relativo da capa do filme"/>

                <p className={style.textos}>Coloque o nome do filme:</p>
                <input id="nome" onChange={(e) => getDados(e)} type="text" className={style.input_form} placeholder="Insira o nome do filme"/>

                <p className={style.textos}>Coloque a sinopse do filme:</p>
                <textarea id="sinopse" onChange={(e) => getDados(e)} className={style.input_form} placeholder="Insira a sinopse do filme"></textarea>

                <input id="enviar" onClick={() => enviar()} className={style.enviar} type="button" value="Enviar"/>
            </form>
        </div>
    )
}