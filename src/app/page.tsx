import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/db'
import React from 'react'

const Page = async () => {
  const users = await prisma.user.findMany()
  return (
    <div>
      {JSON.stringify(users,null,21)}
    </div>
  )
}

export default Page
