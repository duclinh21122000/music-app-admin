import type { ModalProps as NextModalProps } from '@nextui-org/react'
import {
  Modal as NextModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import type { ReactNode } from 'react'

import Button from '../button'

export type ModalProps = Omit<NextModalProps, 'children'> & {
  header?: ReactNode
  onAction?: () => void
  onSecondAction?: () => void
  onClickLeftButton?: () => void
  actionText?: string
  closeText?: string
  secondText?: string
  leftButtonText?: ReactNode
  showActionButton?: boolean
  showCloseButton?: boolean
  showSecondButton?: boolean
  showLeftButton?: boolean
  showFooter?: boolean
  loading?: boolean
  loadingSecondButton?: boolean
  disabled?: boolean
  footer?: ReactNode
  form?: string
  children?: ReactNode
}

const Modal = ({ ...props }: ModalProps) => {
  const {
    header,
    showFooter = true,
    footer,
    children,
    actionText,
    closeText,
    secondText,
    leftButtonText,
    showActionButton = true,
    showCloseButton = true,
    showSecondButton = false,
    showLeftButton = false,
    loading = false,
    loadingSecondButton = false,
    form,
    onClose,
    onSubmit,
    onAction,
    onSecondAction,
    onClickLeftButton,
    className = '',
    classNames,
    disabled = false,
    ...rest
  } = props
  return (
    <NextModal
      onClose={onClose}
      classNames={{
        closeButton: 'm-2 z-10',
        base: 'overflow-visible m-0 flex max-h-dvh flex-col md:max-h-[96dvh]',
        header: 'flex flex-col p-0',
        wrapper: 'overflow-hidden',
        ...classNames,
      }}
      shouldBlockScroll={false}
      className={className}
      {...rest}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {header && <ModalHeader>{header}</ModalHeader>}
            <ModalBody className='flex-1 overflow-auto p-0'>
              {children}
            </ModalBody>
            {showFooter &&
              (footer ? (
                footer
              ) : (
                <ModalFooter>
                  {showLeftButton ? (
                    <Button
                      color='primary'
                      variant='bordered'
                      onPress={onClickLeftButton}
                      className='mr-auto'
                    >
                      {leftButtonText || 'View'}
                    </Button>
                  ) : null}
                  {showCloseButton ? (
                    <Button color='default' variant='light' onPress={onClose}>
                      {closeText || 'Huỷ'}
                    </Button>
                  ) : null}
                  {showSecondButton ? (
                    <Button
                      color='danger'
                      variant='flat'
                      isLoading={loadingSecondButton}
                      onPress={onSecondAction}
                    >
                      {secondText || 'Đóng'}
                    </Button>
                  ) : null}
                  {showActionButton ? (
                    <Button
                      onSubmit={onSubmit}
                      onPress={onAction}
                      isLoading={loading}
                      disabled={disabled}
                      type={form ? 'submit' : 'button'}
                      form={form}
                    >
                      {actionText || 'Gửi'}
                    </Button>
                  ) : null}
                </ModalFooter>
              ))}
          </>
        )}
      </ModalContent>
    </NextModal>
  )
}

export default Modal
