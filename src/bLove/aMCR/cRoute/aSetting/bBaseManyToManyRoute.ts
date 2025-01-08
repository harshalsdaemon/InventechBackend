import express from 'express';
import baseManyToManyController from '../../bController/aSetting/bBaseManyToManyController';
import validatorMiddleware, { baseManyToManyCreateValidation, baseManyToManyDeleteValidation, baseManyToManyListValidation, baseManyToManyRetrieveValidation, baseManyToManyUpdateValidation } from '../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("basemanytomany-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("basemanytomany-list", "BaseManyToMany", "List"), 
  baseManyToManyListValidation(), validatorMiddleware, 
  baseManyToManyController().list
);

router.route("/create").post(
  rateLimiterMiddleware("basemanytomany-create", 60, 10), 
  authenticationMiddleware,
  baseManyToManyCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  baseManyToManyController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("basemanytomany-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("basemanytomany-retrieve", "BaseManyToMany", "Retrieve"), 
  baseManyToManyRetrieveValidation(), validatorMiddleware, 
  baseManyToManyController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("basemanytomany-update", 60, 10), 
  authenticationMiddleware,
  baseManyToManyUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  baseManyToManyController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("basemanytomany-delete", 60, 10), 
  authenticationMiddleware,
  baseManyToManyDeleteValidation(), validatorMiddleware, 
  baseManyToManyController().delete
)

export const baseManyToManyRouter = router;
