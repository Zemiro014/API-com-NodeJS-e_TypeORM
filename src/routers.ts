import{Router} from 'express';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

// Instanciação
const userController = new UserController();
const surveysController = new SurveyController();

// Declarando as routas
router.post("/users", userController.create);
router.get("/showAllUsers", userController.showAllUsers);

router.post("/surveys", surveysController.create);
router.get("/showAllSurveys", surveysController.showAllSurveys);

export {router}