import styles from "../Assets/css/Projetos.module.css"
import Lupa from "../Assets/img/img projetos/Lupa.png"
import Sino from "../Assets/img/img projetos/Sino.png"
import { Link } from "react-router-dom"
import "../index.css"

let nome = "Eleriane Paula Branco de Gomes"
let cpf = "000.000.000.00"

export default function Projetos()
{
    return(
        <>
            <nav className="menu">
                <Link to="/portal_artistas"><div className="seta"></div></Link>
                <h1 className={styles.titulo}>Histórico de Projetos</h1>
                <Link to="/notificacao"><img className={styles.sino} src={Sino} alt="Sino de notificação" /></Link>
            </nav>

            <section className={styles.corpo}>
                <div className={styles.corpo_p1}>
                    <p className={styles.infor}>{nome} <br/> CPF: {cpf}</p>

                    {/* Box 1 */}

                    <div className={styles.box}>
                        <div className={styles.box_nav}>
                            <img className={styles.lupa} src={Lupa} alt="Lupa"/>
                            <p className={styles.box_titulo}>Titulo: Arte Digital e Novas Mídias </p>
                        </div>

                        <p className={styles.box_texto}> Exploração de novas tecnologias e mídias digitais para criar arte interativa, arte generativa, realidade aumentada, entre outros.</p>
                    </div>

                    {/* Box 2 */}

                    <div className={styles.box}>
                        <div className={styles.box_nav}>
                            <img className={styles.lupa} src={Lupa} alt="Lupa"/>
                            <p className={styles.box_titulo}>Título: Arte Ambiental </p>
                        </div>

                        <p className={styles.box_texto}> Criação de obras que respondem ao ambiente natural, utilizando materiais encontrados localmente ou abordando questões ambientais.</p>
                    </div>

                    {/* Box 3 */}

                    <div className={styles.box}>
                        <div className={styles.box_nav}>
                            <img className={styles.lupa} src={Lupa} alt="Lupa"/>
                            <p className={styles.box_titulo}>Titulo:Residências Artísticas </p>
                        </div>

                        <p className={styles.box_texto}>Participação em programas de residência onde artistas vivem e trabalham juntos por um período específico de tempo, colaborando e produzindo arte.</p>
                    </div>
                </div>

                <div className={`${styles.corpo_p1} ${styles.corpo_p2}`}></div>
            </section>
        </>
    )
}