import type { IIconProps } from '../IIconProps'

const Expand = ({ width = 20, className = '' }: IIconProps) => {
  return (
    <svg
      width={width}
      height={width}
      className={className}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='linear/maximize-4'>
        <g id='vuesax/linear/maximize-4'>
          <g id='maximize-4'>
            <path
              id='Vector'
              d='M14 6V2H10'
              stroke='#9AA4B2'
              strokeWidth='1.33'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              id='Vector_2'
              d='M2 10V14H6'
              stroke='#9AA4B2'
              strokeWidth='1.33'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              id='Line'
              d='M14 2L9 7'
              stroke='#9AA4B2'
              strokeWidth='1.33'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              id='Line_2'
              d='M7 9L2 14'
              stroke='#9AA4B2'
              strokeWidth='1.33'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Expand
