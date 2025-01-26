import style from "../Estilos/dados__filme.module.css"
import style2 from "../Estilos/nav_bar.module.css"
import { Link } from "react-router-dom"
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

        comentario_user: "",

        logo: "ShowTime",

        foto_perfil: "https://media.tenor.com/Lk6mMX3yHqUAAAAd/little-witch-academia-atsuko-kagari.gif"
    })

    const nome_filme = localStorage.getItem('filme');

    function dados_filme() {

        // Adicionar os dados na tela
        fetch(`http://localhost:3000/pegar_filmes_da_tabela?numeros=${nome_filme}&token=${localStorage.getItem("token")}`).then(infor => infor.json()).then(infor => {
            // colocando os dados

            setDados(copiar => ({
                ...copiar,
                poster: `http://localhost:3000/pegar_capa_do_filme?numeros=${localStorage.getItem("filme")}&token=${localStorage.getItem("token")}`,
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
        if (window.screen.width <= 800) {
            setDados(copiar => ({
                ...copiar,
                logo: "ST"
            }))
        }
        
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
        
        // Vereficar se o usuário possui alguma foto
        fetch(`http://localhost:3000/validar__foto?email=${localStorage.getItem("email")}`).then(valida_foto => valida_foto.json()).then(valida_foto => {
            
            if (valida_foto === true) {
                setDados(copiar => ({
                    ...copiar,
                    foto_perfil: `http://localhost:3000/pegar__foto?email=${localStorage.getItem("email")}`
                }))
            }

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

            {/* Nav_bar */}
            <nav className={style2.menu}>
                <Link className={style2.menu_a} to="/menu.html">
                    <h1 className={style2.logo__cinetime}>{dados.logo}</h1>
        
                    <svg className={style2.pipoca} fill="none"><path d="M48 95.213c26.51 0 48-3.875 48-8.656 0-4.78-21.49-8.655-48-8.655S0 81.777 0 86.557c0 4.78 21.49 8.656 48 8.656Z" fill="url(#a)"></path><path d="M48 77.115c26.51 0 48-17.087 48-38.164C96 17.873 74.51.787 48 .787S0 17.874 0 38.95s21.49 38.164 48 38.164Z" fill="url(#b)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M75.376 75.624a2.36 2.36 0 1 0-2.817 1.408c-.062.157-.107.32-.134.486a3.15 3.15 0 0 0-1.161 4.298 3.146 3.146 0 0 0 4.297 1.161 3.148 3.148 0 0 0 4.927 2.228 2.36 2.36 0 1 0 3.662-2.809 3.148 3.148 0 0 0-4.448-4.447 2.355 2.355 0 0 0-2.67-.669 2.365 2.365 0 0 0-1.656-1.656Zm-50.983 1.49c0 .31-.044.619-.134.915a4.328 4.328 0 1 1-3.256 7.922 2.743 2.743 0 0 1-1.724.606c-.477.001-.946-.123-1.36-.358a1.966 1.966 0 0 1-3.74-.569 2.36 2.36 0 1 1-.013-4.445 3.148 3.148 0 0 1 4.07-3.145 3.148 3.148 0 1 1 6.157-.925Z" fill="url(#c)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M51.934 20.459c0 .388-.07.76-.198 1.102.234.114.452.256.65.422a3.146 3.146 0 0 1 3.102-1.498 3.147 3.147 0 0 1 5.888 1.646 3.154 3.154 0 0 1 1.953 1.498c.783.095 1.501.48 2.013 1.078a3.935 3.935 0 0 1 4.868 5.726c.559.375.983.918 1.212 1.552a3.148 3.148 0 0 1 5.26 3.445 3.147 3.147 0 1 1-3.08 4.701H24.392v-1.208a3.148 3.148 0 0 1-4.346-4.217 3.148 3.148 0 0 1 3.478-5.215 3.142 3.142 0 0 1 2.442-1.164 3.147 3.147 0 0 1 3.554-3.122 3.147 3.147 0 0 1 3.18-1.568 3.147 3.147 0 0 1 4.803-3.954 3.15 3.15 0 0 1 3.238 2.094c.41-.276.88-.45 1.371-.51a3.147 3.147 0 0 1 3.597-1.478 3.148 3.148 0 0 1 6.224.67Z" fill="url(#d)"></path><path opacity="0.6" d="M46.033 36.984a7.475 7.475 0 1 0 0-14.951 7.475 7.475 0 0 0 0 14.95Z" fill="url(#e)"></path><path opacity="0.6" d="M43.672 32.262a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z" fill="url(#f)"></path><path opacity="0.6" d="M42.098 36.197a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z" fill="url(#g)"></path><path opacity="0.6" d="M27.148 38.557a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z" fill="url(#h)"></path><path opacity="0.6" d="M30.295 36.197a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z" fill="url(#i)"></path><path opacity="0.6" d="M30.295 37.77a2.754 2.754 0 1 0 0-5.508 2.754 2.754 0 0 0 0 5.508Z" fill="url(#j)"></path><path opacity="0.2" d="M73.574 36.197a2.754 2.754 0 1 0 0-5.508 2.754 2.754 0 0 0 0 5.508Z" fill="url(#k)"></path><path opacity="0.2" d="M76.721 39.344a1.967 1.967 0 1 0 0-3.934 1.967 1.967 0 0 0 0 3.934Z" fill="url(#l)"></path><path opacity="0.3" d="M72.787 40.131a3.541 3.541 0 1 0 0-7.082 3.541 3.541 0 0 0 0 7.082Z" fill="url(#m)"></path><path opacity="0.2" d="M58.623 24.393a2.754 2.754 0 1 0 0-5.508 2.754 2.754 0 0 0 0 5.508Z" fill="url(#n)"></path><path opacity="0.2" d="M48.393 21.246a1.967 1.967 0 1 0 0-3.935 1.967 1.967 0 0 0 0 3.935Z" fill="url(#o)"></path><path opacity="0.2" d="M35.016 23.607a1.967 1.967 0 1 0 0-3.935 1.967 1.967 0 0 0 0 3.935Z" fill="url(#p)"></path><path opacity="0.2" d="M61.77 33.05a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z" fill="url(#q)"></path><path opacity="0.6" d="M57.05 31.475a5.115 5.115 0 1 0 0-10.229 5.115 5.115 0 0 0 0 10.23Z" fill="url(#r)"></path><path opacity="0.2" d="M59.41 33.836a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z" fill="url(#s)"></path><path d="M18.885 36.984h44.853l-3.935 51.934h-37.77l-3.148-51.934Z" fill="url(#t)"></path><path d="m71.607 85.77-11.804 3.148 3.935-51.934 14.95 3.934-7.081 44.852Z" fill="url(#u)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="m46.33 47.333.254-10.35h-9.388l.104 9.84a16.418 16.418 0 0 0-4.664 1.825l-.327-11.664h-9.407l2.927 51.934h7.943l-.317-11.22a16.431 16.431 0 0 0 4.187 1.453l.105 9.767h7.558l.25-10.101a16.449 16.449 0 0 0 3.675-1.58l-.37 11.681h8.321l2.741-51.934h-9.417l-.388 12.237a16.47 16.47 0 0 0-3.788-1.888Zm16.078 40.89 2.95-.786 5.845-48.488-4.501-1.186-4.294 50.46Zm4.63-1.234 2.317-.618 7.838-45.846-4.375-1.152-5.78 47.616ZM53.507 62.95c0 6.953-5.636 12.59-12.59 12.59s-12.59-5.636-12.59-12.59 5.636-12.59 12.59-12.59 12.59 5.636 12.59 12.59Zm-7.172 6.795L44.64 64.26l4.108-3.047a.39.39 0 0 0-.2-.702 93.591 93.591 0 0 0-5.184-.274l-2.076-5.712a.394.394 0 0 0-.74 0l-2.076 5.712c-1.76.044-3.49.137-5.185.274a.39.39 0 0 0-.198.702l4.107 3.046-1.696 5.485a.394.394 0 0 0 .598.442l4.82-3.281 4.82 3.281a.394.394 0 0 0 .599-.441h-.001Z" fill="url(#v)"></path><path opacity="0.4" d="M16.918 82.623a1.967 1.967 0 1 0 0-3.934 1.967 1.967 0 0 0 0 3.934Z" fill="url(#w)"></path><path opacity="0.4" d="M13.77 84.984a1.967 1.967 0 1 0 0-3.935 1.967 1.967 0 0 0 0 3.935Z" fill="url(#x)"></path><path opacity="0.4" d="M16.131 84.984a1.967 1.967 0 1 0 0-3.935 1.967 1.967 0 0 0 0 3.935Z" fill="url(#y)"></path><path opacity="0.4" d="M19.279 86.557a1.967 1.967 0 1 0 0-3.934 1.967 1.967 0 0 0 0 3.934Z" fill="url(#z)"></path><path opacity="0.4" d="M82.23 85.77a1.967 1.967 0 1 0 0-3.934 1.967 1.967 0 0 0 0 3.934Z" fill="url(#A)"></path><path opacity="0.4" d="M81.836 82.623a2.36 2.36 0 1 0 0-4.721 2.36 2.36 0 0 0 0 4.721Z" fill="url(#B)"></path><path opacity="0.4" d="M77.902 82.623a2.36 2.36 0 1 0 0-4.721 2.36 2.36 0 0 0 0 4.721Z" fill="url(#C)"></path><path opacity="0.4" d="M75.147 81.836a2.754 2.754 0 1 0 0-5.508 2.754 2.754 0 0 0 0 5.508Z" fill="url(#D)"></path><path opacity="0.4" d="M18.492 84.984a2.754 2.754 0 1 0 0-5.509 2.754 2.754 0 0 0 0 5.509Z" fill="url(#E)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M73.967 79.475a2.361 2.361 0 0 1 2.36 2.361 3.148 3.148 0 1 1-.88 6.17 2.36 2.36 0 0 1-4.613-.92 2.755 2.755 0 0 1 .773-5.222v-.028a2.36 2.36 0 0 1 2.36-2.36Z" fill="url(#F)"></path><defs><radialGradient id="a" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 -8.70201 48.2567 0 48 86.604)"><stop offset="0.286" stop-color="#7D2889"></stop><stop offset="0.724" stop-color="#FF66D9" stop-opacity="0.41"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></radialGradient><radialGradient id="b" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 -38.3681 48.2567 0 48 39.155)"><stop stop-color="#FFCA45"></stop><stop offset="0.453" stop-color="#FF66D9" stop-opacity="0.36"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></radialGradient><radialGradient id="c" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(180 23.41 39.738) scale(37.7705)"><stop offset="0.432" stop-color="#FF8B54"></stop><stop offset="0.76" stop-color="#FFBB8D"></stop><stop offset="1" stop-color="#F9DDD1"></stop></radialGradient><radialGradient id="d" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 -10.623 28.257 0 47.607 27.934)"><stop offset="0.302" stop-color="#F9DDD1"></stop><stop offset="0.674" stop-color="#FFBB8D"></stop><stop offset="1" stop-color="#FF8B54"></stop></radialGradient><radialGradient id="e" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 8.042 37.99) scale(7.03568)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="f" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 8.112 35.56) scale(4.81389)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="g" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 5.358 36.74) scale(4.81389)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="h" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -3.298 30.445) scale(4.81389)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="i" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -.544 30.839) scale(4.81389)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="j" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -2.442 32.737) scale(2.59209)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="k" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 19.985 53.59) scale(2.59209)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="l" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 19.614 57.107) scale(1.85149)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="m" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 17.994 54.792) scale(3.33269)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="n" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 18.41 40.212) scale(2.59209)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="o" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 14.5 33.894) scale(1.8515)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="p" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 6.63 28.386) scale(1.85149)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="q" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 16.768 45.003) scale(4.81389)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="r" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 15.194 41.855) scale(4.81389)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="s" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 15.194 44.216) scale(4.81389)"><stop offset="0.375" stop-color="#FFF4EB"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="w" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -31.927 48.845) scale(1.8515)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="x" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -34.681 48.452) scale(1.8515)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="y" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -33.5 49.632) scale(1.8515)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="z" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -32.714 51.993) scale(1.85149)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="A" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -.845 83.075) scale(1.85149)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="B" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 .718 81.118) scale(2.2218)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="C" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -1.25 79.151) scale(2.2218)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="D" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -2.048 77.196) scale(2.5921)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="E" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -31.95 50.442) scale(2.5921)"><stop offset="0.375" stop-color="#F9DDD1"></stop><stop offset="1" stop-color="#FFF3EB" stop-opacity="0"></stop></radialGradient><radialGradient id="F" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(111.038 9.116 68.506) scale(5.48002)"><stop stop-color="#FDF7F2"></stop><stop offset="1" stop-color="#FFD8BD"></stop></radialGradient><linearGradient id="t" x1="59.803" y1="88.918" x2="33.764" y2="21.046" gradientUnits="userSpaceOnUse"><stop stop-color="#E0B1CC"></stop><stop offset="0.431" stop-color="#FFF1F1"></stop><stop offset="1" stop-color="#FFC9A5"></stop></linearGradient><linearGradient id="u" x1="59.803" y1="53.115" x2="83.41" y2="53.115" gradientUnits="userSpaceOnUse"><stop stop-color="#D16AE9"></stop><stop offset="1" stop-color="#FF661D"></stop></linearGradient><linearGradient id="v" x1="18.111" y1="36.984" x2="75.136" y2="85.621" gradientUnits="userSpaceOnUse"><stop stop-color="#FF661D"></stop><stop offset="0.5" stop-color="#CE3A00"></stop><stop offset="1" stop-color="#A60A5E"></stop></linearGradient></defs></svg>
                </Link>
        
                <div></div>
        
                <Link className={style2.perfil_link} to="/user__config.html">
                    <img className={style2.perfil} src={dados.foto_perfil} alt="Perfil"/>
                </Link>
            </nav>
        </div>
    )
}