import express from 'express';
import factorController from '../../../bController/cHappify/aQuestionnaire/bFactorController';
import validatorMiddleware, { factorCreateValidation, factorDeleteValidation, factorListValidation, factorRetrieveValidation, factorUpdateValidation, questionCreateValidation, questionDeleteValidation, questionListValidation, questionRetrieveValidation, questionUpdateValidation } from '../../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("factor-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("factor-list", "Factor", "List"), 
  factorListValidation(), validatorMiddleware, 
  factorController().list
);

router.route("/create").post(
  rateLimiterMiddleware("factor-create", 60, 10), 
  authenticationMiddleware,
  factorCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  factorController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("factor-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("factor-retrieve", "Factor", "Retrieve"), 
  factorRetrieveValidation(), validatorMiddleware, 
  factorController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("factor-update", 60, 10), 
  authenticationMiddleware,
  factorUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  factorController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("factor-delete", 60, 10), 
  authenticationMiddleware,
  factorDeleteValidation(), validatorMiddleware, 
  factorController().delete
)

export const factorRouter = router;
