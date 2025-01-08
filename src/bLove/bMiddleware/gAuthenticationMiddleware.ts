import express from 'express';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

import catchAsyncMiddleware from './bCatchAsyncMiddleware';
import ErrorUtility from '../cUtility/aErrorUtility';
import { UserModel } from '../aMCR/aModel/bUserAdministration/aUserModel';


const authenticationMiddleware = catchAsyncMiddleware(
  async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    // Get Token from Cookie
    const { AUTH_TOKEN_BY_ANKAS: token } = request.cookies;

    // Not Found
    if (!token || token === "j:null") {
      return next(new ErrorUtility("Please login to access this resource", 401));
    }

    // Decode Token
    const decodedData: JwtPayload | string = jsonwebtoken.verify(
      token,
      "THIS_IS_SOME_SECRET_KEY"
    );

    // Ensure decodedData is a JwtPayload and has an id
    let userId: string | undefined;
    if (typeof decodedData !== 'string' && decodedData.id) {
      userId = decodedData.id as string;
    } else {
      return next(new ErrorUtility("Invalid token", 401));
    }

    // Retrieve User
    const user = await UserModel.findById(userId);

    // console.log("Helllo...", user)

    if (!user) {
      return next(new ErrorUtility("User is removed", 401));
    }

    // Save User ID in Request
    (request as any).user = user._id;

    next();
  }
);

export default authenticationMiddleware;
