import styles from "../Assets/css/criar_conta.module.css"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Criar_conta()
{
    const [form, setForm] = useState({
        nome: "", 
        email:"", 
        cpf:"", 
        area: "",
        biografia: "",
        link: "",
        senha:"", 
        dia:"",
        mes:"",
        ano:"",
        genero:""
    })

    function dados_form(e)
    {
        switch (e.target.id) {
            case "nome":
                setForm({
                    nome: e.target.value, 
                    email: form.email, 
                    cpf: form.email, 
                    area: form.area,
                    biografia: form.biografia,
                    link: form.link,
                    senha: form.senha, 
                    dia: form.dia,
                    mes: form.mes,
                    ano: form.ano,
                    genero: form.genero})
                break

            case "email":
                setForm({
                    nome: form.nome, 
                    email: e.target.value, 
                    cpf: form.cpf, 
                    area: form.area,
                    biografia: form.biografia,
                    link: form.link,
                    senha: form.cpf, 
                    dia: form.dia,
                    mes: form.mes,
                    ano: form.ano,
                    genero: form.genero
                })
                break

            case "cpf":
                setForm({
                    nome: form.nome, 
                    email: form.email, 
                    cpf: e.target.value, 
                    area: form.area,
                    biografia: form.biografia,
                    link: form.link,
                    senha: form.senha, 
                    dia: form.dia,
                    mes: form.mes,
                    ano: form.ano,
                    genero: form.genero
                })
                break

            case "area":
                setForm({
                    nome: form.nome, 
                    email: form.email, 
                    cpf: form.cpf, 
                    area: e.target.value,
                    biografia: form.biografia,
                    link: form.link,
                    senha: form.senha, 
                    dia: form.dia,
                    mes: form.mes,
                    ano: form.ano,
                    genero: form.genero
                })
                break

            case "biografia":
                setForm({
                    nome: form.nome, 
                    email: form.email, 
                    cpf: form.cpf, 
                    area: form.area,
                    biografia: e.target.value,
                    link: form.link,
                    senha: form.senha, 
                    dia: form.dia,
                    mes: form.mes,
                    ano: form.ano,
                    genero: form.genero
                })
                break

            case "link":
                setForm({
                    nome: form.nome, 
                    email: form.email, 
                    cpf: form.cpf, 
                    area: form.area,
                    biografia: form.biografia,
                    link: e.target.value,
                    senha: form.senha, 
                    dia: form.dia,
                    mes: form.mes,
                    ano: form.ano,
                    genero: form.genero
                })
                break
            
            case "senha":
                setForm({
                    nome: form.nome, 
                    email: form.email, 
                    cpf: form.cpf, 
                    area: form.area,
                    biografia: form.biografia,
                    link: form.link,
                    senha: e.target.value, 
                    dia: form.dia,
                    mes: form.mes,
                    ano: form.ano,
                    genero: form.genero
                })
                break
            
            case "dia":
                setForm({
                    nome: form.nome, 
                    email: form.email, 
                    cpf: form.cpf, 
                    area: form.area,
                    biografia: form.biografia,
                    link: form.link,
                    senha: form.senha, 
                    dia: e.target.value,
                    mes: form.mes,
                    ano: form.ano,
                    genero: form.genero
                })
                break
            
            case "mes":
                setForm({
                    nome: form.nome, 
                    email: form.email, 
                    cpf: form.cpf, 
                    area: form.area,
                    biografia: form.biografia,
                    link: form.link,
                    senha: form.senha, 
                    dia: form.dia,
                    mes: e.target.value,
                    ano: form.ano,
                    genero: form.genero
                })
                break

            case "ano":
                setForm({
                    nome: form.nome, 
                    email: form.email, 
                    cpf: form.cpf, 
                    area: form.area,
                    biografia: form.biografia,
                    link: form.link,
                    senha: form.senha, 
                    dia: form.dia,
                    mes: form.mes,
                    ano: e.target.value,
                    genero: form.genero
                })
                break

            case "feminino":
                setForm({
                    nome: form.nome, 
                    email: form.email, 
                    cpf: form.cpf, 
                    area: form.area,
                    biografia: form.biografia,
                    link: form.link,
                    senha: form.senha, 
                    dia: form.dia,
                    mes: form.mes,
                    ano: form.ano,
                    genero: e.target.id
                })
                break

            case "masculino":
                setForm({
                    nome: form.nome, 
                    email: form.email, 
                    cpf: form.cpf, 
                    area: form.area,
                    biografia: form.biografia,
                    link: form.link,
                    senha: form.senha, 
                    dia: form.dia,
                    mes: form.mes,
                    ano: form.ano,
                    genero: e.target.id
                })
                break
        }
    }

    return(
        <div className={styles.corpo}>
            <form className={styles.formulario}>
                <h1 className={styles.titulo}>Abra uma conta</h1>
                <p className={styles.texto}>É gratuito</p>

                {/* Campo nome */}
                <input className={styles.campos_form} id="nome" onChange={(e) => dados_form(e)} placeholder="Nome:" type="text"/>
                
                {/* Campo email */}
                <input className={styles.campos_form} id="email" onChange={(e) => dados_form(e)} placeholder="Seu e-mail:" type="text"/>

                {/* Campo cpf */}
                <input className={styles.campos_form} id="cpf" onChange={(e) => dados_form(e)} placeholder="CPF:" type="text"/>

                {/* Area de atuação */}
                <input className={styles.campos_form} id="area" onChange={(e) => dados_form(e)} placeholder="Area de atuação:" type="text"/>

                {/* Biografia */}
                <textarea className={styles.campos_form} id="biografia" onChange={(e) => dados_form(e)} placeholder="Insira sua Biografia:" type="text"></textarea>

                {/* Link */}
                <input className={styles.campos_form} id="link" onChange={(e) => dados_form(e)} placeholder="Insira o link dos seu repositorios:" type="text"/>

                {/* campo senha */}
                <input className={styles.campos_form} id="senha" onChange={(e) => dados_form(e)} placeholder="Senha:" type="password"/>
                
                {/* Texto data de nascimento */}
                <p className={styles.texto}>Data de Nascimento </p>

                {/* box data de nascimento */}

                {/* Dia */}
                <input className={`${styles.campos_form} ${styles.data_nascimento_form}`} id="dia" onChange={(e) => dados_form(e)} type="number" min="0" max="31"/>

                {/* Mes */}
                <input className={`${styles.campos_form} ${styles.data_nascimento_form}`} id="mes" onChange={(e) => dados_form(e)} type="number" min="1" max="12"/>
                
                {/* Ano */}
                <input className={`${styles.campos_form} ${styles.data_nascimento_form}`} id="ano" onChange={(e) => dados_form(e)} type="number" min="1800"/>

                {/* div de generos e botão de abrir conta */}

                <div className={styles.genero_abrir_conta}>

                    {/* Caixa marca feminino e texto */}
                    <label className={styles.junta_radio_texto}>
                        <input className={styles.genero_checkbox} id="feminino" onChange={(e) => dados_form(e)} type="radio" name="sexo"/>

                        <p className={`${styles.texto} ${styles.genero_texto}`}>Feminino</p>
                    </label>

                    {/* Caixa marca Masculino e texto */}
                    <label className={styles.junta_radio_texto}>
                        <input className={styles.genero_checkbox} id="masculino" onChange={(e) => dados_form(e)} type="radio" name="sexo"/>

                        <p className={`${styles.texto} ${styles.genero_texto}`}>Masculino</p>
                    </label>

                    {/* Botão criar conta */}
                    <Link to="/login"><input className={styles.botao_abrir_conta} type="submit" value="Abrir conta"/></Link>
                </div>
            </form>
        </div>
    )
}