'use client'

import React from 'react'

import Button from '@/components/common/button'
import Card from '@/components/common/card'
import MediaUpload from '@/components/common/media-upload'
import { useModal } from '@/utils/hooks/useModal'

import MediaUploadList from './list'

const MediaUploadContainer = () => {
  const { open, onOpen, onClose } = useModal()
  return (
    <>
      <Card>
        <div className='mb-6 flex items-center justify-between'>
          <h3 className='text-[22px] font-medium text-[#2C323F]'>
            Thư viện hình ảnh
          </h3>
          <Button onClick={() => onOpen()}>Upload</Button>
        </div>
        <MediaUploadList />
      </Card>
      <MediaUpload open={open} onClose={onClose} />
    </>
  )
}

export default MediaUploadContainer
