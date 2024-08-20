import React from 'react'

import Modal from '@/components/common/modal'

export function useModal() {
  const [open, setOpen] = React.useState(false)

  const onOpen = React.useCallback(() => setOpen(true), [])
  const onClose = React.useCallback(() => setOpen(false), [])

  return {
    open,
    onOpen,
    onClose,
    Modal,
  }
}
