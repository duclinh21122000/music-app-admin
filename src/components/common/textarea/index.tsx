import type { TextAreaProps } from '@nextui-org/react'
import { Textarea as NextTextarea } from '@nextui-org/react'

const Textarea = ({ classNames, ...rest }: TextAreaProps) => {
  return (
    <NextTextarea
      classNames={{
        errorMessage: 'text-sm',
        inputWrapper: 'bg-white shadow-none border border-border-200',
        input: 'resize-y min-h-[100px]',
        ...classNames,
      }}
      disableAutosize
      aria-label='Textarea'
      {...rest}
    />
  )
}

export default Textarea
