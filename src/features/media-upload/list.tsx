import React from 'react'

import { Image } from '@/components/common/image'
import { Table } from '@/components/common/table'
import type { ColumnProps } from '@/components/common/table/type'
import IconActionDelete from '@/components/icons/action-delete'
import { Assets } from '@/utils/data/assets'

const MediaUploadList = () => {
  const columns: ColumnProps[] = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      width: '80px',
      render: (_value: number, _record: string, idx: number) => {
        return <span>{idx + 1}</span>
      },
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: '180px',
      render: (_value, record) => {
        return (
          <div className='w-[100px]'>
            <Image
              src={`/assets/images/${record?.name}`}
              alt={record.name}
              width={'100px'}
              height={'100px'}
              objectFit='contain'
            />
          </div>
        )
      },
    },
    {
      title: 'Tên hình ảnh',
      dataIndex: 'name',
      key: 'name',
      width: '250px',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      headerAlign: 'center',
      width: '180px',
      render: (_data, record) => {
        console.log(record)

        const actionItemStyle =
          'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#F7F7FA] text-[#52536D] hover:bg-primary hover:text-[#fff]'
        return (
          <>
            <div className='flex items-center justify-center gap-3'>
              <div
                className={actionItemStyle}
                // onClick={() => {
                //   setSelectedItemDelete(record)
                //   onOpen()
                // }}
              >
                <span>
                  <IconActionDelete />
                </span>
              </div>
            </div>
          </>
        )
      },
    },
  ]

  const dataSource = Assets.map((item: any) => ({ ...item })) || []

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      layoutBorder
      size='middle'
      showPagination
      pagination={{
        current: 1,
        pageSize: 2,
        total: Assets.length,
        // onChange: onPageChange,
      }}
      // loading={loading}
    />
  )
}

export default MediaUploadList
