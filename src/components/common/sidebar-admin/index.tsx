import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

import IconArrowDown from '@/components/icons/arrow-down'
import { MENU_ADMIN } from '@/utils/constants/menu'

const SidebarAdmin = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [activeSubMenu, setActiveSubMenu] = React.useState<number | null>(null)

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault()
    if (path) {
      router.push(path)
    }
  }

  const handleOpenSubMenu = (keyMenu: number, isParentMenu: boolean) => {
    if (isParentMenu) {
      !activeSubMenu || activeSubMenu !== keyMenu
        ? setActiveSubMenu(keyMenu)
        : setActiveSubMenu(null)
    }
  }

  return (
    <div className='fixed inset-y-sidebar bottom-0 w-sidebar bg-white'>
      <div className='size-full overflow-y-auto p-4'>
        <div>
          {MENU_ADMIN.map((item, idx) => {
            const pathNameParent = !item.subMenu ? item.path : ''
            const isHasSubMenu = item.subMenu ? true : false
            const isActiveMenu =
              pathname.toString().split('/', 2).join('/') === item.path
            const isActiveSubmenu = activeSubMenu === item.key

            return (
              <div key={idx} className='mb-2'>
                <div>
                  <a
                    href={pathNameParent}
                    onClick={(e) => {
                      handleNavigation(e, pathNameParent)
                      if (item.subMenu) {
                        handleOpenSubMenu(item.key, isHasSubMenu)
                      }
                    }}
                    className={`relative flex w-full items-center py-3 ${
                      isActiveMenu ? 'text-primary' : 'text-[#6f6f6f]'
                    }`}
                  >
                    <span className='mr-2 inline-flex size-5 items-center'>
                      {item.icon}
                    </span>
                    <span className='text-[16px]'>{item.title}</span>
                    {item.subMenu && (
                      <span className='absolute right-0 top-1/2 size-3 -translate-y-1/2'>
                        <IconArrowDown />
                      </span>
                    )}
                  </a>
                </div>
                {item.subMenu && isActiveSubmenu && (
                  <div className='block'>
                    {item.subMenu.map((itemSub, subIdx) => {
                      const isActiveLinkSubmenu = pathname === itemSub.path
                      return (
                        <div key={subIdx}>
                          <a
                            href={itemSub.path}
                            onClick={(e) => handleNavigation(e, itemSub.path)}
                            className={`block p-sub-menu text-[14px] ${
                              isActiveLinkSubmenu
                                ? 'text-primary'
                                : 'text-[#6f6f6f]'
                            }`}
                          >
                            {itemSub.title}
                          </a>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SidebarAdmin
