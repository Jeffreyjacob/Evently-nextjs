import React, { startTransition, useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { ICategory } from '@/lib/database/Modals/category.model';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '../input';
import { createCategory, getAllCategory } from '@/lib/actions/category.action';

interface Props {
    value?: string
    onChangeHandler?: () => void
}

const DropDown = ({ value, onChangeHandler }: Props) => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [newCategory,setNewCategory] = useState('');
    const handleAddCategory = async ()=>{
          createCategory({
            categoryName:newCategory.trim()
          }).then((category)=>{
            setCategories((prevState)=> [...prevState,category])
          }
          )
    }

    useEffect(()=>{
         const getCategories = async ()=>{
            const categoryList = await getAllCategory();

            categoryList && setCategories(categoryList as ICategory[]) 
         }
         getCategories();
    },[])
    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field ">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                {categories.length > 0 && categories.map((category, index) => (
                    <SelectItem key={category._id} value={category._id}
                        className='select-item p-regular-14'>
                        {category.name}
                    </SelectItem>
                ))}

                <AlertDialog>
                    <AlertDialogTrigger className='p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary hover:bg-primary-50 focus:text-primary-500'>Add New Category</AlertDialogTrigger>
                    <AlertDialogContent className='bg-white'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>New Category</AlertDialogTitle>
                            <AlertDialogDescription>
                               <Input type='text' placeholder='category name'
                               className='input-field mt-3' onChange={(e)=>setNewCategory(e.target.value)} />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={()=> startTransition(handleAddCategory)}>
                                Add
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SelectContent>
        </Select>
    )
}

export default DropDown
