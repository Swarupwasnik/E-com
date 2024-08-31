import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send({ message: "Name is Required" });
        }

        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exists"
            });
        }

        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: "New Category Created",
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category"
        });
    }
};
 

//updateCategoryController

export const updateCategoryController =async(req,res)=>{

try{
    const {name} = req.body;
    const{id} = req.params

const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},({new:true}))
res.status(200).send({
    success:true,
    message:"Category Updated Sucessfully",
    category,
    
})
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"Error occurs Updating category" 
    })
}
}
//get All category controller

export const categoryController =async(req,res)=>{

try{
const category = await categoryModel.find({})
res.status(200).send({
    message:"All Category List",
    category
})

}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"Error While getting all Categories"
    })
}
}

//Single Category Controller

export const singleCategoryController =async(req,res)=>{

try{
const category = await categoryModel.findOne({slug:req.params.slug})
res.status(200).send({
    success:true,
    message:"Get Single Category Successfully",
    category
})
}catch(error){
console.log(error)
res.status(500).send({
    success:false,
    error,
    message:"Error while getting Single Category"
})

}

}
//delete Category


export const deleteCategoryController = async(req,res)=>{
try{
    const{_id} = req.params
    await categoryModel.findByIdAndDelete(_id)
res.status(200).send({
    success:true,
    message:"Category Deleted Successfully"
})
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error while deleting category",
        error
    })
}
}