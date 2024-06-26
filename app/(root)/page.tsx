import { Button } from "@/components/ui/ui/button";
import Image from "next/image";
import Link from "next/link";
import heroImage from '@/public/assets/images/hero.png';
import Collection from "@/components/ui/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.action";

export default async  function Home() {
   const events = await getAllEvents({
    query:'',
    category:"",
    page:1,
    limit:6
   })
   
  return (
    <>
    <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10 ">
      <div className="wrapper grid grids-1 gap-5 md:grid-cols-2 2xl:gap-0 ">
        <div className="flex flex-col justify-center gap-8">
           <h1 className="h1-bold">
             Host,Connect,Celebrate: Your Events, Our Platform
           </h1>
           <p className="p-regular-20 md:p-regulat-24">
             Book and Learn helpful tips from 3,168 mentors in world-class
             companies with our globe community.
           </p>
           <Button size='lg' asChild className="button w-full sm:w-fit" >
             <Link href='#events'>
              Explore Now
             </Link>
           </Button>
        </div>
        <Image 
        src={heroImage}
        width={1000}
        height={1000}
        alt="hero"
        className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
        />
      </div>
    </section>
    <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">
        Trust by <br/> Thousands of Events
      </h2>
      <div className="flex w-full flex-col gap-5 md:flex-row">
      Search
      CategoryFilter
      </div>
      <Collection data={events?.data} 
      emptyTitle = 'No Events Found'
      emptyStateSubText = "Come back later"
      collectionType="All_Events"
      limit={6}
      page={1}
      totalPages={2}/>
    </section>
    
    </>
  );
}
