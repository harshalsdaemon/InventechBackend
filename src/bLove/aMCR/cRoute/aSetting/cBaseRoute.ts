import express from 'express';
import baseController from '../../bController/aSetting/cBaseController';
import validatorMiddleware, { baseCreateValidation, baseDeleteValidation, baseListValidation, baseRetrieveValidation, baseUpdateValidation } from '../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("base-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("base-list", "Base", "List"), 
  baseListValidation(), validatorMiddleware, 
  baseController().list
);

router.route("/create").post(
  rateLimiterMiddleware("base-create", 60, 10), 
  authenticationMiddleware,
  baseCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  baseController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("base-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("base-retrieve", "Base", "Retrieve"), 
  baseRetrieveValidation(), validatorMiddleware, 
  baseController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("base-update", 60, 10), 
  authenticationMiddleware,
  baseUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  baseController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("base-delete", 60, 10), 
  authenticationMiddleware,
  baseDeleteValidation(), validatorMiddleware, 
  baseController().delete
)

export const baseRouter = router;
