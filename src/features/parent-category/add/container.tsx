'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import Button from '@/components/common/button'
import Card from '@/components/common/card'
import MediaUpload from '@/components/common/media-upload'
import type { IAssets } from '@/services/models/IAssets'
import { ROUTE_PATH } from '@/utils/constants/route'
import { useModal } from '@/utils/hooks/useModal'

import AddParentCategory from './add'

const AddParentCategoryContainer = () => {
  const router = useRouter()
  const { open, onOpen, onClose } = useModal()
  const [images, setImages] = React.useState<IAssets[]>([])

  return (
    <Card>
      <div className='mb-6 flex items-center justify-between'>
        <h3 className='text-[22px] font-medium text-[#2C323F]'>
          Thêm danh mục
        </h3>
        <Button
          onClick={() =>
            router.push(ROUTE_PATH.admin.categories.all_parent_categories)
          }
        >
          Danh sách danh mục
        </Button>
      </div>
      <AddParentCategory images={images} onOpenModal={onOpen} />
      <MediaUpload open={open} onClose={onClose} onSelectImage={setImages} />
    </Card>
  )
}

export default AddParentCategoryContainer
