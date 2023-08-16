import { Router } from "express";
import { userAuth } from "./middlewares/userAuth";

import UsersController from "./controller/UsersController";
import TradesController from "./controller/TradesController";

const router: Router = Router()

router.post('/auth/signup', UsersController.signup);
router.post('/auth/signin', UsersController.signin);
router.get('/users', UsersController.findAll);

router.get('/user/me', userAuth, UsersController.show);
router.put('/user/:id', userAuth, UsersController.update);
router.delete('/user/:id', userAuth, UsersController.delete);


router.get('/trades/:userId', userAuth, TradesController.findAll);
router.post('/trade/:trade', userAuth, TradesController.create);
router.delete('/trade/:tradeId', userAuth, TradesController.delete);

export default router;