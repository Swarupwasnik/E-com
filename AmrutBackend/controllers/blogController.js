// controllers/blogController.js
import blogModel from "../models/blogModel.js";
import fs from 'fs';
import moment from "moment/moment.js";
import BlogModel from "../models/blogModel.js";

export const createPostController = async (req, res) => {
  console.log("req.body from blog controller", req.body);
  console.log("req.files from blog controller", req.files);

  try {
    const { title, description,name,day,time, category } = req.body;

    // Validations
    if (!title || !description || !name || !day || !time || !category) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Check if photo is included in the request
    if (!req.files || !req.files.photo) {
      return res.status(400).send({ error: "Photo is required" });
    }

    let images = [];

    if (Array.isArray(req.files.photo)) {
      req.files.photo.forEach((img) => {
        images.push(img.path);
      });
    } else {
      // If only one file is uploaded, it won't be an array
      images.push(req.files.photo.path);
    }

    // Create blog post instance
    const post = new blogModel({
      title,
      description,
      photo: images,
      name,
      day,
      time,
      category
    });

    // Save post to the database
    await post.save();

    const formattedDate = moment(post.date).format("YYYY-MM-DD HH:mm")
    const formattedPost = { ...post.toObject(), date: formattedDate };

    // Send success response
    res.status(201).send({
      success: true,
      message: "Post Created Successfully",
      post:formattedPost
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Create Post",
    });
  }
};


//get photos controller

// controllers/blogController.js


export const postPhotoController = async (req, res) => {
  try {
    // Find the post by ID
    const post = await blogModel.findById(req.params.id);

    // Check if post exists and has a photo
    if (!post || !post.photo || post.photo.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Post photo not found" });
    }

    // Read the image file
    const imagePath = post.photo[0]; // Assuming the photo field contains the file path
    const image = fs.readFileSync(imagePath);

    // Set the appropriate content type and send the image data in the response
    res.set("Content-Type", "image/jpeg");
    return res.status(200).send(image);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error while getting photo", error });
  }
};
 
//get All Blogs

export const getBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find({})
      .populate({
        path: "category",
        select: "-photo"
      })
      .limit(12)
      .sort({ createdAt: -1 });

    // Map the blogs array to include the photo field
    const blogsWithPhoto = blogs.map((blog) => {
      return {
        ...blog.toObject(),
        photo: blog.photo.toString('base64')
      };
    });

    res.status(200).send({
      success: true,
      total: blogsWithPhoto.length,
      message: "All Blogs",
      blogs: blogsWithPhoto,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Getting Blogs",
      error: err.message,
    });
  }
};

// getSingleBlogController


export const getSingleBlogController = async (req, res) => {
  try {
    const Blog = await BlogModel.findOne({ title: req.params.title })
      .populate("category");

    if (!Blog) {
      return res.status(404).send({
        success: false,
        message: "Blog post not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Single Blog Fetched",
      Blog,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while getting single Blog",
      error: err,
    });
  }
};

// relatedBlogController.js

// Import the related blog model

export const relatedBlogController = async (req, res) => {
  try {
    const { blogId, categoryId } = req.params;

    // Check if blogId and categoryId are defined
    if (!blogId || !categoryId) {
      return res.status(400).send({
        success: false,
        message: "Both blog ID (blogId) and category ID (categoryId) are required."
      });
    }

    const relatedBlogs = await BlogModel.find({
      category: categoryId,
      _id: { $ne: blogId }
    }).select("-photo").limit(4).populate("category");

    res.status(200).send({
      success: true,
      relatedBlogs
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "Error while getting related Blogs"
    });
  }
};
