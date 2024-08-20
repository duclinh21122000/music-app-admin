import React from 'react'

import AppLayoutAdminMain from '@/components/layouts/admin/app-layout-admin'
import EditParentCategoryContainer from '@/features/parent-category/edit/container'

const EditParentCategoryPage = () => {
  return (
    <AppLayoutAdminMain title='Chỉnh sửa danh mục cha'>
      <EditParentCategoryContainer />
    </AppLayoutAdminMain>
  )
}

export default EditParentCategoryPage
