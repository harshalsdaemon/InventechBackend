import express from 'express';
import { UserModelType } from '../aMCR/aModel/bUserAdministration/aUserModel';


const generateCookie = async (code: 200 | 201, message: string, key: string, object: UserModelType | any, response: express.Response) => {

  // Create Token
  const token = object.getAuthenticationToken();

  // Cookie Options
  const options: express.CookieOptions = {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 *1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  }

  // Response
  response.cookie("AUTH_TOKEN_BY_ANKAS", token, options).status(code).json({
    success: true,
    message: message,
    [key]: object,
    token: token
  })
}

export default generateCookie;
