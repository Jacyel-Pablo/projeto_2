import style from "../Estilos/index.module.css"
import { useState } from "react"

export default function Criar_conta()
{
    const [dados, setDados] = useState({
        apelido: "",
        email: "",
        senha: ""
    })

    function seta_valores(e)
    {
        setDados(copiar => ({
            ...copiar,
            [e.target.id]: e.target.value
        }))
    }

    async function enviar (e)
    {
        e.preventDefault()
        window.location.href = "/"
        await fetch(`http://localhost:3000/submit?tabela=usuario&email=${dados.email}&apelido=${dados.apelido}&senha=${dados.senha}`, {
            method: "POST"
        })
    }

    return(
        <div className={`${style.corpo} bg-black text-white d-flex justify-content-center`}>
            <div className={`${style.container_formulario} d-flex justify-content-center align-items-center`}>
                <div className={`${style.container_formulario1} border d-flex justify-content-center align-items-center`}>
                    <form className="row w-75" onSubmit={enviar}>
                        <h1 className="text-center">Criar conta</h1>
                        <div>
                            <label for="inputEmail4" className="form-label">Apelido:</label>
                            <input required onChange={(e) => {seta_valores(e)}} id="apelido" type="text" className="form-control bg-dark text-white mb-3"/>
                        </div>
                        <div>
                            <label for="inputEmail4" className="form-label">Email:</label>
                            <input required onChange={(e) => {seta_valores(e)}} id="email" type="email" className="form-control bg-dark text-white mb-3"/>
                            </div>
                        <div>
                            <label for="inputPassword4" className="form-label">Password:</label>
                            <input required onChange={(e) => {seta_valores(e)}} id="senha" type="password" className="form-control bg-dark text-white mb-3"/>
                        </div>
                        <div class="ms-0">
                            <input id="enviar" type="submit" value="Criar" className="btn text-white bg-danger"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}