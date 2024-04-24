"use client"

import { IEvent } from '@/lib/database/Modals/event.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import CheckOut from './CheckOut';

const CheckoutButton = ({event}:{event:IEvent}) => {
    const {user} = useUser();
    const userId = user?.publicMetadata.userId as string;
    const hasEventFinished = new Date(event.endDateTime) < new Date();
  return (
    <div className='flex items-center gap-3'>
     {/**we can't buy past event */}
     {
        hasEventFinished ?(
         <p className='p-2 text-red-400'>Sorry,Ticket are no longer avaliable</p>
        ):(
        <>
        <SignedOut>
            <Button asChild className='button rounded-full' size='lg'>
                <Link href={'/sign-in'}>
                   Get Tickets
                </Link>
            </Button>
        </SignedOut>
        <SignedIn>
            <CheckOut event={event} userId={userId}/>
        </SignedIn>
        </>
        )
     }
    </div>
  )
}

export default CheckoutButton