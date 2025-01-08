import express from 'express';
import roleController from '../../bController/bUserAdministration/bRoleController';
import validatorMiddleware, { roleCreateValidation, roleDeleteValidation, roleListValidation, roleRetrieveValidation, roleUpdateValidation } from '../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("role-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("role-list", "Role", "List"), 
  roleListValidation(), validatorMiddleware, 
  roleController().list
);

router.route("/create").post(
  rateLimiterMiddleware("role-create", 60, 10), 
  authenticationMiddleware,
  roleCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  roleController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("role-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("role-retrieve", "role", "Retrieve"), 
  roleRetrieveValidation(), validatorMiddleware, 
  roleController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("role-update", 60, 10), 
  authenticationMiddleware,
  roleUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  roleController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("role-delete", 60, 10), 
  authenticationMiddleware,
  roleDeleteValidation(), validatorMiddleware, 
  roleController().delete
)

export const roleRouter = router;
