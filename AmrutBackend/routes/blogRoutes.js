// routes/blogRoutes.js
// routes/blogRoutes.js
import express from 'express';
import uploadProductPhoto from '../middlewares/multermiddleware.js';
import { createPostController, postPhotoController,getBlogController,getSingleBlogController,relatedBlogController } from '../controllers/blogController.js';
import { isAdmin, requireSignIn } from '../middlewares/authmiddleware.js';
const router = express.Router();
//post blog
router.post('/create-post', uploadProductPhoto,requireSignIn,isAdmin, createPostController);
//blog photo
router.get("/post-photo/:id",postPhotoController,uploadProductPhoto);
// get-all- blogs
router.get("/get-blog",getBlogController);
//get Single Blog
router.get("/get-blog/:title",getSingleBlogController);

// get related blog
router.get('/related/:blogId/:categoryId', relatedBlogController);

export default router;

