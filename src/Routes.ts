import { Router } from "express";
import { userAuth } from "./middlewares/userAuth";

import TradesController from "./controller/TradesController";
import UsersController from "./controller/UsersController";

const router: Router = Router()

router.post('/auth/signup', UsersController.signup);
router.post('/auth/signin', UsersController.signin);
// router.get('/users', UsersController.findAll);

router.get('/user/me', userAuth, UsersController.show);
router.put('/user/:id', userAuth, UsersController.update);
router.delete('/user/:id', userAuth, UsersController.delete);


router.get('/trades', userAuth, TradesController.findAllByUserId);
router.post('/trade/:trade', userAuth, TradesController.create);
router.delete('/trade/:tradeId', userAuth, TradesController.delete);

export default router;