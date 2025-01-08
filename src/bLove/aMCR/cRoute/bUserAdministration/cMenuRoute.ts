import express from 'express';
import menuController from '../../bController/bUserAdministration/cMenuController';
import validatorMiddleware, { menuCreateValidation, menuDeleteValidation, menuListValidation, menuRetrieveValidation, menuUpdateValidation } from '../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("menu-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("menu-list", "Menu", "List"), 
  menuListValidation(), validatorMiddleware, 
  menuController().list
);

router.route("/create").post(
  rateLimiterMiddleware("menu-create", 60, 10), 
  authenticationMiddleware,
  menuCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  menuController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("menu-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("menu-retrieve", "Menu", "Retrieve"), 
  menuRetrieveValidation(), validatorMiddleware, 
  menuController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("menu-update", 60, 10), 
  authenticationMiddleware,
  menuUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  menuController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("menu-delete", 60, 10), 
  authenticationMiddleware,
  menuDeleteValidation(), validatorMiddleware, 
  menuController().delete
)

export const menuRouter = router;
