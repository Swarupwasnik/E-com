
import express from 'express';
// import { registerController,updateProfileController, loginController, testController, forgotPasswordController,getOrderController,updateProfileController} from  "../controllers/authController.js";
import { registerController, orderStatusController,updateProfileController, loginController, testController, forgotPasswordController, getOrderController,getAllOrderController } from  "../controllers/authController.js"

import { isAdmin, requireSignIn } from '../middlewares/authmiddleware.js';

const router = express.Router();

// Define routes
router.post('/register', (req, res) => {
    registerController(req, res);
});

router.post("/login", (req, res) => {
    loginController(req, res);
});

router.post('/forgot-password', (req, res) => {
    forgotPasswordController(req, res);
});

router.get("/test", requireSignIn, isAdmin, (req, res) => {
    testController(req, res);
});

router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});
//update profile
router.put("/profile",requireSignIn,updateProfileController);

//orders
router.get("/orders",requireSignIn,getOrderController)

//get admin all orders
router.get("/all-orders",requireSignIn , isAdmin ,getAllOrderController)
//order status Update
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)

export default router;
