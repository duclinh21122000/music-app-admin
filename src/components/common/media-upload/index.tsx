// import { Tab, Tabs } from '@nextui-org/react'
import React from 'react'

import type { IAssets } from '@/services/models/IAssets'
import type { ITabItem } from '@/utils/interface/ITabItem'

import Modal from '../modal'
import Tabs from '../tabs'
import TabImage from './tab-image'
import TabUpload from './tab-upload'

interface MediaUploadProps {
  open: boolean
  isSelectMultipleImage?: boolean
  onClose: () => void
  onSelectImage?: (item: IAssets[]) => void
}

const MediaUpload = ({
  open,
  isSelectMultipleImage = false,
  onClose,
  onSelectImage,
}: MediaUploadProps) => {
  const TAB_MEDIA_UPLOAD: ITabItem[] = [
    {
      key: 'upload',
      title: 'Upload',
      content: <TabUpload />,
    },
    {
      key: 'image',
      title: 'Hình ảnh',
      content: (
        <TabImage
          isMultiple={isSelectMultipleImage}
          onSelectImage={onSelectImage && onSelectImage}
          onClose={onClose}
        />
      ),
    },
  ]

  const TabMediaUploadArr = !onSelectImage
    ? TAB_MEDIA_UPLOAD.filter((item) => item.key !== 'image')
    : TAB_MEDIA_UPLOAD

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      showFooter={false}
      header={<div>Upload Image</div>}
      size='5xl'
      className='p-4'
    >
      <div className='mt-4'>
        <Tabs tabItems={TabMediaUploadArr} color='primary' />
      </div>
    </Modal>
  )
}

export default MediaUpload
