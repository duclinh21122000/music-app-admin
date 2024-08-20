import type { InputProps } from '@nextui-org/react'
import { Input as NextInput } from '@nextui-org/react'
import React from 'react'

const Input = ({ ...rest }: InputProps) => {
  const { color } = rest
  return (
    <NextInput
      color={color}
      {...rest}
      classNames={{
        inputWrapper: 'bg-white shadow-none border border-border-200',
      }}
    />
  )
}

export default Input
