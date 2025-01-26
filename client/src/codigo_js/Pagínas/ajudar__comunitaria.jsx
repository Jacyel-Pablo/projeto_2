import style from "../Estilos/ajudar__comunitaria.module.css"
import style2 from "../Estilos/menu.module.css"
import { useState } from "react"

export default function Ajudar()
{
    const [ dados, setDados ] = useState({
        foto: "",
        texto: "ㅤ"
    })

    function pre_visualizacao_foto(e)
    {
        const file = URL.createObjectURL(e.target.files[0])

        setDados(() => ({
            texto: "Pré-visualização",
            foto: file
            
        }))
    }

    return(
        <div className={style.corpo}>
            <form className={style.formulario} action="http://localhost:3000/enviar__filme" method="POST" enctype="multipart/form-data">

                <p className={style.textos}>Coloque o diretorioda da capa:</p>
                
                <input className={style.capa} onChange={(e) => pre_visualizacao_foto(e)} type="file" name="capa" id="capa" />

                <div className={style.box__pre__visualizar}>
                    <p>{dados.texto}</p>
                    
                    <img className={`${style.pre__visualizar}`} src={dados.foto} />
                
                </div>

                <p className={style.textos}>Coloque o nome do filme:</p>
                
                <input id="nome" name="nome" type="text" className={style.input_form} placeholder="Insira o nome do filme"/>
                
                <p className={style.textos}>Coloque a sinopse do filme:</p>
                
                <textarea id="sinopse" name="sinopse" className={style.input_form} placeholder="Insira a sinopse do filme"></textarea>
                
                <input id="enviar" className={style.enviar} type="submit" value="Enviar"/>
            
            </form>
        </div>
    )
}