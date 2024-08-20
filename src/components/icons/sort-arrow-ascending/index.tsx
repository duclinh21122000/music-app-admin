import type { IIconProps } from '../IIconProps'

const IconSortArrowAscending = ({
  width = 24,
  className = '',
  color = '#121926',
}: IIconProps) => {
  return (
    <svg
      width={width}
      height={width}
      color={color}
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='Sort order=&#226;&#134;&#145; ascending'>
        <g id='Group 156'>
          <path
            id='Vector'
            d='M16.0902 9.0476L14.124 7.08139L12.9234 5.87471C12.4151 5.36631 11.5881 5.36631 11.0797 5.87471L7.90685 9.0476C7.49033 9.46412 7.79047 10.1746 8.37237 10.1746H11.8086H15.6247C16.2127 10.1746 16.5067 9.46412 16.0902 9.0476Z'
            fill='currentColor'
          />
          <path
            id='Vector_2'
            d='M15.6252 13.8254H11.8092H8.37289C7.78486 13.8254 7.49085 14.5359 7.90737 14.9524L11.0803 18.1253C11.5887 18.6337 12.4156 18.6337 12.924 18.1253L14.1306 16.9186L16.0969 14.9524C16.5073 14.5359 16.2132 13.8254 15.6252 13.8254Z'
            fill='#9AA4B2'
          />
        </g>
      </g>
    </svg>
  )
}

export default IconSortArrowAscending
