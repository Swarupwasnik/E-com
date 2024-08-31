import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import { useNavigate,useParams } from "react-router-dom";
import "../../App.css";
import { isNumeric } from "validator";
const Updateproduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [slug, setSlug] = useState("");
  const [errors, setErrors] = useState({});
  const[id,setId] = useState("");
const params = useParams();


//single  product
const getSingleProduct = async()=>{
    try{
const {data} = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`)
setName(data.product.name);
setDescription(data.product.description)
setPrice(data.product.price)
setQuantity(data.product.quantity)
setCategory(data.product.category._id)
setShipping(data.product.shipping)
setId(data.product._id);
    }catch(err){
console.log(err)
    }
}
useEffect(()=>{
    getSingleProduct()
},[])

const handleDelete = async()=>{
  try{
    let answer = window.prompt("Are you want to delete this product ?")
    if(!answer) return;
const {data} = await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${id}`)
toast.success("Product Deleted Sucessfully")
navigate("/dash/admin/products")
  }catch(error){
console.log(error)
toast.error("Something Went Wrong");
  }
}

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      const data = response.data;
      console.log("Fetched Data", data);

      if (Array.isArray(data)) {
        setCategories(data);
      } else if (Array.isArray(data.category)) {
        setCategories(data?.category);
      } else {
        console.log("Fetched data is not in the expected format:", data);
        toast.error("Data format error: Unexpected response format");
      }
    } catch (error) {
      console.log("Error fetching categories", error);
      toast.error("Something went wrong while getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }

    if (!price.toString().trim()) {
      newErrors.price = "Price is required";
      valid = false;
    } else if (!isNumeric(price.toString())) {
      // Using isNumeric function from validator
      newErrors.price = "Price must be a number";
      valid = false;
    }

    if (!quantity.toString().trim()) {
        newErrors.quantity = "Quantity is required";
        valid = false;
      } else if (!isNumeric(quantity.toString())) {
        newErrors.quantity = "Quantity must be a number";
        valid = false;
      }
      

    if (!slug.trim()) {
      newErrors.slug = "Slug is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const productData = {
        name,
        description,
        price,
        quantity,
        category,
        shipping,
        slug,
      };

      const formData = new FormData();

      for (const key in productData) {
        formData.append(key, productData[key]);
      }

      if (photo instanceof File) {
        console.log("photo", photo);
        formData.append("photo", photo);
      }

      console.log("productData", productData);
      console.log("formData", formData);

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Product Updated successfully");
        navigate("/dash/admin/products");
      } else {
        toast.error(data?.message || "Failed to create product");
      }
    } catch (err) {
      console.error("Error creating product:", err);
      toast.error("Something went wrong while creating product");
    }
  };
  return (
    <div>
      <Layout title={"Dashboard - Create Products"}>
        <div className="container-fluid m-3 p-3 dashboard">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-5">
              <h1>Update Product</h1>
              <form onSubmit={handleSubmit}>
                <div className="m-1">
                  <Select
                    bordered={false}
                    placeholder="Select the Category"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setCategory(value);
                    }}
                    value={category}
                  >
                    {categories.map((item) => (
                      <Option value={item._id} key={item._id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                  <div className="mb-3">
                    <label className="btn btn-outline-secondary col-md-6">
                      {photo ? photo.name : "Upload Photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={handleFileChange}
                        hidden
                      />
                    </label>
                  </div>
                  <div className="mb-3">
                    {photo && (
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product photo preview"
                          height={"100px"}
                          className="img img-responsive"
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      id="name"
                      placeholder="Write a name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                      <div className="text-danger">{errors.name}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <textarea
                      value={description}
                      id="description"
                      placeholder="Write a Description"
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && (
                      <div className="text-danger">{errors.description}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={price}
                      id="price"
                      placeholder="Write a Price"
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    {errors.price && (
                      <div className="text-danger">{errors.price}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={slug}
                      id="price"
                      placeholder="Write a Slug"
                      className="form-control"
                      onChange={(e) => setSlug(e.target.value)}
                    />
                    {errors.slug && (
                      <div className="text-danger">{errors.slug}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={quantity}
                      id="quantity"
                      placeholder="Write a Quantity"
                      className="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    {errors.quantity && (
                      <div className="text-danger">{errors.quantity}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <Select
                      value={shipping}
                      id="shipping"
                      placeholder="Select Shipping"
                      className="form-control mb-3"
                      onChange={(value) => {
                        setShipping(value);
                      }}
                    value={shipping ? 'yes' :"no"}
                    >
                      <Option value="1">YES</Option>
                      <Option value="0">NO</Option>
                    </Select>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-primary">Update Product</button>
                  </div>
                  <div className="mb-3">
                    <button onClick={handleDelete} className="btn btn-danger">Delete Product</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Updateproduct;
