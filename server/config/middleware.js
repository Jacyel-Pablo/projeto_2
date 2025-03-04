import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { z } from "zod"

// Função que verificar se o valor do numero da rota "pegar_filmes_da_tabela" e número ou não
function isNumeric(str)
{
    let validacao = true

    for (let i = 0; i < str.length; i++) {
        if (str[i] in ['1', '2', '3', '4', '5', '6', '7', '8', '9'] == false) {
            validacao = false
            break
        }
        if (str == undefined) {
            validacao = false
            break
        }
    }

    return validacao
}

function criar_token(json)
{
    return jwt.sign(json, process.env.CHAVE, {expiresIn: "1h"})
}

function valida_token(token)
{
    try {
        jwt.verify(token, process.env.CHAVE)
        return true

    } catch(e) {
        return false
    }
}

function validate(esquema)
{
    return (request, response, next) => {
        try{
            esquema.parse({
                query: request.query,
                body: request.body
            })

            next()

        } catch (e) {
            response.status(404).send(false)
        }
    }
}

export {isNumeric, criar_token, valida_token, validate}