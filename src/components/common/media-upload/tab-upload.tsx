import React from 'react'

import Button from '../button'
import { Upload } from '../upload'

// interface TabUploadProps {
//   refresh?: () => void
// }

const TabUpload = () => {
  const [files, setFiles] = React.useState<File[]>([])

  const handleOnFileChange = (files: File[]) => {
    setFiles(files)
  }

  const handleUpload = async () => {
    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
    }
  }

  return (
    <div>
      <Upload
        onFileChange={handleOnFileChange}
        maxLength={5}
        // acceptedFileTypes={['image/png, image/jpeg']}
      />
      <div className='mt-8 flex justify-end'>
        <Button onClick={handleUpload}>Upload</Button>
      </div>
    </div>
  )
}

export default TabUpload
