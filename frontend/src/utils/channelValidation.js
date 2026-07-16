import * as yup from 'yup';

export const createChannelSchema = (existingNames, t, excludeName = null) => {
  const names = excludeName
    ? existingNames.filter((name) => name !== excludeName)
    : existingNames;

  return yup.object({
    name: yup
      .string()
      .trim()
      .min(3, t('validate.min3max20'))
      .max(20, t('validate.min3max20'))
      .notOneOf(names, t('validate.notOneOf'))
      .required(t('validate.required')),
  });
};
