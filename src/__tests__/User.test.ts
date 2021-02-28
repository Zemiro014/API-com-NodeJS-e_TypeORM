import request from 'supertest';
import { app } from '../app';


import createConnection from '../database';

describe("Users", () => {
    beforeAll( async ()=>{
        const connnection = await createConnection();
        await connnection.runMigrations();
    });

    it("should be  able to create a new user", async () =>{
        const response = await request(app).post("/users").send({
            email:"user02@exemple.com",
            name:"User02 Example",
        });

        expect(response.status).toBe(201);
    });

    it("should not be able to create a user with exists email", async ()=>{
        const response = await request(app).post("/users").send({
            email:"user02@exemple.com",
            name:"User02 Example",
        });
        expect(response.status).toBe(400);
    })
});