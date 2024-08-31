import express from "express";
import {isAdmin,requireSignIn} from "../middlewares/authmiddleware.js";
import {createJobController,updateJobController,getAlljobController, searchJobsController,searchJobsByCityController,getSingleJobController} from "../controllers/carrerController.js";
const router = express.Router();
//post job
router.post("/create-job",requireSignIn,isAdmin,createJobController);

//update the job

router.put('/update-job/:jobId', updateJobController,requireSignIn,isAdmin);


// get all jobs
router.get('/jobs', getAlljobController);

// searchJobsController

router.get('/jobs/search/:query', searchJobsController);
//Single Job Conntroller
router.get('/single-job/:_id', getSingleJobController);


// Define route for searching job postings by city
router.get('/jobs/search/city/:city', searchJobsByCityController)

export default router;