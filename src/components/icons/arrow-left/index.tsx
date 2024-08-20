import type { IIconProps } from '../IIconProps'

const IconArrowLeft = ({ className, color, width = 16 }: IIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={width}
      viewBox='0 0 16 16'
      fill='none'
      className={className}
      color={color}
    >
      <path
        d='M9.99994 12.6666L6.32541 8.82483C5.89145 8.37113 5.89145 7.62871 6.32541 7.175L9.99994 3.33325'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default IconArrowLeft
