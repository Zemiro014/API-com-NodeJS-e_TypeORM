import {Request, Response} from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveysUsersRepository";

class AnswerController{

    // http://localhost:3333/answers/1?U=952d
    /**
     * 
     * Route Params => Parametros que compoem a rota
     * 
     * routes.get("/answers/:value")
     */
     async execute(request: Request, response: Response)
     {
        const { value } = request.params;
        const { U } = request.query;

        const surveysUsersRepo = getCustomRepository(SurveyUserRepository);

        const surveyUser = await surveysUsersRepo.findOne({
            id: String(U),
        });

        if(!surveyUser){
            return response.status(400).json({
                error: "Survey User does not exists!"
            });
        }

        surveyUser.value = Number(value);
        await surveysUsersRepo.save(surveyUser);
        return response.json(surveyUser);
        
     }
}
export{AnswerController};