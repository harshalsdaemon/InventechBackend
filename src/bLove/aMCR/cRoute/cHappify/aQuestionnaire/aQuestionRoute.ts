import express from 'express';
import questionController from '../../../bController/cHappify/aQuestionnaire/aQuestionController';
import validatorMiddleware, { questionCreateValidation, questionDeleteValidation, questionListValidation, questionRetrieveValidation, questionUpdateValidation } from '../../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("question-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("question-list", "Question", "List"), 
  questionListValidation(), validatorMiddleware, 
  questionController().list
);

router.route("/create").post(
  rateLimiterMiddleware("question-create", 60, 10), 
  authenticationMiddleware,
  questionCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  questionController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("question-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("question-retrieve", "Question", "Retrieve"), 
  questionRetrieveValidation(), validatorMiddleware, 
  questionController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("question-update", 60, 10), 
  authenticationMiddleware,
  questionUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  questionController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("question-delete", 60, 10), 
  authenticationMiddleware,
  questionDeleteValidation(), validatorMiddleware, 
  questionController().delete
)

export const questionRouter = router;
