import { usePathname, useRouter } from 'next/navigation'
import React, { useMemo } from 'react'

import type { ISubMenuItem } from '@/utils/interface/IMenuItem'

type SubMenuProps = {
  item: ISubMenuItem
}

const SubMenu = ({ item }: SubMenuProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const { title, path } = item

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault()

    router.push(path)
  }

  const isActive = useMemo(() => path === pathname, [path, pathname])

  return (
    <div>
      <a
        href={path}
        onClick={(e) => handleNavigation(e, path)}
        className={`block p-sub-menu text-[14px] ${
          isActive ? 'font-bold text-primary' : 'text-[#6f6f6f]'
        }`}
      >
        {title}
      </a>
    </div>
  )
}

export default SubMenu
