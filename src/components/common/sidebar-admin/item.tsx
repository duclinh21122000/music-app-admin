import { usePathname, useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'

import IconArrowDown from '@/components/icons/arrow-down'
import type { IMenuItem } from '@/utils/interface/IMenuItem'

import SubMenu from './sub-menu'

type SidebarItemProps = {
  item: IMenuItem
  pathNameParent: string
}

const SidebarItem = ({ item, pathNameParent }: SidebarItemProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(false)

  const { title, path, icon, subMenu } = item

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault()

    if (subMenu && subMenu.length > 0) {
      return setExpanded(!expanded)
    }
    if (path) {
      router.push(path)
    }
  }

  const isActive = useMemo(() => {
    if (subMenu && subMenu.length > 0) {
      if (subMenu.find((item) => item.path === pathname)) {
        setExpanded(true)
        return true
      }
    }

    return path === pathname
  }, [subMenu, path, pathname])

  return (
    <div className='mb-2'>
      <div>
        <a
          href={pathNameParent}
          onClick={(e) => {
            handleNavigation(e, pathNameParent)
          }}
          className={`relative flex w-full items-center py-3 ${
            isActive ? 'font-bold text-primary' : 'text-[#6f6f6f]'
          }`}
        >
          <span className='mr-2 inline-flex size-5 items-center'>{icon}</span>
          <span className='text-[16px]'>{title}</span>
          {subMenu && (
            <span className='absolute right-0 top-1/2 size-3 -translate-y-1/2'>
              <IconArrowDown />
            </span>
          )}
        </a>
      </div>
      {subMenu && subMenu.length && expanded && (
        <div className='block'>
          {subMenu.map((itemSub, subIdx) => (
            <SubMenu key={subIdx} item={itemSub} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SidebarItem
