import ProductModel from "../models/ProductModel.js";
import slugify from "slugify";
import fs from "fs";
import path from "path";
// import CategoryModel from "../models/categoryModel.js"
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";
import Razorpay from "razorpay";
// import { error } from "console";
dotenv.config();
// payment gateway

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

const razorpayInstance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

//create product

export const createProductController = async (req, res) => {
  console.log("req.body from product controller", req.body);
  console.log("req.files from product controller", req.files);

  try {
    const { name, description, price, slug, category, quantity, shipping } =
      req.body;

    // Validations
    if (
      !name ||
      !description ||
      !slug ||
      !price ||
      !quantity ||
      !category ||
      !shipping
    ) {
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

    // Create product instance
    const product = new ProductModel({
      name,
      description,
      slug: slugify(slug),
      price,
      category,
      quantity,
      shipping,
      photo: images,
    });

    console.log("product", product);

    // Save product to the database
    await product.save();

    // Send success response
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Create Product",
    });
  }
};

//get All products

export const getProductController = async (re, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: products.length,
      message: "AllProducts",
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Getting Proudcts",
      error: err.message,
    });
  }
};

//get single product contoller

export const getsingleProductController = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(404).send({
      success: false,
      message: "Error while getting Single Product",
      err,
    });
  }
};
//getphotos

export const productPhotoController = async (req, res) => {
  try {
    // Find the product by ID
    const product = await ProductModel.findById(req.params.pid);

    // Check if product exists and has a photo
    if (!product || !product.photo || product.photo.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product photo not found" });
    }

    // Read the image file
    const imagePath = product.photo[0]; // Assuming the photo field contains the file path
    const image = fs.readFileSync(imagePath);

    console.log("imagePath", imagePath);
    console.log("image", image);

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

//delete product

export const deleteProductController = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted Sucessfully",
    });
  } catch (err) {
    console.log(err);
    res.statue(500).send({
      success: false,
      message: "Error while delete product",
    });
  }
};
//updateproduct

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, slug, category, quantity, shipping } =
      req.body;

    // Validations
    if (
      !name ||
      !description ||
      !slug ||
      !price ||
      !quantity ||
      !category ||
      !shipping
    ) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Check if photo is included in the request
    if (!req.files) {
      return res.status(400).send({ error: "Photo is required" });
    }

    let images = [];

    req.files.photo.forEach((img) => {
      images.push(img.path);
    });

    // Update product in the database
    const product = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      {
        name,
        description,
        slug: slugify(slug),
        price,
        category,
        quantity,
        shipping,
        photo: images,
      },
      { new: true }
    );

    // Send success response
    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Update Product",
    });
  }
};
//filter products
// export const productFilterController =async()=>{
//   try{
//     const {checked,radio}=req.body
//     let args = {}
//     if(checked.length > 0) args.category = checked
// if(radio.length) args.price = {$gte:radio[0],$lte:radio[1]}
// const products = await ProductModel.find(args)
// res.status(200).send({
//   success:true,
//   products
// });
//   }catch(err){
//     console.log(err);
//     res.status(400).send({
//       success:false,
//       message:"Error while filtering Products",
//       err
//     })
//   }
// }

// get Product comment Controller

export const getProductCommentsController = async (req, res) => {
  try {
    const { productId } = req.params;

    // Query the database for comments related to the specified product ID
    const comments = await CommentModel.find({ product: productId });

    // If no comments are found, return an appropriate message
    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: 'No comments found for this product.' });
    }

    // If comments are found, return them as a response
    return res.status(200).json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;

    // Define empty object to store filter criteria
    let filterCriteria = {};

    // Add category filter if checked categories exist
    if (checked && checked.length > 0) {
      filterCriteria.category = { $in: checked };
    }

    // Add price filter if radio button values exist
    if (radio && radio.length === 2) {
      filterCriteria.price = { $gte: radio[0], $lte: radio[1] };
    }

    // Query the database with the formed filter criteria
    const products = await ProductModel.find(filterCriteria);

    // Send response with filtered products
    res.status(200).send({
      success: true,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "Error while filtering Products",
      error: err, // Send the actual error for debugging
    });
  }
};

//product count
export const productCountController = async (req, res) => {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Error in Product Count",
      err,
      success: false,
    });
  }
};

//Pagination
export const productListController = async (req, res) => {
  try {
    const perPage = 1;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductModel.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
      res.status(200)
.send({
  success:true,
  products,
})  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "error in per page control",
      err,
    });
  }
};
 //search
export const searchProductController = async(req,res)=>{

try{
  const {keyword} = req.params
  const result = await ProductModel.find({
    $or:[
      {name:{$regex:keyword,$options:"i"}},
      {description:{$regex:keyword,$options:"i"}}
    ]
  }).select("-photo");
res.json(result);

}catch(error){
  console.log(err)
  res.status(400).send({
    success:false,
    message:"Error in Search product Api",
    error
  })
}

}

//similar products
// export const relatedProductController = async(req,res)=>{
//   try{
//    const {pid,cid}   = req.params
// const products = await ProductModel.find({
//   category:cid,
//   _id:{$ne:pid}
// }).select("-photo").limit(4).populate("category")
// res.status(200).send({
//   success:true,
//   products
// })
//   }catch(err){
//     console.log(err)
//     res.status(400).send({
//       success:false,
//       message:"Error while getting related Products"
//     })
//   }
// }

export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;

    // Check if pid and cid are defined
    if (!pid || !cid) {
      return res.status(400).send({
        success: false,
        message: "Both product ID (pid) and category ID (cid) are required."
      });
    }

    const products = await ProductModel.find({
      category: cid,
      _id: { $ne: pid }
    }).select("-photo").limit(4).populate("category");

    res.status(200).send({
      success: true,
      products
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "Error while getting related Products"
    });
  }
};

//get product by category
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    // const products = await ProductModel.find({ category: category.name }).populate("category");
    const products = await ProductModel.find({ category: category._id }).populate("category");

    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send({
      success: false,
      message: "Error while getting products",
      error: err.message, // Include error message in response
    });
  }
};






//payment gateway Api token

export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function(err, response) {
      if (err) {
        console.error("Error generating client token:", err);
        res.status(500).send({ error: "Failed to generate client token" });
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).send({ error: "Unexpected error occurred" });
  }
};


//payment




//create order

// export const createOrderController = async (req, res) => {
//   try {
//     const { cart, nonce, paymentMethod } = req.body; // Adding paymentMethod to request body

//     // Calculate the total amount
//     let total = 0;
//     cart.forEach(item => {
//       total += item.price;
//     });

//     if (paymentMethod === "Online Payment") {
//       // Process the payment through Braintree
//       gateway.transaction.sale({
//         amount: total.toFixed(2), // Ensure amount is in correct format
//         paymentMethodNonce: nonce,
//         options: {
//           submitForSettlement: true
//         }
//       }, async (err, result) => {
//         if (result && result.success) {
//           // Create and save the order
//           const order = new orderModel({
//             products: cart,
//             payment: result,
//             buyer: req.user._id,
//             paymentMethod: paymentMethod // Setting payment method from request body
//           });
//           await order.save(); // Save the order to the database
//           res.json({ ok: true });
//         } else {
//           res.status(500).send(err || result.message);
//         }
//       });
//     } else if (paymentMethod === "Cash on Delivery") {
//       // Create and save the order for Cash on Delivery
//       const order = new orderModel({
//         products: cart,
//         payment: { status: "Pending" }, // Setting payment status as pending for COD
//         buyer: req.user._id,
//         paymentMethod: paymentMethod // Setting payment method from request body
//       });
//       await order.save(); // Save the order to the database
//       res.json({ ok: true });
//     } else {
//       res.status(400).send("Invalid payment method");
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// };
// //razorpay
//  export const createPyamentRazor =async(req,res)=>
//  {

// try{
// const instance = new Razorpay({
//   key_id:process.env.KEY_ID,
//   key_secret:process.env.KEY_SECRET
// })
// const option = {
//   amount:req.body.amount*100,
//   currency:"INR",
//   receipt:crypto.randomBytes(10).toString("hex"),

// };
// instance.orders.create(option,(error,order)=>{
//   if(error){
//     console.log(error);
//     return res.status(500).json({message:"Something Went Wrong"})
//   }
//   res.status(200).json({data:order})
// })

// }catch(err){
// console.log(error);
// res.status(500).json({message:"Internal Server Error"})
// }

//  }
// //verified payment
//  export const razorPayVerifyController = async(req,res)=>{
//   try{
//     const{
      
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature
//     } = req.body
//     const sign = razorpay_order_id + " " + razorpay_payment_id;
//     const expectedSign = crypto
//     .createHmac("swar256",process.eventNames.KEY_SECRET)
//     .update(sign.toString())
//     .digest("hex");

//     if(razorpay_signature == expectedSign){
//       return res.status(200).json({message:"Payment Verified Sucessfully"})
//     }

//   }catch(err){

//   }
//  }


// create order controller

export const createOrderController = async (req, res) => {
  try {
    const { cart, nonce, paymentMethod } = req.body;

    // Calculate the total amount
    let total = 0;
    cart.forEach(item => {
      total += item.price;
    });

    if (paymentMethod === "Online Payment") {
      // Process the payment through Razorpay
      const options = {
        amount: total * 100, // amount in paisa (1 INR = 100 paisa)
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
      };

      razorpayInstance.orders.create(options, async (error, order) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Failed to create Razorpay order" });
        }

        // Create and save the order
        const orderData = new orderModel({
          products: cart,
          payment: { status: "Pending", razorpay_order_id: order.id },
          buyer: req.user._id,
          paymentMethod: paymentMethod
        });

        try {
          await orderData.save(); // Save the order to the database
          res.json({ orderId: order.id });
        } catch (err) {
          console.error(err);
          res.status(500).send('Failed to save order');
        }
      });

    } else if (paymentMethod === "Cash on Delivery") {
      // Create and save the order for Cash on Delivery
      const orderData = new orderModel({
        products: cart,
        payment: { status: "Pending" },
        buyer: req.user._id,
        paymentMethod: paymentMethod
      });

      try {
        await orderData.save(); // Save the order to the database
        res.json({ ok: true });
      } catch (err) {
        console.error(err);
        res.status(500).send('Failed to save order');
      }
    } else {
      res.status(400).send("Invalid payment method");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

//verified controller
export const razorPayVerifyController = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    // Prepare the string to be signed
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    
    // Create HMAC using SHA256
    const generatedSignature = crypto.createHmac('sha256', process.env.KEY_SECRET)
                                   .update(text)
                                   .digest('hex');

    // Compare generated signature with razorpay_signature
    if (generatedSignature === razorpay_signature) {
      // Signature matched, payment verified successfully
      const payment = await razorpayInstance.payments.fetch(razorpay_payment_id);
      
      if (payment && payment.status === 'captured') {
        // Payment is successful and captured
        // You can update your database or perform any necessary actions here
        
        return res.status(200).json({ message: "Payment Verified Successfully" });
      } else {
        // Payment status is not captured or other error
        return res.status(400).json({ message: "Payment verification failed" });
      }
    } else {
      // Signature did not match
      return res.status(400).json({ message: "Invalid razorpay_signature" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};