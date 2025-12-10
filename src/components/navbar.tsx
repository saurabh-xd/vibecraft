import { DraftingCompass } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

 const links = [
  { href: '/features', title: 'Features' },
  { href: '/pricing', title: 'Pricing' },
  { href: '/Testimonials', title: 'Testimonials' },
  { href: '/About', title: 'About' },
  { href: '/contact', title: 'Contact us' }
];

export default function Navbar() {
  return (
   <nav className='flex items-center justify-between  px-6 py-4 border-b border-neutral-500'>
   <div className='flex gap-2'>
     <DraftingCompass className='text-rose-400'/>
     <h2>VibeCraft</h2>
   </div>

   <div className='flex items-center justify-center gap-4'>
    {
        links.map((link,idx)=>(
            <Link key={link.title} href={link.href}>
                 {link.title}
            </Link>
        ))
    }
   </div>
   </nav>
  )
}
