import { Button } from '@/components/ui/button'
import Collection from '@/components/ui/shared/Collection'
import { getEventsByUser } from '@/lib/actions/event.action'
import { getOrdersByUser } from '@/lib/actions/order.action'
import { IOrder } from '@/lib/database/Modals/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import { Organization } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const page = async ({searchParams}:SearchParamProps) => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;

    const ordersPage =  Number(searchParams?.ordersPage) || 1;
    const eventsPage =  Number(searchParams?.eventsPage) || 1;

    const organizedEvents = await getEventsByUser({
     userId,page:eventsPage
    })
    const orders = await getOrdersByUser({
        userId,page:ordersPage
    })
    const orderedEvents = orders?.data.map((order:IOrder)=> order.event) || [];
  return (
    <>
    {/**My Ticket */}
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
     <div className='wrapper flex items-center justify-center sm:justify-between'>
      <h3 className='h3-bold text-center sm:text-left'>My Ticket</h3>
       <Button asChild size='lg' className='button hidden sm:flex'>
         <Link href="#/event">
           Explore More Events
         </Link>
       </Button>
     </div>
    </section>

    <section className='wrapper my-8'>
    <Collection data={orderedEvents} 
      emptyTitle = 'No Events ticket purchased yet'
      emptyStateSubText = "No worries - plenty of exciting events to explore!"
      collectionType="My_Tickets"
      limit={3}
      page={ordersPage}
      totalPages={orders?.totalPages}
      urlParamName='ordersPage'/>
    </section> 

    {/**Event Organized */}
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
     <div className='wrapper flex items-center justify-center sm:justify-between'>
      <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
       <Button asChild size='lg' className='button hidden sm:flex'>
         <Link href="/events/create">
           Create New Event
         </Link>
       </Button>
     </div>
    </section>

     <section className='wrapper my-8'>
    <Collection data={organizedEvents?.data} 
      emptyTitle = 'No Events have been created Yet'
      emptyStateSubText = "Go create some now!"
      collectionType="Events_Organized"
      limit={6}
      page={eventsPage}
      totalPages={organizedEvents?.totalPages}
      urlParamName='eventsPage'/>
    </section>
    </>
  )
}

export default page