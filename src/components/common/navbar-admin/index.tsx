import React from 'react'

const NavbarAdmin = () => {
  return (
    <div className='fixed left-0 top-0 z-10 h-header w-full bg-white shadow-header'>
      <div className='flex size-full items-center justify-between'>
        <div className='relative flex h-full w-sidebar items-center bg-primary p-4'>
          <div className='flex h-full items-center'>
            <a href='/'>
              <h2 className='text-4xl uppercase text-white'>Music App</h2>
            </a>
          </div>
          {/* <div className='absolute right-[-15px] top-[50%] flex h-8 w-8 translate-y-[-50%] cursor-pointer items-center justify-center rounded-full bg-main shadow'>
            <span>
              <IconArrowLeft width='22px' color='#3D5EE1' />
            </span>
          </div> */}
        </div>
        <div className='flex items-center gap-4 px-8'>
          {/* <Messenger />
          <Notification />
          <Profile /> */}
        </div>
      </div>
    </div>
  )
}

export default NavbarAdmin
