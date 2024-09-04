import styles from "../Assets/css/Portal_artista.module.css"
import { Link } from "react-router-dom"
import "../index.css"

export default function Portal_artista()
{
    return(
        <section className={styles.corpo}>
            <section className={styles.container1}>
                <Link to="/inscricoes"><button className={styles.botao_amarelo}>Portal Inscrições</button></Link>

                {/* Anne quando terminar a pagína você colocar o link na tag a aqui em baixo ok */}
                <Link to="/projetos"><button className={`${styles.botao_amarelo} ${styles.botao_verde_2}`}>Histórico de Projetos </button></Link>
            </section>

            <section className={styles.container2}>
                
            </section>
        </section>
    )
}