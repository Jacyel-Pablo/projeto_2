import style from "../Estilos/menu.module.css"
import style2 from "../Estilos/nav_bar.module.css"
import estrela_ava from "../Resources/full.png"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

var flag = true

export default function Menu()
{

    const [dados, setDados] = useState({
        logo: "ShowTime",

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

    const [dados_campo, setDados_campo] = useState({
        campo: "",
        lista_filmes: []
    })

    function enviar(e)
    {
        if (e.key == "Enter") {
            flag = false

            fetch(`http://localhost:3000/busca_filmes?nome=${dados_campo.campo}`).then(filmes1 => filmes1.json()).then(filmes1 => {

                const lista_filmes_copy = []

                if (filmes1 != false) {
                    for (let i = 0; i < filmes1.length; i++) {

                        lista_filmes_copy.push(
                            <div key={i + 1} className={style.filmes}>
                                <Link id={"filme" + (i + 1)} onClick={() => salvar_filme(filmes1[i].id_filmes)} to="/dados__filme.html">
            
                                    <img src={filmes1[0].capa} alt="Um poster de filme" className={style.posters}/>
                                </Link>
            
                                <p id={"nome" + (i + 1)} className={`${style.nome__filme1} ${style.titulo1}`}>{filmes1[0].nome}</p>
            
                                <div className={style.estrelas}></div>
            
                                <img id={"star" + (i + 1)} src={estrela_ava} alt="estrela" className={style.estrela}/>
            
                                <p id={"ava" + (i + 1)} className={style.avaliacao}>{filmes1[0].votos}</p>
                            </div>
                        )
                    }

                    setDados_campo(copiar => ({
                        ...copiar,
                        lista_filmes: lista_filmes_copy
                    }))
                }
                
            })
        }
    }

    function default_filmes()
    {
        let lista_filmes_copy = []

        if (flag == true) {
            for (let i = 0; i < 4; i++) {
                lista_filmes_copy.push(
    
                    <div key={i + 1} className={style.filmes}>
                        <Link id={"filme" + (i + 1)} onClick={() => salvar_filme(dados["id" + (i + 1)])} to="/dados__filme.html">
    
                            <img id={`${"imagem" + (i + 1)} ${dados.id1}`} src={dados["imagem" + (i + 1)]} alt="Um poster de filme" className={style.posters}/>
                        </Link>
    
                        <p id={"nome" + (i + 1)} className={`${style.nome__filme1} ${style.titulo1}`}>{dados["nome" + (i + 1)]}</p>
    
                        <div className={style.estrelas}></div>
    
                        <img id={"star" + (i + 1)} src={estrela_ava} alt="estrela" className={style.estrela}/>
    
                        <p id={"ava" + (i + 1)} className={style.avaliacao}>{dados["ava" + (i + 1)]}</p>
                    </div>
                )
            } 

            setDados_campo(copiar => ({
                ...copiar,
                lista_filmes: lista_filmes_copy
            }))
        }
    }

    function lancamento() {
        useEffect(() => {
            if (window.screen.width <= 800) {
                setDados(copiar => ({
                    ...copiar,
                    logo: "ST"
                }))
            }

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

    useEffect(() => {
        default_filmes()
    }, [dados])

    // Salvar o filme no localstorage
    function salvar_filme(e)
    {
        localStorage.setItem('filme', e)
    }

    return(
        <div className={style.body_pag} onKeyDown={(e) => enviar(e)} onLoad={lancamento()}>
            <div className={style.corpo}>
                <div className={style.lancamento}>
                    
                </div>

                <div className={style.secoes}>
                    {dados_campo.lista_filmes}

                </div>
            </div>

            {/* Nav_bar */}
            <nav className={style2.menu}>
                <Link className={style2.menu_a} to="/menu.html">
                    <h1 className={style2.logo__cinetime}>{dados.logo}</h1>
        
                    <svg className={style2.pipoca} fill="none"><path d="M48 95.213c26.51 0 48-3.875 48-8.656 0-4.78-21.49-8.655-48-8.655S0 81.777 0 86.557c0 4.78 21.49 8.656 48 8.656Z" fill="url(#a)"></path><path d="M48 77.115c26.51 0 48-17.087 48-38.164C96 17.873 74.51.787 48 .787S0 17.874 0 38.95s21.49 38.164 48 38.164Z" fill="url(#b)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M75.376 75.624a2.36 2.36 0 1 0-2.817 1.408c-.062.157-.107.32-.134.486a3.15 3.15 0 0 0-1.161 4.298 3.146 3.146 0 0 0 4.297 1.161 3.148 3.148 0 0 0 4.927 2.228 2.36 2.36 0 1 0 3.662-2.809 3.148 3.148 0 0 0-4.448-4.447 2.355 2.355 0 0 0-2.67-.669 2.365 2.365 0 0 0-1.656-1.656Zm-50.983 1.49c0 .31-.044.619-.134.915a4.328 4.328 0 1 1-3.256 7.922 2.743 2.743 0 0 1-1.724.606c-.477.001-.946-.123-1.36-.358a1.966 1.966 0 0 1-3.74-.569 2.36 2.36 0 1 1-.013-4.445 3.148 3.148 0 0 1 4.07-3.145 3.148 3.148 0 1 1 6.157-.925Z" fill="url(#c)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M51.934 20.459c0 .388-.07.76-.198 1.102.234.114.452.256.65.422a3.146 3.146 0 0 1 3.102-1.498 3.147 3.147 0 0 1 5.888 1.646 3.154 3.154 0 0 1 1.953 1.498c.783.095 1.501.48 2.013 1.078a3.935 3.935 0 0 1 4.868 5.726c.559.375.983.918 1.212 1.552a3.148 3.148 0 0 1 5.26 3.445 3.147 3.147 0 1 1-3.08 4.701H24.392v-1.208a3.148 3.148 0 0 1-4.346-4.217 3.148 3.148 0 0 1 3.478-5.215 3.142 3.142 0 0 1 2.442-1.164 3.147 3.147 0 0 1 3.554-3.122 3.147 3.147 0 0 1 3.18-1.568 3.147 3.147 0 0 1 4.803-3.954 3.15 3.15 0 0 1 3.238 2.094c.41-.276.88-.45 1.371-.51a3.147 3.147 0 0 1 3.597-1.478 3.148 3.148 0 0 1 6.224.67Z" fill="url(#d)"></path><path opacity="0.6" d="M46.033 36.984a7.475 7.475 0 1 0 0-14.951 7.475 7.475 0 0 0 0 14.95Z" fill="url(#e)"></path><path opacity="0.6" d="M43.672 32.262a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z" fill="url(#f)"></path><path opacity="0.6" d="M42.098 36.197a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z" fill="url(#g)"></path><path opacity="0.6" d="M27.148 38.557a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z" fill="url(#h)"></path><path opacity="0.6" d="M30.295 36.197a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z" fill="url(#i)"></path><path opacity="0.6" d="M30.295 37.77a2.754 2.754 0 1 0 0-5.508 2.754 2.754 0 0 0 0 5.508Z" fill="url(#j)"></path><path opacity="0.2" d="M73.574 36.197a2.754 2.754 0 1 0 0-5.508 2.754 2.754 0 0 0 0 5.508Z" fill="url(#k)"></path><path opacity="0.2" d="M76.721 39.344a1.967 1.967 0 1 0 0-3.934 1.967 1.967 0 0 0 0 3.934Z" fill="url(#l)"></path><path opacity="0.3" d="M72.787 40.131a3.541 3.541 0 1 0 0-7.082 3.541 3.541 0 0 0 0 7.082Z" fill="url(#m)"></path><path opacity="0.2" d="M58.623 24.393a2.754 2.754 0 1 0 0-5.508 2.754 2.754 0 0 0 0 5.508Z" fill="url(#n)"></path><path opacity="0.2" d="M48.393 21.246a1.967 1.967 0 1 0 0-3.935 1.967 1.967 0 0 0 0 3.935Z" fill="url(#o)"></path><path opacity="0.2" d="M35.016 23.607a1.967 1.967 0 1 0 0-3.935 1.967 1.967 0 0 0 0 3.935Z" fill="url(#p)"></path><path opacity="0.2" d="M61.77 33.05a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z" fill="url(#q)"></path><path opacity="0.6" d="M57.05 31.475a5.115 5.115 0 1 0 0-10.229 5.115 5.115 0 0 0 0 10.23Z" fill="url(#r)"></path><path opacity="0.2" d="M59.41 33.836a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z" fill="url(#s)"></path><path d="M18.885 36.984h44.853l-3.935 51.934h-37.77l-3.148-51.934Z" fill="url(#t)"></path><path d="m71.607 85.77-11.804 3.148 3.935-51.934 14.95 3.934-7.081 44.852Z" fill="url(#u)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="m46.33 47.333.254-10.35h-9.388l.104 9.84a16.418 16.418 0 0 0-4.664 1.825l-.327-11.664h-9.407l2.927 51.934h7.943l-.317-11.22a16.431 16.431 0 0 0 4.187 1.453l.105 9.767h7.558l.25-10.101a16.449 16.449 0 0 0 3.675-1.58l-.37 11.681h8.321l2.741-51.934h-9.417l-.388 12.237a16.47 16.47 0 0 0-3.788-1.888Zm16.078 40.89 2.95-.786 5.845-48.488-4.501-1.186-4.294 50.46Zm4.63-1.234 2.317-.618 7.838-45.846-4.375-1.152-5.78 47.616ZM53.507 62.95c0 6.953-5.636 12.59-12.59 12.59s-12.59-5.636-12.59-12.59 5.636-12.59 12.59-12.59 12.59 5.636 12.59 12.59Zm-7.172 6.795L44.64 64.26l4.108-3.047a.39.39 0 0 0-.2-.702 93.591 93.591 0 0 0-5.184-.274l-2.076-5.712a.394.394 0 0 0-.74 0l-2.076 5.712c-1.76.044-3.49.137-5.185.274a.39.39 0 0 0-.198.702l4.107 3.046-1.696 5.485a.394.394 0 0 0 .598.442l4.82-3.281 4.82 3.281a.394.394 0 0 0 .599-.441h-.001Z" fill="url(#v)"></path><path opacity="0.4" d="M16.918 82.623a1.967 1.967 0 1 0 0-3.934 1.967 1.967 0 0 0 0 3.934Z" fill="url(#w)"></path><path opacity="0.4" d="M13.77 84.984a1.967 1.967 0 1 0 0-3.935 1.967 1.967 0 0 0 0 3.935Z" fill="url(#x)"></path><path opacity="0.4" d="M16.131 84.984a1.967 1.967 0 1 0 0-3.935 1.967 1.967 0 0 0 0 3.935Z" fill="url(#y)"></path><path opacity="0.4" d="M19.279 86.557a1.967 1.967 0 1 0 0-3.934 1.967 1.967 0 0 0 0 3.934Z" fill="url(#z)"></path><path opacity="0.4" d="M82.23 85.77a1.967 1.967 0 1 0 0-3.934 1.967 1.967 0 0 0 0 3.934Z" fill="url(#A)"></path><path opacity="0.4" d="M81.836 82.623a2.36 2.36 0 1 0 0-4.721 2.36 2.36 0 0 0 0 4.721Z" fill="url(#B)"></path><path opacity="0.4" d="M77.902 82.623a2.36 2.36 0 1 0 0-4.721 2.36 2.36 0 0 0 0 4.721Z" fill="url(#C)"></path><path opacity="0.4" d="M75.147 81.836a2.754 2.754 0 1 0 0-5.508 2.754 2.754 0 0 0 0 5.508Z" fill="url(#D)"></path><path opacity="0.4" d="M18.492 84.984a2.754 2.754 0 1 0 0-5.509 2.754 2.754 0 0 0 0 5.509Z" fill="url(#E)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M73.967 79.475a2.361 2.361 0 0 1 2.36 2.361 3.148 3.148 0 1 1-.88 6.17 2.36 2.36 0 0 1-4.613-.92 2.755 2.755 0 0 1 .773-5.222v-.028a2.36 2.36 0 0 1 2.36-2.36Z" fill="url(#F)"></path><defs><radialGradient id="a" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 -8.70201 48.2567 0 48 86.604)"><stop offset="0.286" stop-color="#7D2889"></stop><stop offset="0.724" stop-color="#FF66D9" stop-opacity="0.41"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></radialGradient><radialGradient id="b" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 -38.3681 48.2567 0 48 39.155)"><stop stop-color="#FFCA45"></stop><stop offset="0.453" stop-color="#FF66D9" stop-opacity="0.36"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></radialGradient><radialGradient id="c" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(180 23.41 39.738) scale(37.7705)"><stop offset="0.432" stop-color="#FF8B54"></stop><stop offset="0.76" stop-color="#FFBB8D"></stop><stop offset="1" stop-color="#F9DDD1"></stop></radialGradient><radialGradient id="d" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 -10.623 28.257 0 47.607 27.934)"><stop offset="0.302" stop-color="#F9DDD1"></stop><stop offset="0.674" stop-color="#FFBB8D"></stop><stop offset="1" stop-color="#FF8B54"></stop></radialGradient><radialGradient id="e" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 8.042 37.99) scale(7.03568)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="f" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 8.112 35.56) scale(4.81389)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="g" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 5.358 36.74) scale(4.81389)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="h" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -3.298 30.445) scale(4.81389)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="i" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -.544 30.839) scale(4.81389)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="j" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -2.442 32.737) scale(2.59209)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="k" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 19.985 53.59) scale(2.59209)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="l" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 19.614 57.107) scale(1.85149)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="m" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 17.994 54.792) scale(3.33269)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="n" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 18.41 40.212) scale(2.59209)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="o" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 14.5 33.894) scale(1.8515)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="p" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 6.63 28.386) scale(1.85149)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="q" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 16.768 45.003) scale(4.81389)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="r" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 15.194 41.855) scale(4.81389)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="s" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 15.194 44.216) scale(4.81389)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="w" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -31.927 48.845) scale(1.8515)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="x" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -34.681 48.452) scale(1.8515)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="y" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -33.5 49.632) scale(1.8515)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="z" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -32.714 51.993) scale(1.85149)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="A" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -.845 83.075) scale(1.85149)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="B" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 .718 81.118) scale(2.2218)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="C" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -1.25 79.151) scale(2.2218)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="D" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -2.048 77.196) scale(2.5921)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="E" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -31.95 50.442) scale(2.5921)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="F" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(111.038 9.116 68.506) scale(5.48002)"><stop stop-color="#FDF7F2"></stop><stop offset="1" stop-color="#FFD8BD"></stop></radialGradient><linearGradient id="t" x1="59.803" y1="88.918" x2="33.764" y2="21.046" gradientUnits="userSpaceOnUse"><stop stop-color="#E0B1CC"></stop><stop offset="0.431" stop-color="#FFF1F1"></stop><stop offset="1" stop-color="#FFC9A5"></stop></linearGradient><linearGradient id="u" x1="59.803" y1="53.115" x2="83.41" y2="53.115" gradientUnits="userSpaceOnUse"><stop stop-color="#D16AE9"></stop><stop offset="1" stop-color="#FF661D"></stop></linearGradient><linearGradient id="v" x1="18.111" y1="36.984" x2="75.136" y2="85.621" gradientUnits="userSpaceOnUse"><stop stop-color="#FF661D"></stop><stop offset="0.5" stop-color="#CE3A00"></stop><stop offset="1" stop-color="#A60A5E"></stop></linearGradient></defs></svg>
                </Link>

                <input className={style2.campo__busca}placeholder="Pesquisa" onChange={(e) => setDados_campo(copiar => ({
                    ...copiar,
                    campo: e.target.value

                }))} value={dados_campo.campo}/>
        
                <Link className={style2.perfil_link} to="/user__config.html">
                    <img className={style2.perfil} src="https://media.tenor.com/Lk6mMX3yHqUAAAAd/little-witch-academia-atsuko-kagari.gif" alt="Perfil"/>
                </Link>
            </nav>
        </div>
    )
}