import express from 'express';
import baseOneToOneController from '../../bController/aSetting/dBaseOneToOneController';
import validatorMiddleware, { baseOneToOneCreateValidation, baseOneToOneDeleteValidation, baseOneToOneListValidation, baseOneToOneRetrieveValidation, baseOneToOneUpdateValidation } from '../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("baseonetoone-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("baseonetoone-list", "BaseOneToOne", "List"), 
  baseOneToOneListValidation(), validatorMiddleware, 
  baseOneToOneController().list
);

router.route("/create").post(
  rateLimiterMiddleware("baseonetoone-create", 60, 10), 
  authenticationMiddleware,
  baseOneToOneCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  baseOneToOneController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("baseonetoone-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("baseonetoone-retrieve", "BaseOneToOne", "Retrieve"), 
  baseOneToOneRetrieveValidation(), validatorMiddleware, 
  baseOneToOneController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("baseonetoone-update", 60, 10), 
  authenticationMiddleware,
  baseOneToOneUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  baseOneToOneController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("baseonetoone-delete", 60, 10), 
  authenticationMiddleware,
  baseOneToOneDeleteValidation(), validatorMiddleware, 
  baseOneToOneController().delete
)

export const baseOneToOneRouter = router;
