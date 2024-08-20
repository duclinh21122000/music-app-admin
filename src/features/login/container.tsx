'use client'

import React from 'react'

import LoginForm from './LoginForm'

const LoginContainer = () => {
  return (
    <>
      <h2 className='mb-8 w-full text-3xl font-bold'>Music App Admin</h2>
      <p className='mb-4 text-center text-[20px] font-medium'>Đăng Nhập</p>
      <LoginForm />
    </>
  )
}

export default LoginContainer
