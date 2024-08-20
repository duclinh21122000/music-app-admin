import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'

import Button from '@/components/common/button'
import { Form, useForm } from '@/components/common/form'
import { Image } from '@/components/common/image'
import Input from '@/components/common/input'
import Textarea from '@/components/common/textarea'
import IconUpload from '@/components/icons/upload'
import type { IAssets } from '@/services/models/IAssets'
import type { IParentCategory } from '@/services/models/IParentCategory'
import { parentCategorySchema } from '@/utils/validations/parentCategoryValidation'

type EditParentCategoryProps = {
  data: IParentCategory
  images: IAssets[]
  onOpenModal: () => void
}

const EditParentCategory = ({
  data,
  images,
  onOpenModal,
}: EditParentCategoryProps) => {
  const form = useForm({
    resolver: yupResolver(parentCategorySchema),
    defaultValues: {
      name: data?.name,
      description: data?.description,
      image: images[0]?.id,
    },
  })

  const { handleSubmit, setValue } = form

  React.useEffect(() => {
    if (images && images.length > 0) {
      setValue('image', images[0]?.id)
    }
  }, [images])

  React.useEffect(() => {
    setValue('name', data?.name)
    setValue('description', data?.description)
  }, [data])

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Form form={form}>
      <Form.Item name='name' label='Tên danh mục'>
        <Input placeholder='Tên danh mục' fullWidth />
      </Form.Item>
      <Form.Item name='description' label='Mô tả'>
        <Textarea placeholder='Mô tả' />
      </Form.Item>
      <Form.Item name='image' label='Hình ảnh quà tặng'>
        <div className='flex flex-col'>
          {images && images.length ? (
            <div className='flex flex-row items-center gap-4'>
              {images.map((img, idx) => {
                return (
                  <div key={idx} className='w-[150px]'>
                    <Image
                      src={`/assets/images/${img.name}`}
                      alt={img.name}
                      objectFit='cover'
                      width={'100%'}
                      height={'150px'}
                    />
                  </div>
                )
              })}
            </div>
          ) : (
            <div
              className='flex w-[150px] cursor-pointer items-center justify-center border border-dashed border-[#ccc] p-[30px]'
              onClick={onOpenModal}
            >
              <IconUpload width={50} />
            </div>
          )}
          <div className='mt-6'>
            <Button onClick={onOpenModal}>Chọn ảnh</Button>
          </div>
        </div>
      </Form.Item>
      <div className='mt-6 flex justify-end'>
        <Button onClick={handleSubmit(onSubmit)}>Sửa</Button>
      </div>
    </Form>
  )
}

export default EditParentCategory
