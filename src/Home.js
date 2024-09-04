import styles from "./Assets/css/Home.module.css"
import { Link } from "react-router-dom"
import "./index.css"

export default function Home()
{
    return(
        <section className={styles.corpo}>
            <h1 className={styles.titulo}>PORTAL<br/>DO<br/>ARTISTA</h1>

            <Link to="/login">
                <button className={styles.artista}>Acessar</button>
            </Link>
        </section>
    )
}