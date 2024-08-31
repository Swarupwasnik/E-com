import CarrerModel from '../models/CarrerModel.js';

// export const createJobController = async (req, res) => {
//   console.log("req.body from job controller", req.body);

//   try {
//     const { jobTitle, company, location, description, appliedOn } = req.body;

//     // Validations
//     if (!jobTitle || !company || !location || !description) {
//       return res.status(400).send({ error: "All fields are required" });
//     }

//     // Set the status to 'open' for new job postings
//     const status = 'open';

//     // Create job posting instance
//     const jobPosting = new CarrerModel({
//       jobTitle,
//       company,
//       location,
//       description,
//       appliedOn: new Date(), // Set appliedOn date to current date
//       postedOn: new Date(), // Set postedOn date to current date
//       status // Include the status in the job posting object
//     });

//     console.log("jobPosting", jobPosting);

//     // Save job posting to the database
//     await jobPosting.save();

//     // Send success response
//     res.status(201).send({
//       success: true,
//       message: "Job Posting Created Successfully",
//       jobPosting,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       success: false,
//       error: error.message,
//       message: "Error in Create Job Posting",
//     });
//   }
// };





export const createJobController = async (req, res) => {
  console.log("req.body from job controller", req.body);

  try {
    const { jobTitle, company, location, description, appliedOn, education, experience, jobNature, salary, requiredKnowledge } = req.body;

    // Validations
    if (!jobTitle || !company || !location || !description || !education || !experience || !jobNature || !salary || !requiredKnowledge) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Set the status to 'open' for new job postings
    const status = 'open';

    // Create job posting instance
    const jobPosting = new CarrerModel({
      jobTitle,
      company,
      location,
      description,
      appliedOn: appliedOn || new Date(), // Set appliedOn date to current date if not provided
      postedOn: new Date(), // Set postedOn date to current date
      status, // Include the status in the job posting object
      education,
      experience,
      jobNature,
      salary,
      requiredKnowledge
    });

    console.log("jobPosting", jobPosting);

    // Save job posting to the database
    await jobPosting.save();

    // Send success response
    res.status(201).send({
      success: true,
      message: "Job Posting Created Successfully",
      jobPosting,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Create Job Posting",
    });
  }
};

 //update Job the controller


 export const updateJobController = async (req, res) => {
   try {
     // Extract the job ID and new status from the request parameters and body
     const { jobId } = req.params;
     const { status } = req.body;
 
     // Check if the job ID and status are provided
     if (!jobId || !status) {
       return res.status(400).send({ error: "Job ID and status are required" });
     }
 
     // Check if the status is valid (either 'open' or 'fulfilled')
     if (status !== 'open' && status !== 'fulfilled') {
       return res.status(400).send({ error: "Invalid status. Status must be 'open' or 'fulfilled'" });
     }
 
     // Find the job posting by ID
     const jobPosting = await CarrerModel.findById(jobId);
 
     // Check if the job posting exists
     if (!jobPosting) {
       return res.status(404).send({ error: "Job posting not found" });
     }
 
     // Update the status of the job posting
     jobPosting.status = status;
 
     // Save the updated job posting to the database
     await jobPosting.save();
 
     // Send success response
     res.status(200).send({
       success: true,
       message: "Job Posting updated successfully",
       jobPosting,
     });
   } catch (error) {
     console.error(error);
     res.status(500).send({
       success: false,
       error: error.message,
       message: "Error in updating job posting",
     });
   }
 };
 

// getAllJob


export const getAlljobController = async (req, res) => {
  try {
    // Fetch all job postings from the database
    const allJobPostings = await CarrerModel.find();

    // Send success response with the fetched job postings
    res.status(200).send({
      success: true,
      message: "All job postings fetched successfully",
      jobPostings: allJobPostings,
    });
  } catch (error) {
    // Handle errors if any
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in fetching job postings",
    });
  }
};
//Search job Controller


export const searchJobsController = async (req, res) => {
  try {
    // Extract the search query from the request parameters
    const { query } = req.params;

    // Use regular expression to perform case-insensitive search
    const regex = new RegExp(query, 'i');

    // Search for job postings that match the query
    const jobs = await CarrerModel.find({
      $or: [
        { jobTitle: { $regex: regex } },
        { company: { $regex: regex } },
        { location: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    });

    // Send success response with the search results
    res.status(200).json({
      success: true,
      message: `Found ${jobs.length} job postings matching "${query}"`,
      jobs
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in searching job postings"
    });
  }
};

//searchjobbycontroller

export const searchJobsByCityController = async (req, res) => {
  try {
    // Extract the city name from the request parameters
    const { city } = req.params;

    // Search for job postings in the specified city
    const jobs = await CarrerModel.find({ location: city });

    // Send success response with the search results
    res.status(200).json({
      success: true,
      message: `Found ${jobs.length} job postings in ${city}`,
      jobs
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in searching job postings by city"
    });
  }
};

// getSingle Job Controller
 // Import the Mongoose model
 import mongoose from 'mongoose';

 export const getSingleJobController = async (req, res) => {
   try {
     // Extract the job ID from the request parameters
     const { _id } = req.params;
 
     // Check if jobId is a valid ObjectId
     if (!mongoose.isValidObjectId(_id)) {
       return res.status(400).send({ error: "Invalid job ID format" });
     }
 
     // Find the job posting by ID
     const jobPosting = await CarrerModel.findById(_id);
 
     // Check if the job posting exists
     if (!jobPosting) {
       return res.status(404).send({ error: "Job posting not found" });
     }
 
     // Send success response with the job posting
     res.status(200).send({
       success: true,
       message: "Job posting found",
       jobPosting,
     });
   } catch (error) {
     console.error(error);
     res.status(500).send({
       success: false,
       error: error.message,
       message: "Error in fetching job posting",
     });
   }
 };
 
