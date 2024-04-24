"use client"

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { eventFormSchema } from '@/lib/Validator';
import { z } from 'zod';
import { eventDefaultValues } from '@/constants';
import DropDown from './DropDown';
import { Textarea } from "@/components/ui/textarea"
import FileUploader from './FileUploader';
import Image from 'next/image';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox";
import { useUploadThing } from '@/lib/uploadthing';
import { useRouter } from 'next/navigation';
import { createEvent, updateEvent } from '@/lib/actions/event.action';
import { IEvent } from '@/lib/database/Modals/event.model';




type Props = {
    userId: string,
    type: "Create" | "Update",
    event?:IEvent,
    eventId?:string
}

const EventForm = ({ userId, type,event,eventId}: Props) => {
    console.log(userId)
    const initialValue = event && type === 'Update' ? {
     ...event,startDateTime: new Date(event.startDateTime),
     endDateTime: new Date(event.endDateTime)
    }: eventDefaultValues
    const [file, setFiles] = useState<File[]>([]);
    const router = useRouter();
    const {startUpload} = useUploadThing('imageUploader')
    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValue
    })
   async function onSubmit (values: z.infer<typeof eventFormSchema>) {
        let uploadedImageUrl = values.imageUrl

        if(file.length > 0){
            const uploadedImages = await startUpload(file)
           if(!uploadedImages){
            return
           }
           uploadedImageUrl = uploadedImages[0].url
         
        }
         if(type === 'Create'){
            try{
            const newEvent = await createEvent({
                event:{...values,imageUrl:uploadedImageUrl},
                userId,
                path:'/profile'
            })
              if(newEvent){
               form.reset()
               router.push(`/events/${newEvent._id}`)
              }
            }catch(error){
              console.log(error)
            }
         }
         if(type === 'Update'){
            if(!eventId){
                router.back()
                return;
            }
            try{
            const updatedEvent = await updateEvent({
                event:{...values,imageUrl:uploadedImageUrl,_id:eventId},
                userId,
                path:`/events/${eventId}`
            })
              if(updatedEvent){
               form.reset()
               router.push(`/events/${updatedEvent._id}`)
              }
            }catch(error){
              console.log(error)
            }
         }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

                <div className='flex flex-col gap-5 md:flex-row'>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <Input placeholder="Event title" {...field}
                                        className='input-field' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <DropDown value={field.value} onChangeHandler={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-5 md:flex-row'>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl className='h-72'>
                                    <Textarea placeholder="Event description" {...field}
                                        className='textarea rounded-2xl' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl className='h-72'>
                                    <FileUploader onFieldChange={field.onChange}
                                        imageUrl={field.value}
                                        setFiles={setFiles} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-5 md:flex-row'>
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <div className='flex-center h-[54px] bg-grey-50 w-full overflow-hidden rounded-full px-4 '>
                                        <Image
                                            src='/assets/icons/location-grey.svg'
                                            alt='location'
                                            width={24}
                                            height={24} />
                                        <Input placeholder="Event Location ot Online" {...field}
                                            className='input-field' />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                </div>
                <div className='flex flex-col gap-5 md:flex-row'>
                    <FormField
                        control={form.control}
                        name="startDateTime"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <div className='flex-center h-[54px] bg-grey-50 w-full overflow-hidden rounded-full px-4'>
                                        <Image
                                            src='/assets/icons/calendar.svg'
                                            alt='calender'
                                            width={24}
                                            height={24}
                                            className='filter-grey' />
                                        <p className='ml-3 whitespace-nowrap text-grey-600'>Start Date:</p>
                                        <DatePicker selected={field.value}
                                            onChange={(date: Date) => field.onChange(date)}
                                            showTimeSelect timeInputLabel='Time:'
                                            dateFormat='MM/dd/yyyy h:mm aa'
                                            wrapperClassName='datePicker' />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDateTime"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <div className='flex-center h-[54px] bg-grey-50 w-full overflow-hidden rounded-full px-4'>
                                        <Image
                                            src='/assets/icons/calendar.svg'
                                            alt='calender'
                                            width={24}
                                            height={24}
                                            className='filter-grey' />
                                        <p className='ml-3 whitespace-nowrap text-grey-600'>End Date:</p>
                                        <DatePicker selected={field.value}
                                            onChange={(date: Date) => field.onChange(date)}
                                            showTimeSelect timeInputLabel='Time:'
                                            dateFormat='MM/dd/yyyy h:mm aa'
                                            wrapperClassName='datePicker' />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-5 md:flex-row'>
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                                        <Image
                                            src='/assets/icons/dollar.svg'
                                            alt='dollar'
                                            width={24}
                                            height={24}
                                            className='filter-grey' />
                                        <Input type='number' placeholder='Price' {...field}
                                            className='p-regular-16 border-0 bg-grey-50 outline-offset focus:border-0 
                                           focus-visible:ring-0 focus-visible:ring-offset-0'/>


                                        <FormField
                                            control={form.control}
                                            name="isFree"
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
                                                    <FormControl>
                                                        <div className='flex items-center'>
                                                            <label htmlFor='isFree' className='whitespace-nowrap pr-3 leading-none 
                                                              peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                                                                Free Ticket
                                                            </label>
                                                            <Checkbox id='isFree'
                                                                onCheckedChange={field.onChange}
                                                                checked={field.value}
                                                                className='mr-2 h-5 w-5 border-2 border-primary-500' />

                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <div className='flex-center h-[54px] bg-grey-50 w-full overflow-hidden rounded-full px-4 '>
                                        <Image
                                            src='/assets/icons/link.svg'
                                            alt='link'
                                            width={24}
                                            height={24} />
                                        <Input placeholder="URL" {...field}
                                            className='input-field' />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>


                <Button type="submit"
                size='lg'
                disabled={form.formState.isSubmitting}
                className='button col-span-2 w-full'
                >
                    {
                        form.formState.isSubmitting ? (
                        'Submitting'
                        ):(
                          `${type} Event`
                        )
                    }
                </Button>
            </form>
        </Form>
    )
}

export default EventForm