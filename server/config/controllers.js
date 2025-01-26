import nodemailer from "nodemailer"
import multer from "multer"
import path from "path"
import { randomBytes } from "crypto";
import dotenv from "dotenv"

// enviar email

function send_email(email_user, titulo, texto, html)
{
    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        async function main() {
            const infor = await transporter.sendMail({
              from: `"ShowTime" <${process.env.EMAIL}>`,
              to: email_user,
              subject: titulo,
              text: texto,
              html: html,
            });
          
            console.log(`Link de email enviado ${nodemailer.getTestMessageUrl(infor)}`);
          }
          
          main().catch(console.error);
    });
}

function upload(diretorio)
{
    const arquivos_aceitos = ["image/png", "image/jpeg", "image/jpg", "image/gif"]

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.resolve(path.dirname("") + diretorio))
        },
        filename: function (req, file, cb) {
            const file1 = file.originalname.split(".")
            cb(null, file1[0] + '-' + randomBytes(16).toString("hex") + "." + file1[1])
        }
    })

    function fileFilter (req, file, cb) {

        if (arquivos_aceitos.includes(file.mimetype)) {
            cb(null, true)

        } else {
            cb(new Error('Desculpe ocorreu um erro'))

        }
      
    }
      
    return multer({ storage: storage, limits: {fieldSize: 250 * 1000000}, fileFilter: fileFilter })
}

export{send_email, upload}