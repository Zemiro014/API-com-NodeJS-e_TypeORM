import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

class SendEmaliService{
   
private client: Transporter
    constructor(){
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure, // true for 465, false for other ports
                auth: {
                  user: account.user, // generated ethereal user
                  pass: account.pass, // generated ethereal password
                },
              });

              this.client = transporter;
        })
    }

    async execute(to: string, subject: string, variables: object, path:string){
        
        const templateFileContent = fs.readFileSync(path).toString("utf-8"); // leitura do arquivo definido no caminho
        const mailTemplateParse = handlebars.compile(templateFileContent); // Compilar o template

        const html = mailTemplateParse(variables);

        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: "NPS <noreolay@nps.com.br>"
        })

        console.log('Message sent: %s', message.messageId);
        console.log("preview URL: %s", nodemailer.getTestMessageUrl(message));
    }
}
export default new SendEmaliService();