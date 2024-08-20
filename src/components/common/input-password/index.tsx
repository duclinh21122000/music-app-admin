import type { InputProps } from '@nextui-org/react'
import React from 'react'

import IconEyeInvisible from '@/components/icons/eye-invisible'
import IconEyeTwoTone from '@/components/icons/eye-two-tone'

import Input from '../input'

const InputPassword = ({ ...rest }: InputProps) => {
  const { color } = rest
  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <Input
      type={isVisible ? 'text' : 'password'}
      color={color}
      endContent={
        <button
          className='focus:outline-none'
          type='button'
          onClick={toggleVisibility}
          aria-label='toggle password visibility'
        >
          {isVisible ? (
            <IconEyeTwoTone width={14} />
          ) : (
            <IconEyeInvisible width={14} />
          )}
        </button>
      }
      autoComplete='off'
      {...rest}
    />
  )
}

export default InputPassword
