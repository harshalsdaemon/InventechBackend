import express from 'express'

import morganMiddleware from 'morgan'
import corsMiddleware from 'cors'
import bodyParserMiddleware from 'body-parser'
import cookieParserMiddleware from 'cookie-parser'
import compressionMiddleware from 'compression'

import errorMiddleware from '../bLove/bMiddleware/aErrorMiddleware'

import { baseManyToOneRouter } from '../bLove/aMCR/cRoute/aSetting/aBaseManyToOneRoute'
import { baseManyToManyRouter } from '../bLove/aMCR/cRoute/aSetting/bBaseManyToManyRoute'
import { baseRouter } from '../bLove/aMCR/cRoute/aSetting/cBaseRoute'
import { baseOneToOneRouter } from '../bLove/aMCR/cRoute/aSetting/dBaseOneToOneRoute'
import { baseOneToManyRouter } from '../bLove/aMCR/cRoute/aSetting/eBaseOneToManyRoute'

import { userRouter } from '../bLove/aMCR/cRoute/bUserAdministration/aUserRoute'
import { roleRouter } from '../bLove/aMCR/cRoute/bUserAdministration/bRoleRoute'
import { menuRouter } from '../bLove/aMCR/cRoute/bUserAdministration/cMenuRoute'

import { productRouter } from '../bLove/aMCR/cRoute/cKisna/aProductManagement/aProductRoute'
import { categoryRouter } from '../bLove/aMCR/cRoute/cKisna/aProductManagement/bCategoryRoute'
import { tagRouter } from '../bLove/aMCR/cRoute/cKisna/aProductManagement/cTagRoute'
import { productVariantRouter } from '../bLove/aMCR/cRoute/cKisna/aProductManagement/dProductvariantRoute'
import { optionRouter } from '../bLove/aMCR/cRoute/cKisna/aProductManagement/eOptionRoute'
import { groupRouter } from '../bLove/aMCR/cRoute/cKisna/aProductManagement/fGroupRoute'

import { questionRouter } from '../bLove/aMCR/cRoute/cHappify/aQuestionnaire/aQuestionRoute'
import { factorRouter } from '../bLove/aMCR/cRoute/cHappify/aQuestionnaire/bFactorRoute'

import { singleImageRouter } from '../bLove/aMCR/cRoute/zFreestyleSample/aSingleImageRoute'


const appConnection = express();

// Third Party Middleware
appConnection.use(morganMiddleware("dev"));
appConnection.use(corsMiddleware({
  origin: process.env.ENVIRONMENT === "Production" ?
    [
      "https://inventech-001.netlify.app",
    ] :
    [
      "http://localhost:5173",
      "http://localhost:5174",
    ], credentials: true
}));
appConnection.use(bodyParserMiddleware.urlencoded({ extended: true }));
appConnection.use(bodyParserMiddleware.json());
appConnection.use(cookieParserMiddleware());
appConnection.use(compressionMiddleware());

// Routing Middleware
appConnection.use("/api/v1/base-many-to-one/", baseManyToOneRouter);
appConnection.use("/api/v1/base-many-to-many/", baseManyToManyRouter);
appConnection.use("/api/v1/base/", baseRouter);
appConnection.use("/api/v1/base-one-to-one/", baseOneToOneRouter);
appConnection.use("/api/v1/base-one-to-many/", baseOneToManyRouter);

appConnection.use("/api/v1/user/", userRouter);
appConnection.use("/api/v1/role/", roleRouter);
appConnection.use("/api/v1/menu/", menuRouter);

appConnection.use("/api/v1/product/", productRouter);
appConnection.use("/api/v1/category/", categoryRouter);
appConnection.use("/api/v1/tag/", tagRouter);
appConnection.use("/api/v1/product-variant/", productVariantRouter);
appConnection.use("/api/v1/option/", optionRouter);
appConnection.use("/api/v1/group/", groupRouter);

appConnection.use("/api/v1/question/", questionRouter);
appConnection.use("/api/v1/factor/", factorRouter);

appConnection.use('/api/v1/single-image/', singleImageRouter);


// Error Middleware
appConnection.use(errorMiddleware);

export default appConnection;
