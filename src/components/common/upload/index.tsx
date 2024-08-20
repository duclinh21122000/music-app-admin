import type { ChangeEvent } from 'react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import IconDOCX from '@/components/icons/docx'
import IconPDF from '@/components/icons/pdf'
import IconUpload from '@/components/icons/upload'
import { UPLOAD_TYPE } from '@/utils/constants'

import { Image } from '../image'
import IconRemove from '../remove'

interface File extends Blob {
  readonly lastModified: number
  readonly name: string
  readonly webkitRelativePath: string
  readonly type: string
}

interface Item {
  url: string
  name: string
  type: string
}

interface UploadProps {
  acceptedFileTypes?: string[] | null
  width?: string
  maxFileSize?: number
  allowMultiple?: boolean
  labelAlt?: string
  percent?: number
  isUpload?: boolean
  maxLength?: number
  onFileChange?: (file: File[]) => void
  onChange?: (file: File[]) => void
  classes?: React.ComponentProps<'div'>['className']
  children?: React.ReactNode
  description?: React.ReactNode
  defaultValues?: (string | Item | File)[]
  register?: object
  hasValue?: boolean
  placeholder?: string
}

export const Upload = (props: UploadProps) => {
  const {
    acceptedFileTypes,
    width = '100%',
    maxFileSize = 5,
    maxLength,
    allowMultiple = false,
    labelAlt = '',
    percent = 0,
    isUpload = false,
    onFileChange = () => {},
    onChange = () => {},
    classes,
    children,
    description,
    register,
    defaultValues = [],
    hasValue = true,
    placeholder = '',
  } = props

  const MAX_FILE_BYTES = maxFileSize * 1024 * 1024 // MB to bytes
  const [fileList, setFileList] =
    useState<(string | Item | File)[]>(defaultValues)
  const [visible, setVisible] = useState(false)
  const [fileErrors, setFileErrors] = useState('')

  const fileSelectedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files)
      let isValid = true // Flag to check if all files are valid
      let fileErrors = ''
      if (maxLength && fileList.length >= maxLength) {
        fileErrors = `Can not upload files more than ${maxLength}`
        isValid = false
      }

      for (const file of files) {
        if (file.size > MAX_FILE_BYTES) {
          fileErrors = `File size cannot exceed ${maxFileSize}MB.`
          isValid = false
        }
        if (acceptedFileTypes && !acceptedFileTypes.includes(file.type)) {
          fileErrors =
            'File type not accepted. Accepted types: ' +
            acceptedFileTypes.join(', ')
          isValid = false
        }
      }

      if (!isValid) {
        setVisible(true)
        setFileErrors(fileErrors)
      } else {
        const newFileList: any = [...fileList, ...files]
        setFileList((prev: any) => [...prev, ...files])
        onFileChange(newFileList)
        onChange(newFileList)
      }
    }
  }

  const fileRemove = (index: number) => {
    const fileListCopy: any = [...fileList]
    fileListCopy.splice(index, 1)
    setFileList(fileListCopy)
    onFileChange(fileListCopy)
    onChange(fileListCopy)
  }

  const getClassContainer = () => {
    let classContainer = 'relative form-control w-full flex flex-col gap-2'
    if (children) {
      classContainer += ' items-start text-primary-500'
    } else {
      classContainer +=
        ' px-6 py-4 items-center self-stretch text-text-primary border border-border-200 hover:border-primary-500 border-dashed bg-bg-secondary rounded-xl transition-all'
    }
    return classContainer
  }

  useEffect(() => {
    if (!hasValue) setFileList([])
  }, [hasValue])

  useEffect(() => {
    if (visible && fileErrors) {
      toast.error(fileErrors)
    }
  }, [visible, fileErrors])

  const renderThumbnail = (item: string | Item | File) => {
    if (typeof item !== 'string') {
      switch (item.type) {
        case UPLOAD_TYPE.PDF_TYPE:
          return <IconPDF />
        case UPLOAD_TYPE.DOC_TYPE:
        case UPLOAD_TYPE.DOCX_TYPE:
          return <IconDOCX />
        default:
          return (
            <Image
              height={30}
              width={30}
              alt='Image'
              src={
                typeof item === 'string'
                  ? item
                  : item instanceof File
                  ? URL.createObjectURL(item)
                  : typeof item === 'object'
                  ? item.url
                  : ''
              }
            />
          )
      }
    }
  }

  return (
    <div
      className={`flex flex-col text-sm ${classes}`}
      style={{
        width: width,
      }}
    >
      <div className={getClassContainer()}>
        {children || (
          <>
            <IconUpload width={48} />

            <>
              <div className='flex flex-col items-center'>
                <span className='text-xs font-medium leading-5 text-primary'>
                  Drag & drop your file here
                </span>
                <span className='text-xs'>
                  or <span className='text-xs text-primary-500'>browse</span> to
                  upload a file
                </span>
              </div>
              {placeholder ? (
                <span className='w-full break-words px-6 text-center text-xs text-gray-500'>
                  {placeholder}
                </span>
              ) : (
                <div className='flex flex-col items-center'>
                  <span className='text-xs leading-4 tracking-wider text-gray-500'>
                    File size should not be more than {maxFileSize}Mb.
                  </span>
                  <span className='text-xs leading-4 tracking-wider text-gray-500'>
                    Supported file: {labelAlt}
                  </span>
                </div>
              )}
            </>
          </>
        )}
        <input
          type='file'
          id='files'
          title=''
          className='absolute left-0 top-0 size-full cursor-pointer text-transparent opacity-0 file:absolute file:size-full file:cursor-pointer '
          onChange={fileSelectedHandler}
          accept={acceptedFileTypes ? acceptedFileTypes.join(',') : undefined}
          multiple={allowMultiple}
          value=''
          {...register}
        />
      </div>
      {description}

      {fileList.length ? (
        <div className=' mt-2 flex flex-col-reverse gap-2'>
          {fileList.map((item, index) => (
            <div
              key={index}
              className='flex flex-col gap-1 overflow-hidden rounded-lg border border-border-200 text-xs'
            >
              <div className='grid grid-cols-[30px_minmax(0,_1fr)_16px] items-center gap-2 p-3'>
                <span style={{ width: 30 }}>{renderThumbnail(item)}</span>
                <div className='grow break-all text-sm font-normal text-primary'>
                  {typeof item === 'string' ? '' : item.name}
                </div>
                <div onClick={() => fileRemove(index)}>
                  <IconRemove width={16} className='cursor-pointer' />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {isUpload && percent && percent < 100 && (
        <div className='flex items-center gap-2'>
          <progress
            className='h-[4px] w-full overflow-hidden rounded'
            value={percent}
            max='100'
          />
          <span>{percent}%</span>
        </div>
      )}
    </div>
  )
}
