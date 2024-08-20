import React from 'react'

import Card from '@/components/common/card'

export default function MusicAdminAuth({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='table h-screen min-h-screen w-full'>
      <div className='table-cell size-full align-middle'>
        <div className='container px-4'>
          <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center max-sm:w-full md:w-[500px]'>
              <Card classNameContainer='shadow-auth p-5 md:p-10'>
                {children}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
