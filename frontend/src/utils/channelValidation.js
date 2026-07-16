import * as yup from 'yup';

export const createChannelSchema = (existingNames, excludeName = null) => {
  const names = excludeName
    ? existingNames.filter((name) => name !== excludeName)
    : existingNames;

  return yup.object({
    name: yup
      .string()
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(names, 'Должно быть уникальным')
      .required('Обязательное поле'),
  });
};
