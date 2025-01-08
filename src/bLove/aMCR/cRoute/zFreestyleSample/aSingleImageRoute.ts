import express from "express";
import { singleImageCreateController, singleImageDeleteController, singleImageListController, singleImageRetrieveController, singleImageUpdateController } from "../../../bMiddleware/iMulterMiddleware";


const router = express.Router();

router.post("/list", singleImageListController);
router.post("/create", singleImageCreateController);
router.post("/retrieve", singleImageRetrieveController);
router.post("/update", singleImageUpdateController);  
router.post("/delete", singleImageDeleteController);  

export const singleImageRouter =  router;
