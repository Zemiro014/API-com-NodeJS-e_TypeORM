import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuid} from 'uuid';
import { Survey } from "./survey";
import { User } from "./User";

@Entity("surveys_users") // Informa que essa class é uma entidade da tabela "surveys" do banco de dados
class SurveyUser
{
    @PrimaryColumn()
    readonly id:string;

    @Column()
    user_id: string;

    @ManyToOne(()=> User)
    @JoinColumn({name: "user_id"})
    user:User

    @Column()
    survey_id:string;

    @ManyToOne(()=> Survey)
    @JoinColumn({name: "survey_id"})
    survey:Survey

    @Column()
    value: number;

    @CreateDateColumn()
    created_at:Date

    constructor()
    {
        if(!this.id){
            this.id = uuid();
        }
    }

}
export{SurveyUser};