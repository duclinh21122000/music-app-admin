import { isEmpty } from 'lodash'
import type { CSSProperties } from 'react'
import React, { useEffect, useRef, useState } from 'react'

import Expand from '@/components/icons/expand'
import IconQuestionMark from '@/components/icons/question-mark'
import IconSortArrowAscending from '@/components/icons/sort-arrow-ascending'
import IconSortArrowDescending from '@/components/icons/sort-arrow-descending'
import IconSortArrowInactive from '@/components/icons/sort-arrow-inactive'
import { useScrollbarWidth } from '@/utils/hooks/useScrollbarWidth'

import { Checkbox } from '../checkbox'
import { Empty } from '../empty'
import { LoadingOverlay } from '../loading-overlay'
import { Pagination } from '../pagination'
import { Tooltip } from '../tooltip'
import type {
  ColumnProps,
  DataSourceProps,
  SortOrderStateProps,
  TableProps,
} from './type'
import { PAGINATION_POSITION, SORT_ORDER } from './type'

const DEFAULT_PAGE_SIZE = 10

export const Table: React.FC<TableProps> = ({
  dataSource = [],
  columns = [],
  bordered = false,
  layoutBorder = false,
  showHeader = true,
  scroll,
  rowSelection,
  rowKey = 'id',
  loading = false,
  pagination,
  size = 'small',
  onRowClick = () => {},
  emptyText,
  rowHover = false,
  rowCursor = false,
  isResetSelection = false,
  idBody,
  indexSelected,
  showPagination = true,
}) => {
  const div1 = useRef<HTMLInputElement>(null)
  const div2 = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)

  // SCROLL BAR WIDTH
  const scrollBarWidth = useScrollbarWidth()
  const [scrollLeft, setScrollLeft] = useState(0)
  const [scrollRight, setScrollRight] = useState<number | undefined>()

  // ROW SELECTION
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([])
  const [selectedRows, setSelectedRows] = useState<DataSourceProps[]>([])
  const [indeterminate, setIndeterminate] = useState(false)

  // PAGINATION
  const isPaginationBoolean = typeof pagination === 'boolean'
  const [current, setCurrent] = useState<number>(
    isPaginationBoolean
      ? 1
      : pagination?.defaultCurrent || pagination?.current || 1,
  )
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE)
  const { selectedRowKeys, onChange, onSelect, onSelectAll, onSelectNone } =
    rowSelection || {}

  const total = isPaginationBoolean
    ? dataSource.length
    : pagination?.total || dataSource.length || 0

  const paginationPosition = !isPaginationBoolean
    ? pagination?.position || PAGINATION_POSITION.BOTTOM_LEFT
    : PAGINATION_POSITION.BOTTOM_LEFT

  // EXPAND COLS
  const [expandedKeys, setExpandedKeys] = useState<(string | number)[]>([])

  // DATA
  const [dataSourceState, setDataSourceState] = useState<DataSourceProps[]>(
    dataSource || [],
  )
  const [currentData, setCurrentData] = useState<DataSourceProps[]>([])

  // SORT
  const [sortOrders, setSortOrders] = useState<SortOrderStateProps>({})

  // CONST
  const hasCheckBox: boolean = Boolean(rowSelection)
  const hasExpand = Object.keys(expandedKeys).length > 0
  const isLeftFixed: boolean = columns?.[0]?.fixed === 'left'

  const isScrollVertical: boolean = !isEmpty(scroll) && !!scroll.y
  const isScrollHorizontal: boolean = !isEmpty(scroll) && !!scroll.x

  const getRowKey = (item: unknown) =>
    item && typeof item === 'object' ? (item as any)[rowKey] : rowKey

  const hasChildren = columns.some((item: ColumnProps) => item.children)
  const isCheckedAll = Boolean(
    currentData.length &&
      currentData.every((item: DataSourceProps) =>
        selectedKeys.includes(getRowKey(item)),
      ),
  )

  useEffect(() => {
    if (!isPaginationBoolean) {
      setPageSize(
        pagination?.defaultPageSize ||
          pagination?.pageSize ||
          DEFAULT_PAGE_SIZE,
      )
    }
  }, [isPaginationBoolean, pagination])

  // SET SELECTED ROW KEYS FROM PROPS
  useEffect(() => {
    if (Array.isArray(selectedRowKeys) || !selectedRowKeys) {
      setSelectedKeys(selectedRowKeys || [])
      if (selectedRowKeys) {
        setSelectedRows(
          dataSourceState.filter((x) => selectedRowKeys.includes(getRowKey(x))),
        )
      } else {
        setSelectedRows([])
      }
    }
  }, [JSON.stringify(selectedRowKeys)])

  useEffect(() => {
    if (isResetSelection) setSelectedKeys([])
  }, [isResetSelection])

  // GET CURRENT PAGE'S DATA
  useEffect(() => {
    const _dataSource = [...dataSourceState]
    const _currentData = _dataSource.splice((current - 1) * pageSize, pageSize)
    setCurrentData(_currentData)
  }, [current, pageSize, JSON.stringify(dataSourceState)])

  useEffect(() => {
    setDataSourceState(dataSource)
  }, [JSON.stringify(dataSource)])

  // GET INDETERMINATE
  useEffect(() => {
    const _currentSelectedKeys = selectedKeys.filter((key: string | number) =>
      currentData.some((item: DataSourceProps) => item[rowKey || 'id'] === key),
    )
    const _indeterminate = currentData.every((item: DataSourceProps) =>
      _currentSelectedKeys.includes(getRowKey(item)),
    )
    if (_currentSelectedKeys.length === 0) {
      setIndeterminate(false)
    } else {
      setIndeterminate(!_indeterminate)
    }
  }, [JSON.stringify(currentData), JSON.stringify(selectedKeys)])

  // STYLES
  const thBgClass = 'bg-bg-50'

  // STYLES -> CONTAINER
  const containerClass: string = [
    'relative',
    isScrollVertical || isScrollHorizontal ? 'overflow-x-auto' : '',
  ]
    .filter(Boolean)
    .join(' ')

  // STYLES -> TABLE
  const tableClass =
    'w-full text-left text-sm text-text-500 table-fixed border-collapse border-hidden'
  const smallSizeClass = 'px-3 py-2'
  const mediumSizeClass = 'px-3 py-4'

  // STYLES -> TABLE -> BORDER
  let tableBorderClass = ' border-collapse overflow-hidden'
  if (pagination) tableBorderClass += ' rounded-br-none rounded-bl-none'

  // STYLES -> TABLE -> CELL
  const selectingCellClass = '!bg-primary-100'
  const sortingCellClass = '!bg-primary-100'

  const cellBorderClass = (hasBorder?: boolean) => {
    if (!hasBorder) return null
    return 'border border-border-200 border-solid border-collapse'
  }
  const checkboxCellClass = (isHeader: boolean, item?: DataSourceProps) => {
    let isSelecting = false
    if (!isEmpty(item)) {
      isSelecting = selectedKeys.includes(getRowKey(item))
    }

    const selectedClass = isSelecting ? selectingCellClass : ''
    const fixedLeftClass =
      hasCheckBox && isLeftFixed ? `sticky left-0 z-10` : ``
    const headerClass = isHeader ? thBgClass : selectedClass

    return [fixedLeftClass, headerClass, `p-4 w-[50px]`].join(' ')
  }

  const lastFixedLeftIdx = columns.findLastIndex(
    (item) => item.fixed === 'left',
  )
  const firstFixedRightIdx = columns.findIndex((item) => item.fixed === 'right')

  const fixedCellClass = (
    col: any,
    isHeader: boolean,
    index?: number,
  ): string => {
    const rightShadowClass = `after:shadow-[inset_10px_0_8px_-8px_#00000016] after:absolute after:top-0 after:-right-[30px] after:bottom-0 after:content-[''] after:w-[30px] after:bg-transparent`
    const leftShadowClass = `after:shadow-[inset_-10px_0_8px_-8px_#00000016] after:absolute after:top-0 after:-left-[30px] after:bottom-0 after:content-[''] after:w-[30px] after:bg-transparent`

    if (col.fixed === 'left') {
      let fixClass = `sticky z-10 ${
        index === lastFixedLeftIdx && +scrollLeft > 0 ? rightShadowClass : ''
      }`
      if (hasCheckBox) fixClass += ` left-14`
      else fixClass += ` left-0`

      return fixClass
    }

    if (col.fixed === 'right') {
      return `sticky z-10 ${
        index === firstFixedRightIdx &&
        (scrollRight === undefined || +scrollRight > 0)
          ? leftShadowClass
          : ''
      }`
    }

    return ''
  }

  const getColumnWidths = () => {
    const headers = document.getElementsByClassName('content-header-class')
    let headerWidths = []
    for (let i = 0; i < headers.length; i++) {
      const headerWidth = headers[i].scrollWidth
      headerWidths.push(headerWidth)
    }
    return headerWidths
  }

  const checkboxWidth =
    document.getElementById('checkbox-width')?.clientWidth || 0
  const columnWidths = getColumnWidths()

  const fixedPosition = (col: any, index?: number) => {
    let fixedStyle: any = {}
    if (columnWidths.length === columns.length) {
      if (col.fixed === 'left') {
        let totalLeft = 0
        let firstIdx = null
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].fixed === 'left') {
            if (firstIdx === null) {
              totalLeft = hasCheckBox ? checkboxWidth : 0
            } else
              totalLeft += parseInt(columnWidths[i - 1].toString() || '0', 10)
            firstIdx = i
          }
          if (i === index) fixedStyle.left = totalLeft
        }
      }
      if (col.fixed === 'right') {
        let totalRight = 0
        let firstIdx = null
        for (let i = columns.length - 1; i > 0; i--) {
          if (columns[i].fixed === 'right') {
            if (firstIdx === null) {
              totalRight = 0
            } else
              totalRight += parseInt(columnWidths[i + 1].toString() || '0', 10)
            firstIdx = i
          }
          if (i === index) fixedStyle.right = totalRight
        }
      }
    }
    return fixedStyle
  }

  // STYLES -> TABLE -> THEAD
  const theadClass = [
    'text-text-600 border-border-200 border-b font-medium overflow-x-auto',
    thBgClass,
  ].join(' ')

  // STYLES -> TABLE -> THEAD -> CHECK BOX
  const theadCheckboxClass = [
    'bg-bg-50 z-20',
    checkboxCellClass(true),
    cellBorderClass(bordered),
    thBgClass,
  ]
    .filter(Boolean)
    .join(' ')

  // STYLES -> TABLE -> THEAD -> SCROLL PLACEHOLDER
  const theadScrollPlaceholderClass = [
    thBgClass,
    isScrollHorizontal && `sticky z-10 right-0 border-none`,
  ]
    .filter(Boolean)
    .join(' ')

  // STYLES -> TABLE -> ROW
  const rowClass = (arr: DataSourceProps[], index: number) => {
    let commonStyle = `bg-bg-secondary group/item`
    if (arr.length - 1 > index) {
      commonStyle = [commonStyle, `border-b border-border-200`]
        .filter(Boolean)
        .join(' ')
    }
    return commonStyle
  }

  // STYLES -> SCROLL
  const _scrollYStyle: CSSProperties = isScrollVertical
    ? {
        maxHeight: scroll?.y,
        overflowY: 'scroll',
      }
    : {}

  const _scrollXStyle: CSSProperties = isScrollHorizontal
    ? {
        overflow: `auto ${scroll?.y ? 'auto' : 'hidden'}`,
      }
    : {}

  // FUNCTIONALITIES
  // FUNCTIONALITIES -> GET TABLE SIZE
  const tableSize = size === 'small' ? smallSizeClass : mediumSizeClass

  // FUNCTIONALITIES -> ON CHECK CHECKBOX
  const onCheck = (e: any, record: DataSourceProps) => {
    const { checked } = e.target
    const _tempKeys = JSON.parse(JSON.stringify(selectedKeys))
    const _tempRows = JSON.parse(JSON.stringify(selectedRows))

    if (checked) {
      _tempKeys.push(record[`${rowKey || 'id'}`])
      _tempRows.push(record)
    } else {
      _tempKeys.splice(_tempKeys.indexOf(record[`${rowKey || 'id'}`]), 1)
      _tempRows.splice(
        _tempRows.findIndex(
          (item: DataSourceProps) =>
            item[`${rowKey || 'id'}`] === record[`${rowKey || 'id'}`],
        ),
        1,
      )
    }
    setSelectedKeys(_tempKeys)
    setSelectedRows(_tempRows)
    onChange && onChange(_tempKeys, _tempRows)
    onSelect && onSelect(record, checked, _tempRows)
    if (_tempKeys.length === 0) {
      onSelectNone && onSelectNone()
    }
  }

  // FUNCTIONALITIES -> ON CHECK ALL CHECKBOX
  const onCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    if (checked) {
      const _tempKeys = JSON.parse(
        JSON.stringify(currentData.map((item) => item[`${rowKey || 'id'}`])),
      )
      const newKeys = [...new Set([..._tempKeys, ...selectedKeys])]
      const newRows = dataSourceState.filter((x) =>
        newKeys.includes(x[rowKey || 'id']),
      )
      setSelectedKeys(newKeys)
      setSelectedRows(newRows)
      onChange && onChange(newKeys, newRows)
      onSelectAll && onSelectAll(true, currentData)
    } else {
      // remove keys from current page
      const _tempKeys = selectedKeys.filter(
        (x) => !currentData.find((y) => y[`${rowKey || 'id'}`] === x),
      )
      const newRows = dataSourceState.filter((x) =>
        _tempKeys.includes(x[rowKey || 'id'] as string),
      )
      setSelectedKeys(_tempKeys)
      setSelectedRows(newRows)
      onChange && onChange(_tempKeys, newRows)
      onSelectAll && onSelectAll(false, newRows)
    }
  }

  // FUNCTIONALITIES -> SCROLL
  const onScroll = (e: any) => {
    const left = e.target.scrollLeft
    const tableWidth = tableRef.current?.offsetWidth || 0
    const containerWidth = containerRef.current?.offsetWidth || 0

    setScrollLeft(left)
    setScrollRight(Math.floor(tableWidth - containerWidth - left))
    if (div1.current && div2.current) {
      div1.current.scrollLeft = div2.current?.scrollLeft
    }
  }

  // FUNCTIONALITIES -> PAGINATION
  const onPageChange = (page: number, pageSize: number) => {
    setPageSize(pageSize)
    setCurrent(page)
  }

  // FUNCTIONALITIES -> SORT
  const onSortTable = async (column: ColumnProps) => {
    const {
      key = '',
      sorter,
      sortOrder = [SORT_ORDER.ASCEND, SORT_ORDER.DESCEND, null],
      onSorterClick,
    } = column

    if (sorter || onSorterClick) {
      let _temp = JSON.parse(JSON.stringify(dataSourceState))
      const currentSortOrder = sortOrders[key]
      const index = sortOrder.indexOf(currentSortOrder)
      const nextSortOrder =
        index === sortOrder.length - 1 ? sortOrder[0] : sortOrder[index + 1]

      if (sorter) {
        if (nextSortOrder) {
          if (currentSortOrder === SORT_ORDER.DESCEND || !currentSortOrder) {
            _temp = _temp.sort(sorter)
          } else {
            _temp = _temp.sort(sorter).reverse()
          }
        }
        setSortOrders({
          [key]: nextSortOrder,
        })
        setDataSourceState(nextSortOrder ? _temp : dataSource)
      }

      if (onSorterClick) {
        const res = await onSorterClick({
          key: column.key,
          dataIndex: column.dataIndex,
          sortOrder: nextSortOrder,
        })
        if (typeof res === 'boolean') {
          if (res === true) {
            setSortOrders({
              [key]: nextSortOrder,
            })
          }
        } else {
          setSortOrders({
            [key]: nextSortOrder,
          })
        }
      }
    }
  }

  // RENDER UI
  const _renderIcon = (icon: React.ReactNode) => (
    <div className='flex min-w-[24px] items-center justify-center'>{icon}</div>
  )
  const _renderSortIcon = (column: ColumnProps) => {
    const isSortable: boolean = !!column.sorter || !!column.onSorterClick
    if (!isSortable) return null

    const direction = sortOrders[column.key]
    if (!direction) return _renderIcon(<IconSortArrowInactive width={20} />)
    return direction === SORT_ORDER.ASCEND
      ? _renderIcon(<IconSortArrowAscending width={20} />)
      : _renderIcon(<IconSortArrowDescending width={20} />)
  }

  const _renderExpandIcon = (column: ColumnProps) => {
    const isColExpand = expandedKeys.findIndex((x) => x === column.key) !== -1
    return (
      !!column.children && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            setExpandedKeys((prev) =>
              prev.includes(column.key)
                ? prev.filter((x) => x !== column.key)
                : [...prev, column.key],
            )
          }}
        >
          <Tooltip
            description={isColExpand ? 'Collapse' : 'Expand'}
            position='top'
          >
            {_renderIcon(<Expand width={14} />)}
          </Tooltip>
        </button>
      )
    )
  }

  const _renderHelpIcon = (column: ColumnProps) => {
    if (!column.helpContent) return null
    return (
      <Tooltip description={column.helpContent} position='top' showArrow>
        {_renderIcon(<IconQuestionMark width={20} className='text-gray-400' />)}
      </Tooltip>
    )
  }
  const _renderHeaderCell = (
    column: ColumnProps,
    isChildren?: boolean,
    index?: number,
  ) => {
    const isSortable: boolean = !!column.sorter || !!column.onSorterClick
    const isSorting = !!sortOrders[column.key]
    const isLastCol = index === columns.length - 1

    let rowSpan = 1
    let colSpan = 1
    const isColExpand = expandedKeys.findIndex((x) => x === column.key) !== -1
    // below header row
    if (isChildren) {
      if (!column.children) {
        rowSpan = 0
      } else {
        rowSpan = 1
      }
    } else {
      if (!hasExpand) {
        rowSpan = 1
        colSpan = 1
      } else {
        // above header row
        if (hasChildren) {
          if (!isColExpand) {
            rowSpan = 2
          } else {
            rowSpan = 1
            colSpan = column?.children?.length || 1
          }
        } else {
          rowSpan = 1
        }
      }
    }
    if (isLastCol) {
      if (currentData.length === 0 && !hasCheckBox) {
        colSpan = 2
      } else colSpan = 1
    }

    const thClass = [
      `bg-bg-50 z-20`,
      tableSize,
      fixedCellClass(column, true, index),
      cellBorderClass(true),
      isSortable && 'cursor-pointer hover:bg-bg-100',
      isSorting && sortingCellClass,
      (!bordered || isLastCol) && '!border-none',
    ].join(' ')

    const fixedStyle = fixedPosition(column, index)
    const headerAlignClass = () => {
      switch (column.headerAlign) {
        case 'center':
          return 'justify-center'
        case 'right':
          return 'justify-end'
        default:
          return 'justify-start'
      }
    }

    return (
      <th
        key={column.key}
        scope='col'
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className={`${thClass} content-header-class`}
        style={{
          width: column.width,
          maxWidth: column.width,
          ...fixedStyle,
        }}
        onClick={isSortable ? () => onSortTable(column) : () => {}}
        rowSpan={rowSpan}
        colSpan={colSpan}
      >
        <div className='flex flex-row items-center justify-between'>
          <div className='flex w-full flex-row items-center justify-start'>
            <span
              className={`flex w-full select-none items-center gap-[10px] ${headerAlignClass()}`}
            >
              {column.title}
              {_renderSortIcon(column)}
            </span>
          </div>
          <div className='flex flex-row items-center justify-end gap-[12px]'>
            {_renderExpandIcon(column)}
            {_renderHelpIcon(column)}
          </div>
        </div>
      </th>
    )
  }
  const _renderHeader = () => {
    return (
      <thead className={theadClass}>
        <tr>
          {hasCheckBox ? (
            <th
              scope='col'
              className={theadCheckboxClass}
              id='checkbox-width'
              rowSpan={hasChildren ? 2 : 1}
            >
              <div className='flex items-center'>
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={(e) => onCheckAll(e)}
                  checked={isCheckedAll}
                />
              </div>
            </th>
          ) : null}
          {columns.map((column, i) => _renderHeaderCell(column, false, i))}
          {isScrollVertical ? (
            <th
              style={{
                width: scrollBarWidth,
              }}
              rowSpan={hasExpand ? 2 : 1}
              className={theadScrollPlaceholderClass}
            ></th>
          ) : null}
        </tr>

        {hasChildren && hasExpand ? (
          <tr>
            {columns.map((column) => {
              if (expandedKeys.findIndex((x) => x === column.key) !== -1)
                return (column.children || []).map((c) =>
                  _renderHeaderCell(c, true),
                )
              return null
            })}
          </tr>
        ) : null}
      </thead>
    )
  }

  // BODY
  // BODY -> CELL
  const _renderTableCell = (
    item: DataSourceProps,
    column: ColumnProps,
    rowIndex: number,
    columnIndex: number,
  ) => {
    let child: any = item[`${column.dataIndex}`]
    if (column.render && column.dataIndex) {
      child = column.render(item[column.dataIndex], item, rowIndex)
    }

    const isSorting = !!sortOrders[column.key]
    const isSelecting = selectedKeys.includes(getRowKey(item))

    // ROW SPAN
    let rowSpan = column.onCell?.(item, rowIndex).rowSpan
    if (!rowSpan && rowSpan !== 0) {
      rowSpan = 1
    }

    // COL SPAN
    let colSpan = column.onCell?.(item, rowIndex).colSpan
    if (!colSpan && colSpan !== 0) {
      colSpan = 1
    }
    let arr = columns.map((x) => x.onCell?.(item, rowIndex).colSpan || 1)
    const hasColSpan = arr.some((x) => x > 1)
    if (hasColSpan) {
      arr = arr.reverse()
      const findIndex = arr.findIndex((x) => x > 1)
      const newColIndex = arr.length - columnIndex - 1
      arr = arr.slice(0, findIndex + 1)
      arr = arr.map((x, i) => {
        if (i === arr.length - 1) return x
        return i < arr.length - arr[arr.length - 1] ? x : 0
      })
      colSpan = arr[newColIndex]
    }

    if (rowSpan === 0 || colSpan === 0) return null

    const tdClass = [
      `text-text-primary bg-bg-secondary`,
      tableSize,
      column.ellipsis &&
        `whitespace-nowrap overflow-hidden text-ellipsis break-keep`,
      fixedCellClass(column, false, columnIndex),
      cellBorderClass(bordered),
      isSorting && sortingCellClass,
      isSelecting && selectingCellClass,
      indexSelected && indexSelected - 1 === rowIndex ? 'bg-primary-100' : '',
      rowHover ? 'group-hover/item:bg-bg-50' : '',
      rowCursor ? 'cursor-pointer' : '',
    ]
      .filter(Boolean)
      .join(' ')

    const columnWidth = column.width
    const fixedStyle = fixedPosition(column, columnIndex)

    return (
      <td
        key={columnIndex}
        className={tdClass}
        width={column.width}
        style={{
          width: columnWidth,
          maxWidth: columnWidth,
          ...fixedStyle,
        }}
        rowSpan={rowSpan}
        colSpan={colSpan}
      >
        {child}
      </td>
    )
  }

  // Calculate empty colSpan
  const emptyColSpan =
    1 +
    (columns?.length || 0) +
    columns.reduce((a, b) => {
      if (expandedKeys.findIndex((x) => x === b.key) !== -1)
        return a + (b.children?.length || 0) - 1
      return a
    }, 0)

  // BODY -> TBODY
  const _renderBody = () => {
    let _columns: ColumnProps[] = []

    columns.forEach((column) => {
      const isExpand = expandedKeys.findIndex((x) => x === column.key) !== -1
      if (column.children && isExpand) {
        _columns.push(...column.children)
      } else {
        _columns.push(column)
      }
    })

    return (
      <tbody id={idBody}>
        {currentData.length ? (
          currentData.map((item: DataSourceProps, index: number) => (
            <tr
              className={`${rowClass(currentData, index)}`}
              key={index}
              onClick={() => {
                onRowClick(item)
              }}
            >
              {hasCheckBox ? (
                <td
                  className={`${checkboxCellClass(false, item)} bg-secondary ${
                    rowHover ? 'group-hover/item:bg-primary-50' : ''
                  } ${rowCursor ? 'cursor-pointer' : ''} ${
                    indexSelected && indexSelected - 1 === index
                      ? 'bg-primary-100'
                      : ''
                  }`}
                >
                  <div className='flex items-center'>
                    <Checkbox
                      onChange={(e) => onCheck(e, item)}
                      checked={selectedKeys.includes(getRowKey(item))}
                    />
                  </div>
                </td>
              ) : null}

              {_columns.map((column, i) =>
                _renderTableCell(item, column, index, i),
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={emptyColSpan}>
              <div
                className='sticky left-0 z-10 flex h-[250px] items-center justify-center'
                style={{ width: containerRef?.current?.offsetWidth || 0 }}
              >
                <Empty description={emptyText} />
              </div>
            </td>
          </tr>
        )}
      </tbody>
    )
  }

  // PAGINATION
  const _renderPagination = () => {
    if (!currentData.length || !showPagination || !pagination) return null
    const isNoPagination =
      (typeof pagination === 'boolean' && !pagination) ||
      pagination === null ||
      pagination === undefined

    if (isNoPagination) return null
    const leftClass = 'flex justify-start items-center'
    const rightClass = 'flex justify-end items-center'
    const positionClass = [
      PAGINATION_POSITION.BOTTOM_LEFT,
      PAGINATION_POSITION.TOP_LEFT,
    ].includes(paginationPosition)
      ? leftClass
      : rightClass

    return (
      <div className={`my-2 w-fit pl-3 ${positionClass}`}>
        <Pagination
          defaultCurrent={1}
          total={total}
          pageSize={pageSize}
          onChange={onPageChange}
          current={current}
          showQuickJumper={total > pageSize}
          showSizeChanger
          showTotal
          {...(typeof pagination === 'object' ? pagination : null)}
        />
      </div>
    )
  }

  // MAIN RENDER
  const _renderTable = () => {
    if (isScrollHorizontal && !isScrollVertical) {
      return (
        <div
          ref={containerRef}
          onScroll={onScroll}
          className={`${containerClass} ${tableBorderClass} border-b border-border-200`}
          style={_scrollXStyle}
        >
          <table
            ref={tableRef}
            className={tableClass}
            style={{ width: scroll?.x, minWidth: '100%' }}
          >
            {showHeader ? _renderHeader() : null}
            {_renderBody()}
          </table>
        </div>
      )
    }
    return (
      <div
        ref={containerRef}
        className={`${containerClass} ${tableBorderClass} ${
          layoutBorder && pagination ? 'border-b border-border-200' : ''
        }`}
      >
        {showHeader ? (
          <div
            ref={div1}
            onScroll={onScroll}
            className='no-scrollbar w-full overflow-auto border-b border-border-200'
          >
            <table
              className={tableClass}
              style={
                isScrollHorizontal
                  ? {
                      width: scroll?.x?.toString().includes('%')
                        ? scroll.x
                        : `calc(${scroll?.x} + ${scrollBarWidth}px)`,
                    }
                  : {}
              }
            >
              {_renderHeader()}
            </table>
          </div>
        ) : null}

        <div onScroll={onScroll} ref={div2} style={_scrollYStyle}>
          <table onScroll={onScroll} className={tableClass}>
            {_renderBody()}
          </table>
        </div>
      </div>
    )
  }
  return (
    <LoadingOverlay loading={loading}>
      <div
        className={`rounded-lg text-sm ${
          layoutBorder ? 'overflow-hidden border border-border-200' : ''
        } `}
      >
        {[PAGINATION_POSITION.TOP_RIGHT, PAGINATION_POSITION.TOP_LEFT].includes(
          paginationPosition,
        ) ? (
          <>
            {_renderPagination()}
            {_renderTable()}
          </>
        ) : (
          <>
            {_renderTable()}
            {_renderPagination()}
          </>
        )}
      </div>
    </LoadingOverlay>
  )
}
