import { useRouter } from 'next/navigation'
import React from 'react'

import { Image } from '@/components/common/image'
import { Table } from '@/components/common/table'
import type { ColumnProps } from '@/components/common/table/type'
import IconActionDelete from '@/components/icons/action-delete'
import IconActionEdit from '@/components/icons/action-edit'
import { ROUTE_PATH } from '@/utils/constants/route'
import { ParentCategories } from '@/utils/data/parent-category'

const AllParentCategory = () => {
  const router = useRouter()

  const columns: ColumnProps[] = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      width: '80px',
      render: (text: any, record: any, index: number) => {
        return <div>{index + 1}</div>
      },
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: '180px',
      render: (image, record) => {
        return (
          <div className='size-[100px]'>
            <Image
              src={`/assets/images/${image?.name}`}
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
      title: 'Tên danh mục',
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
        const actionItemStyle =
          'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#F7F7FA] text-[#52536D] hover:bg-primary hover:text-[#fff]'
        return (
          <>
            <div className='flex items-center justify-center gap-3'>
              <div
                className={actionItemStyle}
                onClick={() =>
                  router.push(
                    `${ROUTE_PATH.admin.categories.edit_parent_categories}/${record.id}`,
                  )
                }
              >
                <span>
                  <IconActionEdit />
                </span>
              </div>
              <div
                className={actionItemStyle}
                onClick={() => {
                  // setSelectedItemDelete(record)
                  // onOpen()
                }}
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

  const dataSource = ParentCategories?.map((item: any) => ({ ...item })) || []

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        layoutBorder
        showPagination
        // pagination={{
        //   position: PAGINATION_POSITION.BOTTOM_RIGHT,
        //   current: pagination.page,
        //   pageSize: pagination.perPage,
        //   total: totalRecords,
        //   onChange: onPageChange,
        // }}
        showHeader
        // loading={loading}
        rowKey={'id'}
      />
    </>
  )
}

export default AllParentCategory
