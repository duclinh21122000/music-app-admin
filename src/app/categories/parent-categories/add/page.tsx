import React from 'react'

import AppLayoutAdminMain from '@/components/layouts/admin/app-layout-admin'
import AddParentCategoryContainer from '@/features/parent-category/add/container'

const AddParentCategoryPage = () => {
  return (
    <AppLayoutAdminMain title='Thêm danh mục cha'>
      <AddParentCategoryContainer />
    </AppLayoutAdminMain>
  )
}

export default AddParentCategoryPage
