import style from "../Estilos/menu.module.css"
import Nav_bar from "./nav_bar"
import estrela_ava from "../Resources/full.png"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Menu()
{

    const [dados, setDados] = useState({
        imagem1: "https://th.bing.com/th/id/OIP.t00ptKD6SzQXCqjZ4rYypwHaHa?rs=1&pid=ImgDetMain",
        imagem2: "https://th.bing.com/th/id/OIP.t00ptKD6SzQXCqjZ4rYypwHaHa?rs=1&pid=ImgDetMain",
        imagem3: "https://th.bing.com/th/id/OIP.t00ptKD6SzQXCqjZ4rYypwHaHa?rs=1&pid=ImgDetMain",
        imagem4: "https://th.bing.com/th/id/OIP.t00ptKD6SzQXCqjZ4rYypwHaHa?rs=1&pid=ImgDetMain",

        id1: "",
        id2: "",
        id3: "",
        id4: "",

        nome1: "Nome do filme",
        nome2: "Nome do filme",
        nome3: "Nome do filme",
        nome4: "Nome do filme",

        ava1: "0",
        ava2: "0",
        ava3: "0",
        ava4: "0"
    })

    function lancamento() {
        useEffect(() => {
            // Acessando ultimo valor da tabela
            fetch("http://localhost:3000/pegar_index_ultimo_filme").then(dados1 => dados1.json()).then(dados1 => {
                for (let i = 0; i < 4; i++) {
                    fetch(`http://localhost:3000/pegar_filmes_da_tabela?numeros=${dados1[i]}&token=${localStorage.getItem("token")}`).then(tabela => tabela.json()).then(tabela => {
            
                        // Vamos verificar se a algum filme na tabela antés de pegar os dados
                        if (tabela != false) {
                            fetch(`http://localhost:3000/votos?id=${dados1[i]}&token=${localStorage.getItem("token")}`).then(dados2 => dados2.json()).then(dados2 => {
                                setDados(copiar => ({
                                    ...copiar,
                                    ['imagem' + (4 - i).toString()]: tabela.capa,
                                    ['id' + (4 - i).toString()]: dados1[i],
                                    ['nome' + (4 - i).toString()]: tabela.nome,
                                    ['ava' + (4 - i).toString()]: dados2
                                }))
                            })
                        }
                    })

                }
            })
        }, [])
    }

    // Salvar o filme no localstorage
    function salvar_filme(e)
    {
        localStorage.setItem('filme', e.target.id.split(" ")[1])
    }

    return(
        <div className={style.body_pag} onLoad={lancamento()}>
            <div className={style.corpo}>
                <div className={style.lancamento}>
                    
                </div>

                <div className={style.secoes}>

                    <div className={style.filmes}>
                        <Link id="filme1" onClick={(e) => salvar_filme(e)} to="/dados__filme.html">
                            <img id={`imagem1 ${dados.id1}`} src={dados.imagem1} alt="Um poster de filme" className={style.posters}/>
                        </Link>

                        <p id="nome1" className={`${style.nome__filme1} ${style.titulo1}`}>{dados.nome1}</p>

                        <div className={style.estrelas}></div>

                        <img id="star1" src={estrela_ava} alt="estrela" className={style.estrela}/>

                        <p id="ava1" className={style.avaliacao}>{dados.ava1}</p>
                    </div>

                    <div className={style.filmes}>
                        <Link id="filme2" onClick={(e) => salvar_filme(e)} to="/dados__filme.html">
                            <img id={`imagem2 ${dados.id2}`} src={dados.imagem2} alt="Um poster de filme" className={style.posters}/>
                        </Link>

                        <p id="nome2" className={`${style.nome__filme1} ${style.titulo2}`}>{dados.nome2}</p>

                        <div className={style.estrelas}></div>

                        <img id="star2" src={estrela_ava} alt="estrela" className={style.estrela}/>

                        <p id="ava2" className={style.avaliacao}>{dados.ava2}</p>
                    </div>
                    
                    <div className={style.filmes}>
                        <Link id="filme3" onClick={(e) => salvar_filme(e)} to="/dados__filme.html">
                            <img id={`imagem3 ${dados.id3}`} src={dados.imagem3} alt="Um poster de filme" className={style.posters}/>
                        </Link>

                        <p id="nome3" className={`${style.nome__filme1} ${style.titulo3}`}>{dados.nome3}</p>

                        <div className={style.estrelas}></div>

                        <img id="star3" src={estrela_ava} alt="estrela" className={style.estrela}/>

                        <p id="ava3" className={style.avaliacao}>{dados.ava3}</p>
                    </div>

                    <div className="filmes">
                        <Link id="filme4" onClick={(e) => salvar_filme(e)} to="/dados__filme.html">
                            <img id={`imagem4 ${dados.id4}`} src={dados.imagem4} alt="Um poster de filme" className={style.posters}/>
                        </Link>

                        <p id="nome4" className={`${style.nome__filme1} ${style.titulo4}`}>{dados.nome4}</p>

                        <div className={style.estrelas}></div>

                        <img id="star4" src={estrela_ava} alt="estrela" className={style.estrela}/>

                        <p id="ava4" className={style.avaliacao}>{dados.ava4}</p>
                    </div>
                </div>
            </div>

            <Nav_bar/>
        </div>
    )
}