import React from 'react'

import AppLayoutAdminMain from '@/components/layouts/admin/app-layout-admin'
import AllParentCategoryContainer from '@/features/parent-category/all/container'

const AllParentCategoryPage = () => {
  return (
    <AppLayoutAdminMain title='Danh sách danh mục cha'>
      <AllParentCategoryContainer />
    </AppLayoutAdminMain>
  )
}

export default AllParentCategoryPage
