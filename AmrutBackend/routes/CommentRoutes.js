import express from 'express';
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";
import { createCommentController,getAllCommentsController,getProductCommentsController } from '../controllers/CommentController.js';

const router = express.Router();

router.post("/create-review",requireSignIn,createCommentController);

 router.get('/product/:productId/comments', getProductCommentsController);

router.get('/comments', getAllCommentsController);


export default router;
