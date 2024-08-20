import type { ChangeEvent, CSSProperties } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import IconArrowLeft from '@/components/icons/arrow-left'
import IconArrowRight from '@/components/icons/arrow-right'
import IconDoubleArrowLeft from '@/components/icons/double-arrow-left'
import IconDoubleArrowRight from '@/components/icons/double-arrow-right'
import IconHorizontalDots from '@/components/icons/horizontal-dots'

import { Select } from '../select'
import { paginationStyles } from './style'

export interface PaginationProps {
  current?: number
  defaultCurrent?: number
  disabled?: boolean
  itemRender?: ((pageNumber: number) => React.ReactNode) | null
  pageSize?: number
  defaultPageSize?: number
  pageSizeOptions?: string[]
  showQuickJumper?: boolean
  showSizeChanger?: boolean
  showTotal?: boolean
  total?: number
  onChange?: (page: number, pageSize: number) => void
  onShowSizeChange?: (newPageSize: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  current = 1,
  defaultCurrent = 1,
  pageSize = 10,
  defaultPageSize = 10,
  total = 0,
  showTotal = false,
  showQuickJumper = false,
  showSizeChanger = false,
  disabled = false,
  pageSizeOptions = ['10', '25', '50', '100'],
  itemRender = null,
  onChange = () => {},
}) => {
  const quickJumpRef = useRef<HTMLInputElement>(null)
  const [currentPage, setCurrentPage] = useState(defaultCurrent)
  const [currentPageSize, setCurrentPageSize] = useState(defaultPageSize)

  const totalPages = Math.ceil(total / currentPageSize)
  const showingFrom = (currentPage - 1) * currentPageSize + 1
  const showingTo =
    currentPage >= totalPages ? total : currentPage * currentPageSize

  const handlePageChange = (newPage: number): void => {
    if (newPage !== currentPage && !disabled) {
      setCurrentPage(newPage)
      onChange(newPage, currentPageSize)
    }
  }

  const handlePageSizeChange = (value: string | string[]) => {
    if (!value.length) return defaultPageSize
    const newPageSize = parseInt(value.toString(), 10)
    if (newPageSize !== currentPageSize && !disabled) {
      setCurrentPageSize(newPageSize)
      onChange(
        newPageSize * currentPage > total
          ? Math.ceil(total / newPageSize)
          : currentPage,
        newPageSize,
      )
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1 && !disabled) {
      const newPage = currentPage - 1
      setCurrentPage(newPage)
      onChange(newPage, currentPageSize)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages && !disabled) {
      const newPage = currentPage + 1
      setCurrentPage(newPage)
      onChange(newPage, currentPageSize)
    }
  }

  const handleDoublePrevious = () => {
    if (currentPage > 1 && !disabled) {
      const newPage = currentPage - 5 >= 1 ? currentPage - 5 : 1
      setCurrentPage(newPage)
      onChange(newPage, currentPageSize)
    }
  }

  const handleDoubleNext = () => {
    if (currentPage < totalPages && !disabled) {
      const newPage =
        currentPage + 5 <= totalPages ? currentPage + 5 : totalPages
      setCurrentPage(newPage)
      onChange(newPage, currentPageSize)
    }
  }

  const quickJump = (value: string) => {
    const pageNumber = parseInt(value)
    let newPage = isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber
    if (newPage >= totalPages) newPage = totalPages
    if (newPage !== currentPage && !disabled) {
      setCurrentPage(newPage)
      onChange(newPage, currentPageSize)
      if (quickJumpRef.current) {
        quickJumpRef.current.value = ''
      }
    }
  }
  const handleQuickJump = (event: ChangeEvent<HTMLInputElement>) => {
    quickJump(event.target.value)
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation()
    if (event.key === 'Enter') {
      quickJump(event.currentTarget.value)
    }
  }

  useEffect(() => {
    if (currentPageSize * currentPage > total) setCurrentPage(totalPages)
  }, [currentPageSize])

  useEffect(() => {
    if (current) setCurrentPage(current)
  }, [current])

  useEffect(() => {
    if (pageSize) setCurrentPageSize(pageSize)
  }, [pageSize])

  const borderHoverClass = `${
    disabled
      ? '!cursor-not-allowed'
      : 'hover:border-primary-500 hover:text-primary-500'
  }`

  const renderPageNumbers = (): React.ReactNode => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers.map((pageNumber) => {
      const styleData: { display: string; border: string } = {
        display: '',
        border: '',
      }
      let display = 'none'
      if (currentPage <= 3 && pageNumber <= 5) display = 'flex'
      if (currentPage >= totalPages - 3 && pageNumber > totalPages - 5)
        display = 'flex'
      if (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2) {
        display = 'flex'
      }
      styleData.display = display

      const isMultiDot = currentPage >= 5 && currentPage <= totalPages - 4

      // Check previous dots exist
      const previousDots =
        isMultiDot && currentPage >= 5 && pageNumber === currentPage - 3

      // Check next dots exist
      const nextDots =
        isMultiDot &&
        currentPage <= totalPages - 4 &&
        pageNumber === currentPage + 3

      const rightDots = currentPage < 5 && pageNumber === totalPages - 1
      const leftDots = currentPage > totalPages - 4 && pageNumber === 2

      const renderNumber = (style?: CSSProperties) => (
        <li
          key={pageNumber}
          className={paginationStyles.item({
            disabled,
            active: pageNumber === currentPage,
          })}
          style={style}
          onClick={() => handlePageChange(pageNumber)}
        >
          {itemRender ? itemRender(pageNumber) : pageNumber}
        </li>
      )

      const dots = (position: string) => (
        <li
          onClick={
            position === 'left' ? handleDoublePrevious : handleDoubleNext
          }
          key={pageNumber}
          className={paginationStyles.dot({ disabled })}
        >
          <span className='block group-hover:hidden'>
            <IconHorizontalDots />
          </span>
          <span className='hidden group-hover:block'>
            {position === 'left' ? (
              <IconDoubleArrowLeft className='text-primary-500' />
            ) : (
              <IconDoubleArrowRight className='text-primary-500' />
            )}
          </span>
        </li>
      )

      if (totalPages <= 8) return renderNumber()
      if (pageNumber === 1 || pageNumber === totalPages) return renderNumber()
      if (isMultiDot) {
        if (previousDots) return dots('left')
        if (nextDots) return dots('right')
      } else {
        if (leftDots) return dots('left')
        if (rightDots) return dots('right')
      }
      return renderNumber(styleData)
    })
  }

  if (total <= 0) return null
  return (
    <div className='flex items-center justify-start py-2 text-sm md:flex-row'>
      {showTotal && (
        <div className='mr-1 text-primary'>
          Hiển thị{' '}
          <span className='font-medium'>
            {showingFrom} - {showingTo}
          </span>{' '}
          của {total}
        </div>
      )}
      <span
        onClick={handlePrevious}
        className={paginationStyles.icon({
          active: currentPage > 1,
          disabled,
          next: false,
        })}
      >
        <IconArrowLeft color='var(--text-primary)' />
      </span>
      <ul className='mx-1 flex space-x-2'>{renderPageNumbers()}</ul>
      <span
        onClick={handleNext}
        className={paginationStyles.icon({
          active: currentPage < totalPages,
          disabled,
          next: true,
        })}
      >
        <IconArrowRight color='var(--text-primary)' />
      </span>
      {showSizeChanger && (
        <li className='mx-2 list-none'>
          <Select
            options={pageSizeOptions.map((option) => ({
              value: option,
              label: `${option} / trang`,
            }))}
            onChange={handlePageSizeChange}
            allowClear={false}
            deSelect={false}
            disabled={disabled}
            style={{ minHeight: 32 }}
            defaultValue='10'
          />
        </li>
      )}
      {showQuickJumper && (
        <div className='mx-1 flex items-center whitespace-nowrap font-medium text-primary'>
          Đến
          <input
            onBlur={handleQuickJump}
            onKeyDown={handleEnter}
            ref={quickJumpRef}
            type='number'
            className={twMerge(
              'mx-2 w-[50px] rounded-lg border border-border-200 bg-bg-secondary px-2 py-1 font-normal',
              borderHoverClass,
              disabled ? 'bg-gray-50' : '',
            )}
            disabled={disabled}
          />
          Trang
        </div>
      )}
    </div>
  )
}
