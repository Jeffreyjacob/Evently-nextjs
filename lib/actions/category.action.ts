"use server"

import { CreateCategoryParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Category from "../database/Modals/category.model"

export const createCategory = async ({categoryName}:CreateCategoryParams) =>{
   try{
    await connectToDatabase();
    const newCategory = await Category.create({name:categoryName});
     return JSON.parse(JSON.stringify(newCategory));
   }catch(error){
    handleError(error)
   }
}

export const getAllCategory = async () =>{
    try{
     await connectToDatabase();
     const Categories = await Category.find();
      return JSON.parse(JSON.stringify(Categories));
    }catch(error){
     handleError(error)
    }
 }