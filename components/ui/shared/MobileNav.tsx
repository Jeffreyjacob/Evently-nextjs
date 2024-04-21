import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image';
import menuIcon from '@/public/icons/menu.svg';
import Logo from '@/public/images/logo.svg';
import { Separator } from "@/components/ui/separator"
import Navitem from './Navitem';



const MobileNav = () => {
    return (
        <nav className='md:hidden'>
            <Sheet>
                <SheetTrigger className='align-middle'>
                 <Image 
                 src={menuIcon}
                 width={24}
                 height={24}
                 alt='menu-button'
                 className='cursor-pointer'
                 />
                </SheetTrigger>
                <SheetContent className='flex flex-col gap-6 bg-white md:hidden'>
                   <Image
                   src={Logo}
                   width={128}
                   height={38}
                   alt='logo'
                   />
                   <Separator className='border border-gray-50'/>
                   <Navitem/>
                   
                </SheetContent>
            </Sheet>

        </nav>
    )
}

export default MobileNav