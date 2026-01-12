import prisma from '@/lib/db'
import React from 'react'

async function page() {
  
  const posts = await prisma.user.findMany();
  
  
  return (
    <div className='flex items-center justify-center min-h-screen min-w-screen'>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>{p.username}</li>
        ))}
      </ul>
    </div>
  )
}

export default page