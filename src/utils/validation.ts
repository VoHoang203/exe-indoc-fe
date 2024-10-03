import * as yup from 'yup';

export const schema = yup.object({
    email: yup.string().email("Điền đúng định dạng email(adc123@mail.com)").required().min(6,"Cần điền ít nhất 6 kí tự").
    max(150,"Nhiều nhất 150 kí tự"),
    password: yup.string().required().min(6,"Cần điền ít nhất 6 kí tự").
    max(150,"Nhiều nhất 150 kí tự"),
    confirm_password:yup.string().required("Confirm password pls!").oneOf([yup.ref("password")],"Nhập lại pass không khớp"),
})

export type Schema = yup.InferType<typeof schema>;