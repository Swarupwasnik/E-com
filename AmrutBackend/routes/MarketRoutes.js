import express from 'express';

import { createMarketController,deleteMarketController,updateMarketController,getAllMarketController } from '../controllers/marketController.js';
import { isAdmin, requireSignIn } from '../middlewares/authmiddleware.js';

 const router = express.Router();

 //Routes for Market-place
 router.post("/create-market",requireSignIn,isAdmin,createMarketController);
//delete market
router.delete("/delete-market/:_id",requireSignIn,isAdmin,deleteMarketController);

// update market

router.put("/update-market/:_id",updateMarketController,requireSignIn,isAdmin);
//get all market
router.get("/get-market",getAllMarketController)

export default router;
