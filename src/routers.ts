import{Router} from 'express';
import { SendEmailController } from './controllers/SendEmailController';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

// Instanciação
const userController = new UserController();
const surveysController = new SurveyController();
const sendController = new SendEmailController();

// Declarando as routas
router.post("/users", userController.create);
router.get("/showAllUsers", userController.showAllUsers);

router.post("/surveys", surveysController.create);
router.get("/showAllSurveys", surveysController.showAllSurveys);

router.post("/sendEmail", sendController.execute);
export {router}