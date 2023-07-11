import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getFaqById, updateFaqById } from 'apiSdk/faqs';
import { Error } from 'components/error';
import { faqValidationSchema } from 'validationSchema/faqs';
import { FaqInterface } from 'interfaces/faq';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

function FaqEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<FaqInterface>(
    () => (id ? `/faqs/${id}` : null),
    () => getFaqById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: FaqInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateFaqById(id, values);
      mutate(updated);
      resetForm();
      router.push('/faqs');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<FaqInterface>({
    initialValues: data,
    validationSchema: faqValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Faq
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="question" mb="4" isInvalid={!!formik.errors?.question}>
              <FormLabel>Question</FormLabel>
              <Input type="text" name="question" value={formik.values?.question} onChange={formik.handleChange} />
              {formik.errors.question && <FormErrorMessage>{formik.errors?.question}</FormErrorMessage>}
            </FormControl>
            <FormControl id="answer" mb="4" isInvalid={!!formik.errors?.answer}>
              <FormLabel>Answer</FormLabel>
              <Input type="text" name="answer" value={formik.values?.answer} onChange={formik.handleChange} />
              {formik.errors.answer && <FormErrorMessage>{formik.errors?.answer}</FormErrorMessage>}
            </FormControl>

            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'faq',
    operation: AccessOperationEnum.UPDATE,
  }),
)(FaqEditPage);
