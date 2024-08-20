import type { PopoverProps } from '@nextui-org/react'
import {
  Popover as NextPopover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import type { ReactNode } from 'react'
import React from 'react'

type IPopoverProps = Omit<PopoverProps, 'children' | 'content'> & {
  children?: ReactNode
  content?: ReactNode
  trigger?: ReactNode
}

export default function Popover({ content, children, ...rest }: IPopoverProps) {
  return (
    <NextPopover
      classNames={{
        content: 'shadow-lg shadow-gray-300/40 border border-gray-100',
      }}
      {...rest}
      aria-label='Popover'
    >
      <PopoverTrigger aria-label='Popover'>
        <div>{children}</div>
      </PopoverTrigger>
      <PopoverContent className='rounded-lg' aria-label='Popover'>
        {content}
      </PopoverContent>
    </NextPopover>
  )
}
