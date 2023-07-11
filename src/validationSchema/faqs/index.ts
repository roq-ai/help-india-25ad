import * as yup from 'yup';

export const faqValidationSchema = yup.object().shape({
  question: yup.string().required(),
  answer: yup.string().required(),
});
