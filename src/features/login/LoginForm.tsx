import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import toast from 'react-hot-toast'

import Button from '@/components/common/button'
import { Form, useForm } from '@/components/common/form'
import Input from '@/components/common/input'
import InputPassword from '@/components/common/input-password'
import { loginSchema } from '@/utils/validations/loginValidation'

const LoginForm = () => {
  const form = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'all',
  })

  const { handleSubmit } = form

  const onSubmit = (data: any) => {
    console.log(data)
    toast.success('Đăng Nhập Thành Công')
  }

  return (
    <Form form={form}>
      <Form.Item name='email' label='Email'>
        <Input placeholder='Email' />
      </Form.Item>
      <Form.Item name='password' label='Mật khẩu' className='mt-4'>
        <InputPassword placeholder='Mật khẩu' />
      </Form.Item>
      <div className='text-center'>
        <Button onClick={handleSubmit(onSubmit)}>Đăng Nhập</Button>
      </div>
    </Form>
  )
}

export default LoginForm
