import IconGrid from '@/components/icons/icon-grid'
import IconMedia from '@/components/icons/icon-media'
import IconMusic from '@/components/icons/icon-music'
import IconNews from '@/components/icons/icon-new'
import IconTable from '@/components/icons/icon-table'
import IconUserHouse from '@/components/icons/icon-user-house'

import type { IMenuItem } from '../interface/IMenuItem'
import { ROUTE_PATH } from './route'

export const MENU_ADMIN: IMenuItem[] = [
  {
    key: 1,
    title: 'Dashboard',
    path: ROUTE_PATH.admin.dashboard,
    icon: <IconGrid />,
  },
  {
    key: 2,
    title: 'Thư viện hình ảnh',
    path: ROUTE_PATH.admin.mediaLibrary,
    icon: <IconMedia />,
  },
  {
    key: 3,
    title: 'Quản lý người dùng',
    path: ROUTE_PATH.admin.users.users,
    icon: <IconUserHouse />,
    subMenu: [
      {
        key: 1,
        title: 'Danh sách người dùng',
        path: ROUTE_PATH.admin.users.all,
      },
      {
        key: 2,
        title: 'Tạo người dùng mới',
        path: ROUTE_PATH.admin.users.add,
      },
    ],
  },
  {
    key: 4,
    title: 'Quản lý danh mục',
    path: ROUTE_PATH.admin.categories.categories,
    icon: <IconTable />,
    subMenu: [
      {
        key: 1,
        title: 'Danh mục cha',
        path: ROUTE_PATH.admin.categories.all_parent_categories,
      },
      {
        key: 2,
        title: 'Danh mục phụ',
        path: ROUTE_PATH.admin.categories.all_child_categories,
      },
    ],
  },
  {
    key: 5,
    title: 'Quản lý bài hát',
    path: ROUTE_PATH.admin.musics.musics,
    icon: <IconMusic />,
    subMenu: [
      {
        key: 1,
        title: 'Danh sách bài hát',
        path: ROUTE_PATH.admin.musics.all,
      },
      {
        key: 2,
        title: 'Thêm bài hát mới',
        path: ROUTE_PATH.admin.musics.add,
      },
    ],
  },
  {
    key: 6,
    title: 'Bài viết',
    path: ROUTE_PATH.admin.blog.blog,
    icon: <IconNews />,
    subMenu: [
      {
        key: 1,
        title: 'Danh sách bài viết',
        path: ROUTE_PATH.admin.blog.all,
      },
      {
        key: 2,
        title: 'Danh mục bài viết',
        path: ROUTE_PATH.admin.blog.all_category,
      },
    ],
  },
]
