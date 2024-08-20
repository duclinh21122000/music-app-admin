import * as yup from 'yup'

const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Vui lòng nhập email')
    .matches(emailRegExp, 'Vui lòng nhập đúng định dạng email'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(8, 'Độ dài mật khẩu phải có ít nhất 8 ký tự'),
})
