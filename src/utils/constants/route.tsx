export const ROUTE_PATH = {
  login: '/login',
  forgot_password: '/forgot-password',
  admin: {
    dashboard: '/',
    mediaLibrary: '/media-library',
    users: {
      users: '/users',
      all: '/users/all',
      add: '/users/add',
      edit: '/users/edit',
    },
    categories: {
      categories: '/categories',
      all_parent_categories: '/categories/parent-categories/all',
      add_parent_categories: '/categories/parent-categories/add',
      edit_parent_categories: '/categories/parent-categories/edit',
      all_child_categories: '/categories/child-categories/all',
      add_child_categories: '/categories/child-categories/add',
      edit_child_categories: '/categories/child-categories/edit',
    },
    musics: {
      musics: '/musics',
      all: '/musics/all',
      add: '/musics/add',
      edit: '/musics/edit',
    },
    blog: {
      blog: '/blog',
      all: '/blog/all',
      add: '/blog/add',
      edit: '/blog/edit',
      all_category: '/blog/categories/all',
      add_category: '/blog/categories/add',
      edit_category: '/blog/categories/edit',
    },
    order: {
      order: '/order',
      all: '/order',
      pending: '/order/pending',
    },
    coupon: {
      coupon: '/coupon',
    },
    setting: {
      setting: '/setting',
    },
  },
}

export const ROUTE_NAME = {}
