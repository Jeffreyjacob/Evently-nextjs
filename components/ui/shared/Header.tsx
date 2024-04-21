import Image from 'next/image'
import Link from 'next/link'
import React from 'react';
import logoimage from '@/public/images/logo.svg';
import {  SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';
import Navitem from './Navitem';
import MobileNav from './MobileNav';

const Header = () => {
  return (
    <header className='w-full border-b'>
     <div className='wrapper flex items-center justify-between'>
       <Link href='/' className='w-36'>
         <Image src={logoimage} width={128} height={38}
         alt='Evently logo'/>
       </Link>
       <SignedIn>
        <nav className='md:flex-between hidden w-full max-w-xs'>
          <Navitem/>
        </nav>
       </SignedIn>

       <div className='flex w-32 justify-end gap-3'>
        <SignedIn>
          <UserButton afterSignOutUrl='/'/>
          <MobileNav/>
        </SignedIn>
          <SignedOut>
            <Button asChild className='rounded-full ' size='lg'>
              <Link href='/signin'>
                  Login
              </Link>
            </Button>
          </SignedOut>
       </div>
     </div>
    </header>
  )
}

export default Header