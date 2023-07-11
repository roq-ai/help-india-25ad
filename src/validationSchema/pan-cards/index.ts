import * as yup from 'yup';

export const panCardValidationSchema = yup.object().shape({
  pan_number: yup.string().required(),
  status: yup.string().required(),
  digital_copy: yup.string(),
  user_id: yup.string().nullable().required(),
});
