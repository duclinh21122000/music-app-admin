import type { HTMLAttributes, ReactNode } from 'react'
import React, { useEffect, useId, useRef } from 'react'

export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  children?: ReactNode
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => unknown
  disabled?: boolean
  defaultChecked?: boolean
  checked?: boolean
  indeterminate?: boolean
  labelClasses?: HTMLAttributes<HTMLDivElement>['className']
  containerClassName?: HTMLAttributes<HTMLDivElement>['className']
  size?: number
  readOnly?: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked = false,
  indeterminate = false,
  disabled = false,
  readOnly = false,
  children,
  onChange,
  size = 16,
  containerClassName = '',
  className = '',
  labelClasses = '',
  ...rest
}) => {
  const id = useId()
  const cRef = useRef<HTMLInputElement>(null)

  const getWrapperClass = () => {
    let wrapperClass = `flex items-center text-sm ${containerClassName}`
    if (children) wrapperClass += ' space-x-2'
    return wrapperClass
  }
  const getCheckboxClass = () => {
    let checkboxClass =
      'appearance-none relative h-4 w-4 border checked:border-primary-500 hover:border-primary-500 checked:bg-primary-500 checked:before:content-[""] checked:before:absolute checked:before:border-t-0 checked:before:border-r-0 checked:before:border-2 checked:before:border-white checked:before:h-[5px] checked:before:w-[8.5px] checked:before:top-[calc(50%-2px)] checked:before:left-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2 checked:before:-rotate-45 rounded focus:outline-none '

    if (indeterminate)
      checkboxClass += ` border-primary-500 indeterminate:before:content-[''] indeterminate:before:bg-primary-500 indeterminate:before:rounded-full indeterminate:before:absolute indeterminate:before:h-[1px] indeterminate:before:w-[8px] indeterminate:before:top-1/2 indeterminate:before:left-1/2 indeterminate:before:-translate-x-1/2 indeterminate:before:-translate-y-1/2 hover:bg-bg-100 `
    else checkboxClass += ' border-border-200'
    if (readOnly) checkboxClass += ` pointer-events-none`
    if (disabled)
      checkboxClass +=
        ' !cursor-not-allowed disabled:bg-bg-100 disabled:border-border-200 disabled:checked:before:!border-border-200 disabled:indeterminate:before:!bg-bg-300'
    else checkboxClass += ' !cursor-pointer '
    checkboxClass += ' ' + className
    return checkboxClass
  }

  const getLabelClass = () => {
    let labelClass = 'text-text-primary flex-1 pt-0.5'
    if (readOnly) labelClass += ` pointer-events-none select-none`
    if (disabled) labelClass += ' cursor-not-allowed opacity-50'
    if (!readOnly && !disabled) labelClass += ' cursor-pointer'
    if (labelClasses) labelClass += ` ${labelClasses}`

    return labelClass
  }

  useEffect(() => {
    if (cRef.current && checked !== undefined) {
      cRef.current.indeterminate = false
      cRef.current.checked = checked
    }
  }, [checked])
  useEffect(() => {
    if (cRef.current && !cRef.current.checked) {
      cRef.current.checked = false
      cRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  useEffect(() => {
    if (cRef.current && checked === undefined && defaultChecked) {
      cRef.current.checked = defaultChecked
    }
  }, [])

  return (
    <div className={getWrapperClass()}>
      <input
        ref={cRef}
        disabled={disabled}
        onChange={onChange}
        className={getCheckboxClass()}
        type='checkbox'
        id={`checkbox-${id}`}
        style={{
          width: size,
          height: size,
        }}
        {...rest}
      />
      {children && (
        <label
          htmlFor={readOnly ? '' : `checkbox-${id}`}
          className={getLabelClass()}
        >
          {children}
        </label>
      )}
    </div>
  )
}
