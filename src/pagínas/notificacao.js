import "../index.css"
import styles from "../Assets/css/notificacao.module.css"
import { Link } from "react-router-dom"
import Sino from "../Assets/img/img projetos/Sino.png"
import mulher from "../Assets/img/img noticacao/Icone mulher.png"
import homem from "../Assets/img/img noticacao/Icone homem.png"

export default function Notificacao()
{
    return(
        <>
            {/* Nome Portal inscri */}
            <nav className="menu">
                <Link to="/portal_artistas"><div className="seta"></div></Link>
                <h1 className="titulo1">Notificação</h1>
                <Link to="/notificacao"><img className={styles.sino} src={Sino} alt="Sino de notificação" /></Link>
            </nav>

            <div className={styles.corpo}>
                <div className={styles.infors}>
                    {/* Parte 1 do grid */}
                    <img className={styles.icone} src={mulher} alt="Icone de perfil"/>

                    {/* Parte 2 do grid */}
                    <div className={styles.infors_box1}>
                        <h2>Michele Beatriz. </h2>
                        <p>EDITAL ABERTO: programado artista.  </p>
                    </div>

                    {/* Parte 3 do grid */}
                    <h2 className={styles.data}>12 Agosto de 2024</h2>
                </div>
                
                <div className={styles.infors}>
                    {/* Parte 1 do grid */}
                    <img className={styles.icone} src={mulher} alt="Icone de perfil"/>

                    {/* Parte 2 do grid */}
                    <div className={styles.infors_box1}>
                        <h2>Beatriz Campos</h2>
                        <p>Ecrições encerradas.  </p>
                    </div>

                    {/* Parte 3 do grid */}
                    <h2 className={styles.data}>01 Setembro de 2024</h2>
                </div>

                <div className={`${styles.infors} ${styles.infors_end}`}>
                    {/* Parte 1 do grid */}
                    <img className={styles.icone} src={homem} alt="Icone de perfil"/>

                    {/* Parte 2 do grid */}
                    <div className={styles.infors_box1}>
                        <h2>Joanderson Pereira</h2>
                        <p>Matriculas abertas. </p>
                    </div>

                    {/* Parte 3 do grid */}
                    <h2 className={styles.data}>13 Setembro de 2024</h2>
                </div>
            </div>
        </>
    )
}