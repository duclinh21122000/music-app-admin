'use client'

import moment from 'moment'
import React from 'react'

import NavbarAdmin from '@/components/common/navbar-admin'
import SidebarAdmin from '@/components/common/sidebar-admin'

import AppContainer from '../../app-container'

interface AppLayoutMainProps {
  title: string
  children: React.ReactNode
}

const AppLayoutAdminMain = ({ title, children }: AppLayoutMainProps) => {
  return (
    <div>
      <NavbarAdmin />
      <SidebarAdmin />
      <div className='ml-main flex min-h-screen flex-col bg-main pt-main'>
        <div className='flex-1'>
          <AppContainer isFluid>
            <div className='py-4'>
              {title && (
                <div className='mb-4 flex items-center justify-between'>
                  <h3 className='text-2xl font-semibold'>{title}</h3>
                </div>
              )}
              <div>{children}</div>
            </div>
          </AppContainer>
        </div>
        <footer className='flex h-14 items-center justify-center bg-white'>
          <AppContainer isFluid>
            Music App &copy; {moment().format('YYYY')} by The Light
          </AppContainer>
        </footer>
      </div>
    </div>
  )
}

export default AppLayoutAdminMain
