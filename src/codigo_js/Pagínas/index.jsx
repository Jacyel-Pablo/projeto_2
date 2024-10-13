import style from "../Estilos/index.module.css"
import { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function Index()
{
    const [dados, setDados] = useState({
        email: "",
        senha: ""
    })

    function place_dados(e)
    {
        setDados(copiar => ({
            ...copiar,
            [e.target.id]: e.target.value
        }))
    }

    async function validar() {
        await fetch(`http://localhost:3000/valida?email=${dados.email}&senha=${dados.senha}`).then(dados1 => dados1.json()).then(dados1 => {
            if (dados1 == false) {
                setDados({
                    email: "",
                    senha: ""
                })
                alert("Email ou senha incorretos")
    
            } else {
                localStorage.setItem("email", dados.email)
                localStorage.setItem("apelido", dados1.apelido)
                window.location.href = "/menu.html"
            }
        })
    }

    return (
        <div className={style.corpo}>
            <div className={`${style.container_formulario} d-flex justify-content-center align-items-center`}>
                <div className={`${style.container_formulario1} border d-flex justify-content-center align-items-center`}>
                    <form className={`row ${style.formulario}`}>
                        <h1 className={`text-center ${style.cor_texto}`}>Login</h1>
                        <div>
                            <label for="inputEmail4" className={`form-label ${style.cor_texto}`}>Email</label>
                            <input id="email" onChange={(e) => place_dados(e)} value={dados.email} type="email" className="form-control bg-dark text-white mb-3"/>
                        </div>
                        <div>
                            <label for="inputPassword4" className={`form-label ${style.cor_texto}`}>Password</label>
                            <input id="senha" onChange={(e) => place_dados(e)} value={dados.senha} type="password" className="form-control bg-dark text-white mb-3"/>
                        </div>
                        <p className={style.cor_texto}>Não possui uma conta <a href="/criar_conta.html">crie uma</a></p>
                        <div className="ms-0">
                            <input id="enviar" onClick={() => validar()} type="button" className="btn text-white bg-danger" value="Login"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}