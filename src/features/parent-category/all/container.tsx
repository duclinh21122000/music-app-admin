'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import Button from '@/components/common/button'
import Card from '@/components/common/card'
import { ROUTE_PATH } from '@/utils/constants/route'

import AllParentCategory from './list'

const AllParentCategoryContainer = () => {
  const route = useRouter()
  return (
    <Card>
      <div className='mb-6 flex items-center justify-between'>
        <h3 className='text-[22px] font-medium text-[#2C323F]'>Danh mục cha</h3>
        <Button
          onClick={() =>
            route.push(ROUTE_PATH.admin.categories.add_parent_categories)
          }
        >
          Thêm danh mục
        </Button>
      </div>
      <AllParentCategory />
    </Card>
  )
}

export default AllParentCategoryContainer
