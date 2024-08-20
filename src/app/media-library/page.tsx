import React from 'react'

import AppLayoutAdminMain from '@/components/layouts/admin/app-layout-admin'
import MediaUploadContainer from '@/features/media-upload/container'

const MediaLibraryPage = () => {
  return (
    <AppLayoutAdminMain title='Thư viện hình ảnh'>
      <MediaUploadContainer />
    </AppLayoutAdminMain>
  )
}

export default MediaLibraryPage
