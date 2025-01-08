import express from 'express';
import baseOneToManyController from '../../bController/aSetting/eBaseOneToManyController';
import validatorMiddleware, { baseOneToManyCreateValidation, baseOneToManyDeleteValidation, baseOneToManyListValidation, baseOneToManyRetrieveValidation, baseOneToManyUpdateValidation } from '../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("baseonetomany-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("baseonetomany-list", "BaseOneToMany", "List"), 
  baseOneToManyListValidation(), validatorMiddleware, 
  baseOneToManyController().list
);

router.route("/create").post(
  rateLimiterMiddleware("baseonetomany-create", 60, 10), 
  authenticationMiddleware,
  baseOneToManyCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  baseOneToManyController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("baseonetomany-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("baseonetomany-retrieve", "BaseOneToMany", "Retrieve"), 
  baseOneToManyRetrieveValidation(), validatorMiddleware, 
  baseOneToManyController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("baseonetomany-update", 60, 10), 
  authenticationMiddleware,
  baseOneToManyUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  baseOneToManyController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("baseonetomany-delete", 60, 10), 
  authenticationMiddleware,
  baseOneToManyDeleteValidation(), validatorMiddleware, 
  baseOneToManyController().delete
)

export const baseOneToManyRouter = router;
