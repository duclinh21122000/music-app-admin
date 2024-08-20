'use client'

import { useParams, useRouter } from 'next/navigation'
import React from 'react'

import Button from '@/components/common/button'
import Card from '@/components/common/card'
import MediaUpload from '@/components/common/media-upload'
import type { IAssets } from '@/services/models/IAssets'
import { ROUTE_PATH } from '@/utils/constants/route'
import { ParentCategories } from '@/utils/data/parent-category'
import { useModal } from '@/utils/hooks/useModal'

import EditParentCategory from './edit'

const EditParentCategoryContainer = () => {
  const router = useRouter()
  const params = useParams()
  const { id } = params
  const { open, onOpen, onClose } = useModal()
  const [images, setImages] = React.useState<IAssets[]>([])

  const data =
    ParentCategories.find((item) => item.id == Number(id)) ??
    ParentCategories[0]

  React.useEffect(() => {
    if (data) {
      setImages([data.image])
    }
  }, [data])

  return (
    <Card>
      <div className='mb-6 flex items-center justify-between'>
        <h3 className='text-[22px] font-medium text-[#2C323F]'>
          Chỉnh sửa danh mục
        </h3>
        <Button
          onClick={() =>
            router.push(ROUTE_PATH.admin.categories.all_parent_categories)
          }
        >
          Danh mục
        </Button>
      </div>
      <EditParentCategory data={data} images={images} onOpenModal={onOpen} />
      <MediaUpload open={open} onClose={onClose} onSelectImage={setImages} />
    </Card>
  )
}

export default EditParentCategoryContainer
