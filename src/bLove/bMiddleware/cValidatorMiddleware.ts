import express from 'express';
import crypto from 'crypto';
import mongoose, { isValidObjectId } from 'mongoose';
import { body, param, validationResult } from 'express-validator';

import ErrorUtility from '../../bLove/cUtility/aErrorUtility';
import { BaseManyToOneModel } from '../aMCR/aModel/aSetting/aBaseManyToOneModel';
import { BaseManyToManyModel } from '..//aMCR/aModel/aSetting/bBaseManyToManyModel';
import { BaseModel } from '../aMCR/aModel/aSetting/cBaseModel';
import { BaseOneToOneModel } from '../aMCR/aModel/aSetting/dBaseOneToOneModel';
import { BaseOneToManyModel } from '../aMCR/aModel/aSetting/eBaseOneToManyModel';
import { UserModel } from '../aMCR/aModel/bUserAdministration/aUserModel';
import { MenuModel } from '../aMCR/aModel/bUserAdministration/cMenuModel';
import { RoleModel } from '../aMCR/aModel/bUserAdministration/bRoleModel';

import { ProductModel } from '../aMCR/aModel/cKisna/aProductManagement/aProductModel';
import { CategoryModel } from '../aMCR/aModel/cKisna/aProductManagement/bCategoryModel';
import { TagModel } from '../aMCR/aModel/cKisna/aProductManagement/cTagModel';
import { ProductVariantModel } from '../aMCR/aModel/cKisna/aProductManagement/dProductVariantModel';
import { OptionModel } from '../aMCR/aModel/cKisna/aProductManagement/eOptionModel';
import { GroupModel } from '../aMCR/aModel/cKisna/aProductManagement/fGroupModel';

import { QuestionModel } from '../aMCR/aModel/cHappify/aQuestionnaire/aQuestionModel';
import { FactorModel } from '../aMCR/aModel/cHappify/aQuestionnaire/bFactorModel';


const validatorMiddleware = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  const errors = validationResult(request)

  const joinErrors = errors
    .array()
    .map(each => each.msg)
    .join(". ")

  if (errors.isEmpty()) return next();
  else return next(new ErrorUtility(joinErrors, 400));
}

// BaseManyToOne
const baseManyToOneListValidation = () => []

const baseManyToOneCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
  body("cBase")
    .notEmpty().withMessage("Please select base")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Base", 400);
        }
  
        const retrieve = await BaseModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Base Not Found", 404);
      }));
      return true;
    }),
]

const baseManyToOneRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseManyToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

const baseManyToOneUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await BaseManyToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
  body("cBase")
    .notEmpty().withMessage("Please select base")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Base", 400);
        }
  
        const retrieve = await BaseModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Base Not Found", 404);
      }));
      return true;
    }),
]

const baseManyToOneDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseManyToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

// BaseManyToMany
const baseManyToManyListValidation = () => []

const baseManyToManyCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
  body("cBase")
    .notEmpty().withMessage("Please select base")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Base", 400);
        }
  
        const retrieve = await BaseModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Base Not Found", 404);
      }));
      return true;
    }),
]

const baseManyToManyRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseManyToManyModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

const baseManyToManyUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await BaseManyToManyModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
  body("cBase")
    .notEmpty().withMessage("Please select base")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Base", 400);
        }
  
        const retrieve = await BaseModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Base Not Found", 404);
      }));
      return true;
    }),
]

const baseManyToManyDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseManyToManyModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

// Base
const baseListValidation = () => []

const baseCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
  body("cBaseOneToOne")
    .notEmpty().withMessage("Please select base one to one")
    .isMongoId().withMessage("Invalid MongoDB ID format for Base One To One")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await BaseOneToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base One To One Not Found", 404)
      return true;
    }),
  body("cBaseOneToMany")
    .notEmpty().withMessage("Please select base one to many")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Base One To Many", 400);
        }
  
        const retrieve = await BaseOneToManyModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Base One To Many Not Found", 404);
      }));
      return true;
    }),
  body("cBaseManyToOne")
    .notEmpty().withMessage("Please select base many to one")
    .isMongoId().withMessage("Invalid MongoDB ID format for Base Many To One")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await BaseManyToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Many To One Not Found", 404)
      return true;
    }),
  body("cBaseManyToMany")
    .notEmpty().withMessage("Please select base many to many")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Base Many To Many", 400);
        }
  
        const retrieve = await BaseManyToManyModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Base Many To Many Not Found", 404);
      }));
      return true;
    }),
]

const baseRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
]

const baseUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await BaseModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
  body("cBaseOneToOne")
    .notEmpty().withMessage("Please select base one to one")
    .isMongoId().withMessage("Invalid MongoDB ID format for Base One To One")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await BaseOneToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base One To One Not Found", 404)
      return true;
    }),
  body("cBaseOneToMany")
    .notEmpty().withMessage("Please select base one to many")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Base One To Many", 400);
        }
  
        const retrieve = await BaseOneToManyModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Base One To Many Not Found", 404);
      }));
      return true;
    }),
  body("cBaseManyToOne")
    .notEmpty().withMessage("Please select base many to one")
    .isMongoId().withMessage("Invalid MongoDB ID format for Base Many To One")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await BaseManyToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Many To One Not Found", 404)
      return true;
    }),
  body("cBaseManyToMany")
    .notEmpty().withMessage("Please select base many to many")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Base Many To Many", 400);
        }
  
        const retrieve = await BaseManyToManyModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Base Many To Many Not Found", 404);
      }));
      return true;
    }),
]

const baseDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

// BaseOneToOne
const baseOneToOneListValidation = () => []

const baseOneToOneCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
  body("cBase")
    .notEmpty().withMessage("Please select base")
    .isMongoId().withMessage("Invalid MongoDB ID format for Base")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await BaseModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
]

const baseOneToOneRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseOneToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

const baseOneToOneUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await BaseOneToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
  body("cBase")
    .notEmpty().withMessage("Please select base")
    .isMongoId().withMessage("Invalid MongoDB ID format for Base")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await BaseModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
]

const baseOneToOneDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseOneToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

// BaseOneToMany
const baseOneToManyListValidation = () => []

const baseOneToManyCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
  body("cBase")
    .notEmpty().withMessage("Please select base")
    .isMongoId().withMessage("Invalid MongoDB ID format for Base")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await BaseModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
]

const baseOneToManyRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseOneToManyModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

const baseOneToManyUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await BaseOneToManyModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
  body("cBase")
    .notEmpty().withMessage("Please select base")
    .isMongoId().withMessage("Invalid MongoDB ID format for Base")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await BaseModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
]

const baseOneToManyDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseOneToManyModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

// User
const userListValidation = () => []

const userCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter Title")
]

const userRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please enter valid parameter", 404);
      return true;
    })
    .custom(async value => {
      const retrieve = await UserModel.findById(value);
      if (!retrieve) throw new ErrorUtility("User Not Found", 404);
      return true;
    })
]

const userUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please enter valid parameter", 404);
      return true;
    })
    .custom(async value => {
      const retrieve = await UserModel.findById(value);
      if (!retrieve) throw new ErrorUtility("User Not Found", 404);
      return true;
    })
]

const userDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please enter valid parameter", 404);
      return true;
    })
    .custom(async value => {
      const retrieve = await UserModel.findById(value);
      if (!retrieve) throw new ErrorUtility("User Not Found", 404);
      return true;
    })
]

const userLoginValidation = () => [
  body("eEmail")
    .notEmpty().withMessage("Please enter email")
    .isEmail().withMessage("Please enter valid email")
    .custom(async value => {
      const retrieve = await UserModel.findOne({eEmail: value});
      if (!retrieve) throw new ErrorUtility("Invalid Email or Password", 401);
      return true;
    }),
  body("ePassword")
    .notEmpty().withMessage("Please enter password")
    .custom(async (value, { req: request }) => {
      const retrieve = await UserModel.findOne({eEmail: request.body.eEmail}).select("+ePassword");
      if (retrieve) {
        const isMatch = await retrieve.comparePassword(value);
        if (!isMatch) throw new ErrorUtility("Invalid Email or Password", 401)
      };
      return true;
    }),
]

const userRegisterValidation = () => [
  body("eFirstname")
    .notEmpty().withMessage("Please enter firstname"),
  body("eLastname")
    .notEmpty().withMessage("Please enter lastname"),  
  body("eEmail")
    .notEmpty().withMessage("Please enter email")
    .isEmail().withMessage("Please enter valid email")
    .custom(async value => {
      const retrieve = await UserModel.findOne({eEmail: value});
      if (retrieve) throw new ErrorUtility("User Already Exists...", 401);
      return true;
    }),
  body("eMobile")
    .notEmpty().withMessage("Please enter mobile"),  
  body("ePassword")
    .notEmpty().withMessage("Please enter password"),  
]

const userForgotPasswordValidation = () => [
  body("eEmail")
  .notEmpty().withMessage("Please enter email")
  .isEmail().withMessage("Please enter valid email")
  .custom(async value => {
    const retrieve = await UserModel.findOne({eEmail: value});
    if (!retrieve) throw new ErrorUtility("User Not Found", 401);
    return true;
  }),
]

const userResetPasswordValidation = () => [
  param("token")
    .notEmpty().withMessage("Reset token is required")
    .isHexadecimal().withMessage("Reset token must be a valid hexadecimal string")
    .custom(async (token) => {
			const resetToken = crypto.createHash("sha256").update(token).digest("hex");
      const retrieve = await UserModel.findOne({
        eResetPasswordToken: resetToken,
        eResetPasswordTokenExpire: { $gt: Date.now() }
      });
      if (!retrieve) throw new ErrorUtility('Reset password link is invalid or has expired', 400);
      return true;
    }),
  body("ePassword")
    .notEmpty().withMessage("Please enter password"),  
  body("eConfirmPassword")
    .notEmpty().withMessage("Please enter confirm password"),  
]

const userLogoutValidation = () => []

const userProfileRetrieveValidation = () => []

const userProfileUpdateValidation = () => []

const userProfilePasswordUpdateValidation = () => []

const userProfileDeleteValidation = () => []

// Role
const roleListValidation = () => []

const roleCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title")
]

const roleRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await RoleModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Role Not Found", 404)
      return true;
    })
]

const roleUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await RoleModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Role Not Found", 404)
      return true;
    })
]

const roleDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await RoleModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Role Not Found", 404)
      return true;
    })
]

// Menu
const menuListValidation = () => []

const menuCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title")
]

const menuRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await MenuModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Menu Not Found", 404)
      return true;
    })
]

const menuUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await MenuModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Menu Not Found", 404)
      return true;
    })
]

const menuDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await MenuModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Menu Not Found", 404)
      return true;
    })
]

// Kisna
// Product
const productListValidation = () => []

const productCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
  body("cCategory")
    .notEmpty().withMessage("Please select category")
    .isMongoId().withMessage("Invalid MongoDB ID format for Category")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await CategoryModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Category Not Found", 404)
      return true;
    }),
  body("cTag")
    .notEmpty().withMessage("Please select tag")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Tag", 400);
        }
  
        const retrieve = await TagModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Tag Not Found", 404);
      }));
      return true;
    }),

]

const productRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await ProductModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Product Not Found", 404)
      return true;
    })
]

const productUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await ProductModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Product Not Found", 404)
      return true;
    }),
  body("cCategory")
    .notEmpty().withMessage("Please select category")
    .isMongoId().withMessage("Invalid MongoDB ID format for Category")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await CategoryModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Category Not Found", 404)
      return true;
    }),
  body("cTag")
    .notEmpty().withMessage("Please select tag")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Tag", 400);
        }
  
        const retrieve = await TagModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Tag Not Found", 404);
      }));
      return true;
    }),

]

const productDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await ProductModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Product Not Found", 404)
      return true;
    })
]

// Category
const categoryListValidation = () => []

const categoryCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title")
]

const categoryRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await CategoryModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Category Not Found", 404)
      return true;
    })
]

const categoryUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await CategoryModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Category Not Found", 404)
      return true;
    })
]

const categoryDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await CategoryModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Category Not Found", 404)
      return true;
    })
]

// Tag
const tagListValidation = () => []

const tagCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title")
]

const tagRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await TagModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Tag Not Found", 404)
      return true;
    })
]

const tagUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await TagModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Tag Not Found", 404)
      return true;
    })
]

const tagDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await TagModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Tag Not Found", 404)
      return true;
    })
]

// Product Variant
const productVariantListValidation = () => []

const productVariantCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title")
]

const productVariantRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await ProductVariantModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Product Variant Not Found", 404)
      return true;
    })
]

const productVariantUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await ProductVariantModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Product Variant Not Found", 404)
      return true;
    })
]

const productVariantDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await ProductVariantModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Product Variant Not Found", 404)
      return true;
    })
]

// Option
const optionListValidation = () => []

const optionCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title")
]

const optionRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await OptionModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Option Not Found", 404)
      return true;
    })
]

const optionUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await OptionModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Option Not Found", 404)
      return true;
    })
]

const optionDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await OptionModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Option Not Found", 404)
      return true;
    })
]

// Group
const groupListValidation = () => []

const groupCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title")
]

const groupRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await GroupModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Group Not Found", 404)
      return true;
    })
]

const groupUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await GroupModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Group Not Found", 404)
      return true;
    })
]

const groupDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await GroupModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Group Not Found", 404)
      return true;
    })
]

// Happify
// Question
const questionListValidation = () => []

const questionCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
]

const questionRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await QuestionModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Question Not Found", 404)
      return true;
    }),
]

const questionUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await QuestionModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Question Not Found", 404)
      return true;
    }),
]

const questionDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await QuestionModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Question Not Found", 404)
      return true;
    })
]

// Factor
const factorListValidation = () => []

const factorCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
]

const factorRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await FactorModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Factor Not Found", 404)
      return true;
    }),
]

const factorUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await FactorModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Factor Not Found", 404)
      return true;
    }),
]

const factorDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await FactorModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Factor Not Found", 404)
      return true;
    })
]


export default validatorMiddleware;
export {
  baseManyToOneListValidation,
  baseManyToOneCreateValidation,
  baseManyToOneRetrieveValidation,
  baseManyToOneUpdateValidation,
  baseManyToOneDeleteValidation,

  baseManyToManyListValidation,
  baseManyToManyCreateValidation,
  baseManyToManyRetrieveValidation,
  baseManyToManyUpdateValidation,
  baseManyToManyDeleteValidation,

  baseListValidation,
  baseCreateValidation,
  baseRetrieveValidation,
  baseUpdateValidation,
  baseDeleteValidation,

  baseOneToOneListValidation,
  baseOneToOneCreateValidation,
  baseOneToOneRetrieveValidation,
  baseOneToOneUpdateValidation,
  baseOneToOneDeleteValidation,

  baseOneToManyListValidation,
  baseOneToManyCreateValidation,
  baseOneToManyRetrieveValidation,
  baseOneToManyUpdateValidation,
  baseOneToManyDeleteValidation,

  userListValidation,
  userCreateValidation,
  userRetrieveValidation,
  userUpdateValidation,
  userDeleteValidation,
  userLoginValidation,
  userRegisterValidation,
  userForgotPasswordValidation,
  userResetPasswordValidation,
  userLogoutValidation,
  userProfileRetrieveValidation,
  userProfileUpdateValidation,
  userProfilePasswordUpdateValidation,
  userProfileDeleteValidation,

  roleListValidation,
  roleCreateValidation,
  roleRetrieveValidation,
  roleUpdateValidation,
  roleDeleteValidation,

  menuListValidation,
  menuCreateValidation,
  menuRetrieveValidation,
  menuUpdateValidation,
  menuDeleteValidation,

  // Kisna
  productListValidation,
  productCreateValidation,
  productRetrieveValidation,
  productUpdateValidation,
  productDeleteValidation,

  categoryListValidation,
  categoryCreateValidation,
  categoryRetrieveValidation,
  categoryUpdateValidation,
  categoryDeleteValidation,

  tagListValidation,
  tagCreateValidation,
  tagRetrieveValidation,
  tagUpdateValidation,
  tagDeleteValidation,

  productVariantListValidation,
  productVariantCreateValidation,
  productVariantRetrieveValidation,
  productVariantUpdateValidation,
  productVariantDeleteValidation,

  optionListValidation,
  optionCreateValidation,
  optionRetrieveValidation,
  optionUpdateValidation,
  optionDeleteValidation,

  groupListValidation,
  groupCreateValidation,
  groupRetrieveValidation,
  groupUpdateValidation,
  groupDeleteValidation,

  // Happify
  questionListValidation,
  questionCreateValidation,
  questionRetrieveValidation,
  questionUpdateValidation,
  questionDeleteValidation,

  factorListValidation,
  factorCreateValidation,
  factorRetrieveValidation,
  factorUpdateValidation,
  factorDeleteValidation,
  
}
