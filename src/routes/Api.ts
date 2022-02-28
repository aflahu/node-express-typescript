/**
 * Define all your API web-routes
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import { Router } from "express";
import * as expressJwt from "express-jwt";

import Locals from "../providers/Locals";

import HomeController from "../controllers/Api/Home";
import LoginController from "../controllers/Api/Auth/Login";
import RegisterController from "../controllers/Api/Auth/Register";
import RefreshTokenController from "../controllers/Api/Auth/RefreshToken";
import UserController from "../controllers/Api/User";

const router = Router();

router.get("/", HomeController.index);

router.post("/auth/login", LoginController.perform);
router.post("/auth/register", RegisterController.perform);
router.post(
  "/auth/refresh-token",
  expressJwt({ secret: Locals.config().appSecret }),
  RefreshTokenController.perform
);

router.post("/user", UserController.create);
router.put("/user/:userId", UserController.update);
router.delete("/user/:userId", UserController.delete);
router.post("/user/delay-birthday-message", UserController.sendDelayedMessage);


export default router;
