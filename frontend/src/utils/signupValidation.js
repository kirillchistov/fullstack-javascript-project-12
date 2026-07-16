import * as yup from 'yup';

export const createSignupSchema = (t) => yup.object({
  username: yup
    .string()
    .trim()
    .min(3, t('validate.min3max20'))
    .max(20, t('validate.min3max20'))
    .required(t('validate.required')),
  password: yup
    .string()
    .min(6, t('validate.min6'))
    .required(t('validate.required')),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], t('validate.oneOf'))
    .required(t('validate.required')),
});
