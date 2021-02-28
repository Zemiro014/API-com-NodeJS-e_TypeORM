import request from 'supertest';
import { app } from '../app';


import createConnection from '../database';

describe("Surveys", () => {
    beforeAll( async ()=>{
        const connnection = await createConnection();
        await connnection.runMigrations();
    });

    it("should be  able to create a new survey", async () =>{
        const response = await request(app).post("/surveys").send({
            title:"title example",
           description:"Description Example",
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
});

it("should be able to get All serveys",async () =>{
    await request(app).post("/surveys").send({
        title:"title example 2",
       description:"Description Example 2",
    });

    const response = await request(app).get("/showAllSurveys");
    expect(response.body.length).toBe(2);
});

});