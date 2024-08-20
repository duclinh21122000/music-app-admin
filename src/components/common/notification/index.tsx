import React from 'react'

import Popover from '../popover'

export type INotificationType = 'success' | 'error' | 'warning' | 'info'

export interface NotificationProps {
  message: string
  type: INotificationType
  onClose?: () => void
}

const Notification = ({
  message,
  type,
  onClose = () => {},
}: NotificationProps) => {
  const getNotificationClass = () => {
    let classes = 'fixed top-4 right-4 px-4 py-2 rounded-md shadow-md'
    if (type === 'success') {
      classes += ' bg-green-500 text-white'
    } else if (type === 'error') {
      classes += ' bg-red-500 text-white'
    } else if (type === 'warning') {
      classes += ' bg-yellow-500 text-white'
    } else {
      classes += ' bg-blue-500 text-white'
    }
    return classes
  }

  return (
    <Popover isOpen onClose={onClose}>
      <div className={getNotificationClass()}>
        <p>{message}</p>
      </div>
    </Popover>
  )
}

export default Notification
