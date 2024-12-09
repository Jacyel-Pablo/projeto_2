import style from "../Estilos/user__config.module.css"
import Seta_voltar from "../Resources/user__config/Seta voltar.png"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

var click_lapis = false

export default function User__config()
{

    const [dados, setDados] = useState({
        // Os filmes são a lista de estrelas que vc deu em filmes
        filmes: [],

        input_width: {width: "0px"},
        input_valor: "",

        nome: "A Lenda das Lendas"
    })

    function adicionar_nome_input(e)
    {
        setDados(copiar => ({
            ...copiar,
            input_valor: e.target.value
        }))
    }

    function alterar_nome_lapis_false()
    {
        setDados(copiar => ({
            ...copiar,
            input_width: {width: "150px", borderBottom: "2px solid"},
            nome: ""
        }))
    }

    function alterar_nome_lapis_true()
    {
        if (dados.input_valor == "") {
            alert("O nome não pode ser vazio")

        } else {
            fetch(`http://localhost:3000/alterar_nome?email=${localStorage.getItem("email")}&nome=${dados.input_valor}`).then(dados1 => dados1.json()).then(dados1 => {
                if (dados1 == true) {
                    click_lapis = false
                    localStorage.setItem("apelido", dados.input_valor)

                    setDados(copiar => ({
                        ...copiar,
                        nome: dados.input_valor,
                        input_width: {width: "0px", borderBottom: "0px solid"},
                        input_valor: ""
                    }))

                } else {
                    const nome_valor = dados.input_valor
                    console.log(nome_valor.length)
                    if (dados.input_valor.length <= 2) {
                        alert("O nome não pode ter menos de 3 caracteres")

                    } else {
                        alert("Usúario já exitente")
                    }
                }
            })
        }
    }

    function lapis__select()
    {
        if (click_lapis == false) {
            alterar_nome_lapis_false()
            click_lapis = true

        } else {
            alterar_nome_lapis_true()

        }
    }

    function nome_user() { 
        if (localStorage.getItem("apelido") != undefined) {
            setDados(copiar => ({
                ...copiar,
                nome: localStorage.getItem("apelido")
            }))
        }
    }

    // adicionar os filmes Lista de Favoritos e o nome do usúario
    function favoritos()
    {
        fetch(`http://localhost:3000/lista?email=${localStorage.getItem("email")}&token=${localStorage.getItem("token")}`).then(infor => infor.json())
        .then(infor => {
            var filmes_list = []
            for (let i = 0; i < infor.length; i++) {
                filmes_list.push(

                    <a key={infor[i][0].id_filmes} className={style.love__link} href="dados__filme.html">
                        <div className={`${style.caixa__favoritos} ${style.bio__txt}`} style={{backgroundColor: "white"}}>
                            <div className={style.container1}>
                                <img className={style.capa} src={infor[i][0].capa} alt="capa do filme"/>
                            </div>

                            <h3 className={style.nome__filme}>{infor[i][0].nome}</h3>
                        </div>
                    </a>
                )
            }

            setDados(copiar => ({
                ...copiar,
                filmes: filmes_list
            }))
        })
        
        // Nome do usúario
        nome_user()
    }

    useEffect(() => favoritos(), [])

    return(
        <div className={style.corpo}>
            <section className={style.box1}>
                <Link to="/menu.html">
                    <img className={style.seta} src={Seta_voltar} alt="A seta para voltar a pagína inicial"/>
                </Link>

                <div className={style.nome__config}>
                    <img className={style.perfill} src="https://media.tenor.com/Lk6mMX3yHqUAAAAd/little-witch-academia-atsuko-kagari.gif" alt="Perfil"/>
                </div>

                <form className={style.nome__config}>                    
                    <h1 id="nome" className={`${style.user__name} ${style.text__bg}`}>{dados.nome}</h1>

                    <input required id="input_alterar_nome" onChange={(e) => adicionar_nome_input(e)} value={dados.input_valor} className={style.user__name__input} type="text" style={dados.input_width}/>
                    
                    <svg id="lapis" onClick={() => lapis__select()} className={style.lapis} xmlns="http://www.w3.org/2000/svg" version="1.0" width="499.000000pt" height="500.000000pt" viewBox="0 0 499.000000 500.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none">
                            <path d="M3930 4981 c-58 -18 -112 -55 -201 -137 -185 -172 -3461 -3450 -3476 -3477 -8 -16 -25 -88 -38 -160 -14 -73 -38 -204 -56 -292 -110 -568 -154 -833 -145 -871 4 -14 16 -26 31 -30 30 -7 415 57 665 111 36 8 173 35 305 60 132 25 262 51 289 57 48 11 71 32 750 707 385 383 707 703 715 712 9 9 473 475 1032 1035 969 973 1158 1172 1178 1241 13 46 -3 223 -25 265 -32 61 -137 177 -389 426 -265 263 -324 312 -410 342 -60 21 -175 26 -225 11z m177 -122 c53 -20 83 -47 380 -343 177 -177 335 -343 352 -370 56 -90 37 -187 -58 -290 -104 -113 -238 -249 -253 -257 -15 -8 -80 52 -404 373 -212 211 -391 384 -398 386 -7 2 -19 -4 -25 -12 -15 -18 26 -62 486 -525 150 -151 273 -279 273 -286 0 -13 -97 -111 -104 -104 -57 52 -926 925 -926 930 0 5 306 310 432 431 58 55 116 85 165 87 12 1 48 -9 80 -20z m-257 -1014 l464 -464 -1484 -1483 c-1431 -1428 -1485 -1481 -1491 -1452 -4 16 -7 68 -8 116 l-1 87 541 543 c956 961 1119 1127 1119 1141 0 7 -3 16 -6 20 -8 8 -55 -16 -75 -40 -9 -10 -377 -377 -817 -815 l-801 -798 -141 0 -140 0 0 145 0 145 983 984 c540 541 1084 1087 1210 1214 199 203 249 262 219 262 -23 0 -238 -211 -1292 -1265 l-1155 -1155 -148 0 -148 0 3 144 3 145 1126 1128 c619 620 1132 1139 1138 1152 9 15 10 26 3 33 -14 14 -99 -69 -1290 -1257 -557 -555 -1015 -1012 -1017 -1014 -3 -2 -52 -5 -110 -6 -73 -2 -105 1 -105 9 0 13 2932 2946 2945 2946 6 0 219 -209 475 -465z m-3295 -2555 l70 0 0 -146 c0 -133 2 -147 19 -160 15 -10 55 -14 163 -14 l143 0 0 -143 c0 -103 4 -148 13 -161 12 -16 31 -18 160 -19 l148 -1 -3 -141 -3 -140 -105 -22 c-58 -13 -179 -36 -270 -52 -91 -17 -208 -38 -262 -49 l-96 -19 -156 156 -156 156 21 110 c11 61 34 178 49 260 53 286 74 380 84 388 6 4 34 6 61 3 28 -3 82 -6 120 -6z m-184 -999 c38 -41 66 -78 62 -81 -19 -15 -93 -33 -181 -45 -54 -6 -98 -11 -99 -10 -3 2 34 216 41 238 3 9 8 24 11 33 6 20 72 -32 166 -135z"/>
                            <path d="M3222 3936 c-50 -51 -70 -79 -66 -90 12 -31 49 -17 105 42 80 83 84 89 69 107 -7 8 -18 15 -25 15 -6 0 -44 -33 -83 -74z"/>
                            <path d="M3463 2865 c-63 -50 -358 -357 -361 -375 -3 -15 2 -20 20 -20 31 0 401 370 396 396 -5 26 -20 26 -55 -1z"/>
                        </g>
                    </svg>
                </form>

                <div className="w-100 text-center">
                    <input type="button" value="Sair da conta" className="btn text-white bg-danger btn_sair_conta mt-5" onClick={() => {localStorage.removeItem("token"); window.location.href = "/"}}/>
                </div>
            </section>

            <section id="box2" className={style.box2}>

                <h2 className={`${style.text__bg} ${style.biografia}`}><strong>Lista de Favoritos</strong></h2>

                <div>{dados.filmes}</div>

            </section>
        </div>
    )
}