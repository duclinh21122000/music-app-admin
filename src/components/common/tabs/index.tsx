import type { TabsProps } from '@nextui-org/react'
import { Tab, Tabs as NextTabs } from '@nextui-org/react'
import React from 'react'

import type { ITabItem } from '@/utils/interface/ITabItem'

type ITabProps = Omit<TabsProps, 'children' | 'content'> & {
  tabItems: ITabItem[]
}

const Tabs = ({ tabItems, color = 'primary', ...rest }: ITabProps) => {
  return (
    <NextTabs color={color} {...rest} items={tabItems} disableAnimation>
      {tabItems.map((item) => (
        <Tab key={item.key} title={item.title}>
          {item.content}
        </Tab>
      ))}
    </NextTabs>
  )
}

export default Tabs
