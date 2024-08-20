import type { AvatarGroupProps } from '@nextui-org/react'
import { Avatar, AvatarGroup } from '@nextui-org/react'

interface GroupAvatarProps extends AvatarGroupProps {
  users: { id: string; image?: string }[]
}

const GroupAvatar = ({ users = [], ...props }: GroupAvatarProps) => {
  return (
    <AvatarGroup
      classNames={{
        count: 'bg-cl-bg-icon',
      }}
      {...props}
    >
      {users.map((user) => (
        <Avatar key={user.id} src={user?.image} size={props.size} />
      ))}
    </AvatarGroup>
  )
}

export default GroupAvatar
