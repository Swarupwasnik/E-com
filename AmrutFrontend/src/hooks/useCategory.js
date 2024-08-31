import {useState,useEffect} from 'react';
import axios from 'axios';

export default function useCategory(){
    const[categories,setCategories] = useState({});

    // get category
    const getCategoryies = async()=>{
        try{
            const {data} = await axios.get(`http://localhost:8080/api/v1/category/get-category`)
setCategories(data?.category) //from category controller
        }catch(err){

        }
    }

    useEffect(()=>{
        getCategoryies()
    },[])
    return categories;
}