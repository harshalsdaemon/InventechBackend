import express from 'express';
import tagController from '../../../bController/cKisna/aProductManagement/cTagController';
import validatorMiddleware, { tagCreateValidation, tagDeleteValidation, tagListValidation, tagRetrieveValidation, tagUpdateValidation } from '../../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("tag-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("tag-list", "Tag", "List"), 
  tagListValidation(), validatorMiddleware, 
  tagController().list
);

router.route("/create").post(
  rateLimiterMiddleware("tag-create", 60, 10), 
  authenticationMiddleware,
  tagCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  tagController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("tag-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("tag-retrieve", "Tag", "Retrieve"), 
  tagRetrieveValidation(), validatorMiddleware, 
  tagController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("tag-update", 60, 10), 
  authenticationMiddleware,
  tagUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  tagController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("tag-delete", 60, 10), 
  authenticationMiddleware,
  tagDeleteValidation(), validatorMiddleware, 
  tagController().delete
)

export const tagRouter = router;
