import React from 'react'

import IconEmpty from '@/components/icons/empty'

export interface EmptyProps {
  description?: string
  src?: React.ReactNode
  height?: number
}

export const Empty = (props: EmptyProps) => {
  const { description = '', src, height } = props
  return (
    <div
      style={{ height }}
      className='flex size-full flex-col items-center justify-center truncate bg-primary p-3 text-sm'
    >
      {src || <IconEmpty />}
      <p className='mt-4 w-full truncate text-center font-medium text-primary'>
        {description || 'Không có dữ liệu'}
      </p>
    </div>
  )
}
