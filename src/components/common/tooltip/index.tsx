import type { ReactNode } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export interface TooltipProps {
  children: ReactNode
  description: ReactNode
  position?: 'bottom' | 'left' | 'right' | 'top'
  showArrow?: boolean
  backgroundColor?: string
  color?: string
  width?: string | number
  className?: React.ComponentProps<'div'>['className']
  style?: React.CSSProperties
}

const portalId = `tooltip-container`

const createContainer = () => {
  let element = document.getElementById(portalId)

  if (element) {
    return element
  }

  element = document.createElement('div')
  element.setAttribute('id', portalId)
  element.className = `absolute z-[55] top-0 left-0 w-full`
  document.body.appendChild(element)
  return element
}

export const Tooltip: React.FC<TooltipProps> = ({
  description,
  children,
  position = 'top',
  showArrow = true,
  backgroundColor = 'black',
  color = 'white',
  width: widthProp = 'fit-content',
  className = '',
  style,
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      const containerData = createContainer()
      setContainer(containerData)
    }
  }, [open])

  const getPositionByPlacement = () => {
    switch (position) {
      case 'top':
        return `translate-y-[calc(-100%-4px)] -translate-x-1/2`
      case 'bottom':
        return `-translate-x-1/2`
      case 'left':
        return `-translate-x-full -translate-y-1/2`
      case 'right':
        return `-translate-y-1/2`
      default:
        return `mt-1 -translate-x-1/2`
    }
  }

  const { top: bodyTop } = document.body.getBoundingClientRect() || {}
  const {
    top = 0,
    bottom = 0,
    x = 0,
    width = 0,
    height = 0,
  } = ref.current?.getBoundingClientRect() || {}

  const getArrowClass = () => {
    let arrowClass = 'absolute border-[6px]'
    if (position === 'top')
      arrowClass += ` left-1/2 -translate-x-1/2 bottom-[-5px] border-l-transparent border-r-transparent border-b-0 border-t-neutral-900`
    if (position === 'bottom')
      arrowClass +=
        ' left-1/2 -translate-x-1/2 top-[-5px] border-l-transparent border-r-transparent border-t-0 border-b-neutral-900'
    if (position === 'left')
      arrowClass +=
        ' top-1/2 -translate-y-1/2 right-[-5px] border-t-transparent border-b-transparent border-r-0 border-l-neutral-900'
    if (position === 'right')
      arrowClass +=
        ' top-1/2 -translate-y-1/2 left-[-5px] border-t-transparent border-b-transparent border-l-0 border-r-neutral-900'
    return arrowClass
  }

  useEffect(() => {
    if (open) {
      dropdownRef.current?.classList.add('animate-opacity')
    } else {
      dropdownRef.current?.classList.remove('animate-opacity')
    }
  }, [open])

  const getPosition = () => {
    switch (position) {
      case 'bottom':
        return {
          x: x + width / 2,
          y: bottom - bodyTop,
        }
      case 'top':
        return {
          x: x + width / 2,
          y: top - bodyTop,
        }
      case 'left':
        return {
          x: x - 5,
          y: top - bodyTop + height / 2,
        }
      case 'right':
        return {
          x: x + width + 5,
          y: top - bodyTop + height / 2,
        }
      default:
        return {
          x: x + width / 2,
          y: top - bodyTop + height,
        }
    }
  }

  const renderContainer = () => {
    return (
      <>
        {container && open
          ? createPortal(
              <div
                ref={dropdownRef}
                style={{
                  top: getPosition().y,
                  left: getPosition().x,
                  width: widthProp,
                  position: 'absolute',
                  backgroundColor: backgroundColor,
                  color: color,
                }}
                className={`rounded-lg p-2 ${getPositionByPlacement()}`}
              >
                <div className='text-xs leading-[normal]'>{description}</div>
                {showArrow ? <div className={getArrowClass()}></div> : null}
              </div>,
              container,
            )
          : null}
      </>
    )
  }

  return (
    <div
      className={`relative size-fit cursor-pointer p-1 text-sm ${className}`}
      style={style}
      onMouseMove={() => {
        setOpen(true)
      }}
      onMouseOut={() => {
        setOpen(false)
      }}
      ref={ref}
    >
      {children}
      {renderContainer()}
    </div>
  )
}
