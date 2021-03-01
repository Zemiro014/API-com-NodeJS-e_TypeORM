import {Request, Response} from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveyUserRepository } from "../repositories/SurveysUsersRepository";
import SendEmailService from "../services/SendEmailService";
import {resolve} from 'path';

class SendEmailController{
    async execute(request: Request, response: Response){
        const { email, survey_id } = request.body;

        const usersRepo = getCustomRepository(UsersRepository);
        const surveyRepo = getCustomRepository(SurveyRepository);
        const surveyUserRepo = getCustomRepository(SurveyUserRepository);

        const user = await usersRepo.findOne({email});
        if(!user){
            return response.status(400).json({
                error: "User does not existss",
            })
        }

        const survey = await surveyRepo.findOne({
            id: survey_id,
        })        
        if(!survey){
            return response.status(400).json({
                error: "Survey does not exists",
            })
        }

        const surveyUserAlredyExixts = surveyUserRepo.findOne(
            {
                where: [{user_id: user.id}, {value: null}],
                relations:["user", "survey"],
            }
        )
        const variables = {
            name: user.name,
            title: survey.title ,
            description: survey.description,
            user_id: user.id,
            link: process.env.URL_MAIL,
        }

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs"); // Definir o caminho do arquivo

        if(surveyUserAlredyExixts){
            await SendEmailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlredyExixts);
        }
        // Salvar as informações
        const surveyUser = surveyUserRepo.create({
            user_id: user.id,
            survey_id
        })
        await surveyUserRepo.save(surveyUser);
        // Enviar Email
     

     

        await SendEmailService.execute(email, survey.title, variables, npsPath);

        return response.json(surveyUser);
    }
}
export{SendEmailController}