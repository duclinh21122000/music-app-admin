import type { ReactNode } from 'react'

export interface ITabItem {
  key: string | number
  title: ReactNode
  content?: ReactNode
  href?: string
}
