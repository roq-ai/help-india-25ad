import * as yup from 'yup';

export const applicationValidationSchema = yup.object().shape({
  status: yup.string().required(),
  estimated_delivery_date: yup.date(),
  user_id: yup.string().nullable().required(),
});
