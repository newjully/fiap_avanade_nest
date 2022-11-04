import { Injectable } from '@nestjs/common';
import { DefaultTransporter } from 'google-auth-library';
import {google} from 'googleapis';
import * as nodemailer from 'nodemailer';
import { resourceLimits } from 'worker_threads';

@Injectable()
export class EmailService {

    async sendEmail(to: string, subject: string, msg: string, options:object) {
      const clientID = process.env.CLIENT_ID;
      const secretKey = process.env.SECRET_KEY;
      const refreshToken = process.env.REFRESH_TOKEN;
      const redirectURI = 'https://developers.google.com/oauthplayground'
      const OAuth2 = google.auth.OAuth2;

      const oAuth2Client = new OAuth2(clientID, secretKey, redirectURI);  // nessa linha pergunta de vc pode acessar o email

      oAuth2Client.setCredentials({refresh_token: refreshToken});

      const accessToken = oAuth2Client.getAccessToken();

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        logger: false,
        debug: false,
        auth: {
            type: 'OAuth2',
            user: 'juliana.cruz.avanade@gmail.com',
            clientID: clientID,
            clientSecret: secretKey,
            refreshToken: refreshToken,
            accessToken,
        },
});
        const mailOptions = {
            from: 'juliana.cruz.avanade@gmail.com',
            to: to,
            bcc: 'newjully@gmail.com',
            subject: subject,
            html:
            `Enviando  e-mail com NodeJs + Gmail + NestJs + OAuth2.0
            <h1>${msg}</h1>
            Somente especialistas.
            `,
        
    }
        
        try {
            const result = transporter.sendEmail(mailOptions);

            if(!result.reject) {
                return { message:'Mensagem enviada com sucesso! ' };
            } else {
                return {message: result.reject};
            }
        } catch (error) {
            return { message: error.message };
            }
        }

 }

