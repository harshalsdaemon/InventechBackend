import express from 'express';
import baseManyToOneController from '../../bController/aSetting/aBaseManyToOneController';
import validatorMiddleware, { baseManyToOneCreateValidation, baseManyToOneDeleteValidation, baseManyToOneListValidation, baseManyToOneRetrieveValidation, baseManyToOneUpdateValidation } from '../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("basemanytoone-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("basemanytoone-list", "BaseManyToOne", "List"), 
  baseManyToOneListValidation(), validatorMiddleware, 
  baseManyToOneController().list
);

router.route("/create").post(
  rateLimiterMiddleware("basemanytoone-create", 60, 10), 
  authenticationMiddleware,
  baseManyToOneCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  baseManyToOneController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("basemanytoone-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("basemanytoone-retrieve", "BaseManyToOne", "Retrieve"), 
  baseManyToOneRetrieveValidation(), validatorMiddleware, 
  baseManyToOneController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("basemanytoone-update", 60, 10), 
  authenticationMiddleware,
  baseManyToOneUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  baseManyToOneController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("basemanytoone-delete", 60, 10), 
  authenticationMiddleware,
  baseManyToOneDeleteValidation(), validatorMiddleware, 
  baseManyToOneController().delete
)

export const baseManyToOneRouter = router;
