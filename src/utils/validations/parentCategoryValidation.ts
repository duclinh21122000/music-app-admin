import * as yup from 'yup'

export const parentCategorySchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên danh mục'),
  description: yup.string().required('Vui lòng nhập đoạn mô tả danh mục'),
  image: yup.number().required('Vui lòng thêm hình ảnh danh mục'),
})
