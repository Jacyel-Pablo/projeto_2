import express from "express";
import { upload } from "./controllers.js"
import { PrismaClient } from "@prisma/client";
import { unlink } from "fs/promises"
import path from "path";

const prisma = new PrismaClient()

const router = express.Router()

// Rotas do perfil
router.put("/upload__foto__perfil", upload("/files/foto de perfil").single("foto"), async (request, response) => {
    const email = request.body.email

    try{
        const foto = await prisma.usuario_projeto_2.findUnique({
            where: {
                email: email
            }
        })

        // Ser o usuário já tive uma foto de perfil a anterior vai ser deletada
        if (foto.foto_perfil != null) {
            unlink(foto.foto_perfil)
        }

        // Guardar as informações da foto no banco de dados
        setTimeout(async () => {
            await prisma.usuario_projeto_2.update({
                where: {
                    email: email
                },
    
                data: {
                    foto_perfil: request.file.path
                }
            })

        }, 400)

    } catch (e) {
        console.log(e)
        response.send(false)
    }
})

router.get("/validar__foto", async (request, response) => {
    const email = request.query.email

    try {
        const foto = await prisma.usuario_projeto_2.findUnique({
            where: {
                email: email
            }
        })

        if (foto.foto_perfil != null) {
            response.send(true)

        } else {
            response.send(false)
        }

    } catch (e) {
        response.send(false)

    }

})

router.get("/pegar__foto", async (request, response) => {
    
    try {
        const foto = await prisma.usuario_projeto_2.findUnique({
            where: {
                email: request.query.email
            }
        })
    
        if (foto.foto_perfil == null) {
            response.status(404).send(false)

        } else {
            response.sendFile(foto.foto_perfil)

        }

    } catch (e) {
        console.log(e)
        response.status(404).send(false)
    }
})

// Rotas de adicionar filmes

router.post("/enviar__filme", upload("/files/capas dos filmes").single("capa"), async (request, response) => {
    
    await prisma.filmes_projeto_2.create({
        data: {
            capa: path.resolve(path.dirname("") + "/files/capas dos filmes" + "/" + request.file.filename),
            nome: request.body.nome,
            sinopse: request.body.sinopse
        }
    })

})

export { router }