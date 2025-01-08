import express from 'express';
import productVariantController from '../../../bController/cKisna/aProductManagement/dProductVariantController';
import validatorMiddleware, { productVariantCreateValidation, productVariantDeleteValidation, productVariantListValidation, productVariantRetrieveValidation, productVariantUpdateValidation } from '../../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("productvariant-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("productvariant-list", "ProductVariant", "List"), 
  productVariantListValidation(), validatorMiddleware, 
  productVariantController().list
);

router.route("/create").post(
  rateLimiterMiddleware("productvariant-create", 60, 100), 
  authenticationMiddleware,
  productVariantCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  productVariantController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("productvariant-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("productvariant-retrieve", "ProductVariant", "Retrieve"), 
  productVariantRetrieveValidation(), validatorMiddleware, 
  productVariantController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("productvariant-update", 60, 10), 
  authenticationMiddleware,
  productVariantUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  productVariantController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("productvariant-delete", 60, 10), 
  authenticationMiddleware,
  productVariantDeleteValidation(), validatorMiddleware, 
  productVariantController().delete
)

export const productVariantRouter = router;
