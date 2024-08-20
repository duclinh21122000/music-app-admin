import React from 'react'

import IconCheck from '@/components/icons/check'
import type { IAssets } from '@/services/models/IAssets'
import { Assets } from '@/utils/data/assets'

import Button from '../button'

interface TabImageProps {
  isMultiple?: boolean
  onSelectImage?: (item: IAssets[]) => void
  onClose: () => void
}

const TabImage = ({
  isMultiple = false,
  onSelectImage,
  onClose,
}: TabImageProps) => {
  const [selectedImage, setSelectedImage] = React.useState<IAssets[]>([])

  const handleItemSelect = (item: IAssets) => {
    if (isMultiple) {
      const isItemSelected = selectedImage.includes(item)
      if (isItemSelected) {
        setSelectedImage(
          selectedImage.filter((selectedItem) => selectedItem.id !== item.id),
        )
      } else {
        setSelectedImage([...selectedImage, item])
      }
    } else {
      setSelectedImage([item])
    }
  }

  return (
    <>
      <div className='flex flex-wrap items-center gap-2'>
        {Assets.map((item: IAssets, idx: number) => {
          const isItemSelected = selectedImage.includes(item)
          const activeClass = isItemSelected
            ? 'border-primary'
            : 'border-transparent'
          return (
            <div
              key={idx}
              className={`relative size-[120px] cursor-pointer border-3 border-solid ${activeClass}`}
              onClick={() => handleItemSelect(item)}
            >
              <img
                src={`/assets/images/${item.name}`}
                alt={item.originalname}
                style={{ objectFit: 'cover' }}
                className='size-full'
              />
              {isItemSelected && onSelectImage && (
                <div className='absolute left-0 top-0 flex size-full items-center justify-center bg-[rgba(0,0,0,0.2)] text-white'>
                  <span className='size-12'>
                    <IconCheck />
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
      {onSelectImage && (
        <div className='mt-4 flex justify-end'>
          <Button
            onClick={() => {
              onSelectImage(selectedImage)
              onClose()
            }}
          >
            Chọn ảnh
          </Button>
        </div>
      )}
    </>
  )
}

export default TabImage
