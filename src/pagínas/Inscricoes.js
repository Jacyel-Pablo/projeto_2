import "../index.css"
import { Link } from "react-router-dom"
import styles from "../Assets/css/Inscricoes.module.css"
import Sino from "../Assets/img/img projetos/Sino.png"

export default function Inscricoes()
{
    return(
        <>
            {/* Nome Portal inscri */}
            <nav className="menu">
                <Link to="/portal_artistas"><div className="seta"></div></Link>
                <h1 className="titulo1">Portal inscrições</h1>
                <Link to="/notificacao"><img className="sino1" src={Sino} alt="Sino de notificação" /></Link>
            </nav>

            {/* Meio ou barriga da pagína */}
            <section className={styles.corpo}>

                {/* Inscrições */}
                <div className={styles.inscricoes}>
                    <div className={styles.container_inscricoes}>
                        <h1 className={styles.titulo}>INSCRIÇÕES</h1>

                        <p className={styles.texto}>Inscreva-se para participar do nosso processo seletivo. </p>

                        <hr className={styles.hr_inscricao}></hr>

                        <p className={`${styles.editais}`}>EDITAL N 24/2024-CULTURA+/PB - EXAME DE SELEÇÃO</p>

                        <p className={styles.texto}>Periodo de Incrição</p>

                        <p className={styles.texto}>07 Agosto de  2024 até 08 Setembro de 2024 </p>

                        <input className={styles.botao_laranja} type="button" value="Visualizar"/>
                        
                        <hr className={styles.hr_inscricao}></hr>

                    </div>
                </div>

                {/* Minhas inscrições */}
                <div className={styles.inscricoes}>
                    <div className={styles.container_inscricoes}>

                        <h2 className={styles.titulo}>MINHAS INCRIÇÕES</h2>

                        <p className={styles.texto}>Participações em Editais</p>

                        <hr className={styles.hr_minhas_inscricao}></hr>

                        <p className={styles.editais}>EDITAL N 24/2024-CULTURA+/PB - EXAME DE SELEÇÃO</p>

                        <hr className={styles.hr_inscricao}></hr>

                        <input className={styles.botao_laranja_minhas} type="button" value="Visualizar"/>
                    </div>
                </div>

                {/* Novos */}
                <div className={`${styles.inscricoes} ${styles.novo}`}>
                    <div className={styles.container_inscricoes}>
                        <h3 className={styles.titulo}>NOVOS</h3>

                        <p className={styles.texto}>Conheça prepara-se para novos processos seleção.</p>

                        <hr></hr>

                        <div className={styles.container_novos}>
                            <p className={styles.texto}>Não a novos processos seleções.</p>
                        </div>
                    </div>

                    <input className={styles.botao_andamento} type="button" value="EM ANDAMENTO"/>
                </div>
            </section>

            {/* Imagem do rodapé */}
            <footer className={styles.imagem_rodape}></footer>
        </>
    )
}