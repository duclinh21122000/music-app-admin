import React from 'react'

import { MENU_ADMIN } from '@/utils/constants/menu'

import SidebarItem from './item'

const SidebarAdmin = () => {
  return (
    <div className='fixed inset-y-sidebar bottom-0 w-sidebar bg-white'>
      <div className='size-full overflow-y-auto p-4'>
        <div>
          {MENU_ADMIN.map((item, idx) => {
            const pathNameParent = !item.subMenu ? item.path : ''
            return (
              <SidebarItem
                key={idx}
                item={item}
                pathNameParent={pathNameParent}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SidebarAdmin
