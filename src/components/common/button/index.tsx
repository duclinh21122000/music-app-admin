import type { ButtonProps } from '@nextui-org/react'
import { Button as NextButton } from '@nextui-org/react'

const Button = ({ color = 'primary', children, ...rest }: ButtonProps) => {
  return (
    <NextButton color={color} {...rest}>
      {children}
    </NextButton>
  )
}

export default Button
