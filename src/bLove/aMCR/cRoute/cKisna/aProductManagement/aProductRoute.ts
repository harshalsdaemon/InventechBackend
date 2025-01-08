import express from 'express';
import productController from '../../../bController/cKisna/aProductManagement/aProductController';
import validatorMiddleware, { productCreateValidation, productDeleteValidation, productListValidation, productRetrieveValidation, productUpdateValidation } from '../../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("product-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("product-list", "Product", "List"), 
  productListValidation(), validatorMiddleware, 
  productController().list
);

router.route("/create").post(
  rateLimiterMiddleware("product-create", 60, 10), 
  authenticationMiddleware,
  productCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  productController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("product-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("product-retrieve", "Product", "Retrieve"), 
  productRetrieveValidation(), validatorMiddleware, 
  productController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("product-update", 60, 10), 
  authenticationMiddleware,
  productUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  productController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("product-delete", 60, 10), 
  authenticationMiddleware,
  productDeleteValidation(), validatorMiddleware, 
  productController().delete
)

export const productRouter = router;
