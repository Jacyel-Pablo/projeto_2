import styles from "../Assets/css/login.module.css"
import imagem from "../Assets/img/img login/Mensagem.png"
import { useState } from "react"

export default function Recuperar_senha()
{
    
    const [email, setEmail] = useState()

    return(
        <div className={styles.corpo}>
            <div className={styles.parte1}>

                <form className={`${styles.box1} ${styles.box2}`}>
                    <h1 className={`${styles.titulo} ${styles.titulo2}`}>Recuperar conta</h1>
                    <p className={`${styles.texto} ${styles.texto_rec_senha}`}>Insira seu email</p>

                    <input className={`${styles.campos_form} ${styles.campos_form_recuperacao}`} onChange={(e) => setEmail(e.target.value)} placeholder="Email:" type="text"/>
                    <input className={`${styles.campos_form} ${styles.botao_enviar}`} onClick={(e) => alert(`Se o email: ${email} possui uma conta chegara um email para redefinir a senha`)} type="button" value="Recuperar conta"/>
                </form>
            </div>

            <div className={styles.container_img}>
                <img className={styles.mensagem} src={imagem} alt="Desperte sua criatividade"/>
            </div>
        </div>
    )
}