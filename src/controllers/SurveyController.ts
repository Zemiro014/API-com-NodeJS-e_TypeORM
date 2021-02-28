import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository";

class SurveyController
{
    async create(request: Request, response:Response){

        const{title, description} = request.body;

        const surveyReposi = getCustomRepository(SurveyRepository);

        const survey = surveyReposi.create({ // Criando o objecto do tipo "Survey"
            title,
            description
        });

         await surveyReposi.save(survey);
         return response.status(201).json(survey);
    }

    async showAllSurveys(request: Request, response: Response)
    {
        const surveyReposi = getCustomRepository(SurveyRepository);

        const all = await  surveyReposi.find();

        return response.json(all);
    }
}
export { SurveyController };
