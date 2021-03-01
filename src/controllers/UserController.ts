import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as YUP from 'yup';

class UserController
{
    async create(request: Request, response: Response)
    {
        const {name, email} = request.body;
        
        const schema = YUP.object().shape({
            name: YUP.string().required(),
            email:YUP.string().email().required()
        })

        try
        { 
            await schema.validate(request.body, { abortEarly: false}) ;
        }
        catch(error) { return response.status(400).json({ error: error }); }

        /*
            if(!(await schema.isValid(request.body)))
            {
                return response.status(400).json({
                    error: "Validation Failed",
                })
            }
        */
        const usersRepository = getCustomRepository(UsersRepository);

        // Antes de adicionar um novo user, primeiro busque no meu banco de dados se existe alguém com email recebido
        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if(userAlreadyExists)
        {
            return response.status(400).json({
                error: "User already exists !",
            })
        }
        
        const user = usersRepository.create({
            name, 
            email
        })

        await usersRepository.save(user);
        return response.status(201).json(user);
    }

    async showAllUsers(request: Request, response: Response)
    {
        const usersRepository = getCustomRepository(UsersRepository);

        const all = await usersRepository.find();

        return response.json(all);
    }
}

export { UserController };
