import express from "express";
import Razorpay from 'razorpay';
import crypto from 'crypto';

import { requireSignIn, isAdmin } from "../middlewares/authmiddleware.js";
import { createProductController,updateProductController } from "../controllers/ProductController.js";
import {
  
  getProductController,
  getsingleProductController,
  productPhotoController,
  deleteProductController,
  productCountController,
  productFilterController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  createOrderController,
  getProductCommentsController,
  razorPayVerifyController,
 
  // createPyamentRazor,
  // razorPayVerifyController
} from "../controllers/ProductController.js";
import uploadProductPhoto from "../middlewares/multermiddleware.js";
const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  uploadProductPhoto,
  createProductController
);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  uploadProductPhoto,
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single products

router.get("/get-product/:slug", getsingleProductController);

//get photo
router.get("/product-photo/:pid", uploadProductPhoto, productPhotoController);

//delete producr
router.delete("/delete-product/:pid", deleteProductController);
// filter
router.post("/product-filter",productFilterController);
//product-count
router.get("/product-count" ,productCountController);
//pagination
router.get("/product-list/:page",productListController);
//search-product
router.get("/search/:keyword",searchProductController);
//similar products
router.get("/related-product/:pid/:c/:id",relatedProductController);
//category-wise product
router.get("/product-category/:name",productCategoryController);
//commnets related to specific proudcts

router.get('/products/:productId/comments', getProductCommentsController);

//payment routes
//token
router.get("/braintree/token",braintreeTokenController)
//payment
router.post("/braintree/payment",requireSignIn,createOrderController)

// razorpay

// createorder
// router.post("/razor/orders",requireSignIn,createPyamentRazor)

//payment verify
router.post("/razor/verify",razorPayVerifyController)

export default router;


