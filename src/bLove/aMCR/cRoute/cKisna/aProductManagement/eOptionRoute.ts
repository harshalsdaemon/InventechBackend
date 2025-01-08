import express from 'express';
import optionController from '../../../bController/cKisna/aProductManagement/eOptionController';
import validatorMiddleware, { optionCreateValidation, optionDeleteValidation, optionListValidation, optionRetrieveValidation, optionUpdateValidation } from '../../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("option-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("option-list", "Option", "List"), 
  optionListValidation(), validatorMiddleware, 
  optionController().list
);

router.route("/create").post(
  rateLimiterMiddleware("option-create", 60, 100), 
  authenticationMiddleware,
  optionCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  optionController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("option-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("option-retrieve", "Option", "Retrieve"), 
  optionRetrieveValidation(), validatorMiddleware, 
  optionController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("option-update", 60, 10), 
  authenticationMiddleware,
  optionUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  optionController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("option-delete", 60, 10), 
  authenticationMiddleware,
  optionDeleteValidation(), validatorMiddleware, 
  optionController().delete
)

export const optionRouter = router;
