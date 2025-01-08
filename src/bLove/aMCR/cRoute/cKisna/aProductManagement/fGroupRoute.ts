import express from 'express';
import groupController from '../../../bController/cKisna/aProductManagement/fGroupController';
import validatorMiddleware, { groupCreateValidation, groupDeleteValidation, groupListValidation, groupRetrieveValidation, groupUpdateValidation } from '../../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("group-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("group-list", "Group", "List"), 
  groupListValidation(), validatorMiddleware, 
  groupController().list
);

router.route("/create").post(
  rateLimiterMiddleware("group-create", 60, 100), 
  authenticationMiddleware,
  groupCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  groupController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("group-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("group-retrieve", "Group", "Retrieve"), 
  groupRetrieveValidation(), validatorMiddleware, 
  groupController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("group-update", 60, 10), 
  authenticationMiddleware,
  groupUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  groupController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("group-delete", 60, 10), 
  authenticationMiddleware,
  groupDeleteValidation(), validatorMiddleware, 
  groupController().delete
)

export const groupRouter = router;
