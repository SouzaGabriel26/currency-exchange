import { Router } from "express";
import UsersController from "./controller/UsersController";
import { userAuth } from "./middlewares/userAuth";
import TradesController from "./controller/TradesController";

const router: Router = Router()

router.post('/user/signup', UsersController.signup);
router.post('/user/signin', UsersController.signin);
router.get('/users', UsersController.findAll);

router.get('/user/:id', userAuth, UsersController.show);
router.put('/user/:id', userAuth, UsersController.update);
router.delete('/user/:id', userAuth, UsersController.delete);


router.get('/trades/:userId', userAuth, TradesController.findAll);
router.post('/trade/:trade', userAuth, TradesController.create);
router.delete('/trade/:tradeId', userAuth, TradesController.delete);

export default router;