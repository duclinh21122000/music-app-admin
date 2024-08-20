import type React from 'react'

export interface IMenuItem {
  key: number
  title: string
  path: string
  icon?: React.ReactElement
  subMenu?: ISubmenuItem[]
}

interface ISubmenuItem {
  key: number
  title: string
  path: string
  keyParent?: number
  icon?: React.ReactElement
}
