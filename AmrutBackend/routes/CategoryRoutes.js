import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";
import { createCategoryController } from "../controllers/categoryController.js";
import { updateCategoryController } from "../controllers/categoryController.js";
import { categoryController } from "../controllers/categoryController.js";
import { singleCategoryController } from "../controllers/categoryController.js";
import { deleteCategoryController } from "../controllers/categoryController.js";
const router = express.Router();

// Routes
router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

//update category
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController);

//get all Category
router.get("/get-category",categoryController)  ;

//Signe category
router.get("/single-category/:id", singleCategoryController)
//deletecategory
router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController)

export default router;
