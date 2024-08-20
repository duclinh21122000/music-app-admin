import { isEmpty } from 'lodash'
import React from 'react'
import Spinner from '../spinner'

interface LoadingOverlayProps {
  children?: React.ReactNode
  loading?: boolean
  icon?: React.ReactNode
  description?: React.ReactNode
  opacity?: 'low' | 'medium' | 'high'
  className?: React.HTMLAttributes<HTMLDivElement>['className']
}

export const LoadingOverlay = (props: LoadingOverlayProps) => {
  const {
    children,
    loading,
    icon = <Spinner />,
    description,
    opacity = 'medium',
    className = '',
  } = props

  const getOpacityValue = () => {
    switch (opacity) {
      case 'low':
        return 40
      case 'high':
        return 80
      default:
        return 60
    }
  }

  const containerClass = loading
    ? 'w-full h-full pointer-events-none select-none relative z-[8]'
    : 'w-full h-full relative'

  const transitionClass = 'transition-all ease duration-200'

  const spinnerClass =
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-center'

  const overlayClass = [
    'bg-bg-secondary z-40 w-full h-full absolute pointer-events-none text-sm',
    loading ? `opacity-${getOpacityValue()}` : 'opacity-0 invisible',
    transitionClass,
  ].join(' ')

  return (
    <div className={`${containerClass} ${className}`}>
      <div className={spinnerClass}>
        {loading && (
          <>
            <div>{icon}</div>
            {!isEmpty(description) && <p>{description}</p>}
          </>
        )}
      </div>
      <div className={overlayClass} />
      {children}
    </div>
  )
}
