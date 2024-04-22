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



interface Props {
    userId: string,
    type: "Create" | "Update"
}

const EventForm = ({ userId, type }: Props) => {
    const initialValue = eventDefaultValues;
    const [file,setFiles] = useState<File[]>([]);
    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValue
    })
    function onSubmit(values: z.infer<typeof eventFormSchema>) {
        console.log(values)
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
                        name="CategoryId"
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
                                   setFiles={setFiles}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default EventForm