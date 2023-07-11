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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createPanCard } from 'apiSdk/pan-cards';
import { Error } from 'components/error';
import { panCardValidationSchema } from 'validationSchema/pan-cards';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { PanCardInterface } from 'interfaces/pan-card';

function PanCardCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PanCardInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPanCard(values);
      resetForm();
      router.push('/pan-cards');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PanCardInterface>({
    initialValues: {
      pan_number: '',
      status: '',
      digital_copy: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: panCardValidationSchema,
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
            Create Pan Card
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="pan_number" mb="4" isInvalid={!!formik.errors?.pan_number}>
            <FormLabel>Pan Number</FormLabel>
            <Input type="text" name="pan_number" value={formik.values?.pan_number} onChange={formik.handleChange} />
            {formik.errors.pan_number && <FormErrorMessage>{formik.errors?.pan_number}</FormErrorMessage>}
          </FormControl>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <FormControl id="digital_copy" mb="4" isInvalid={!!formik.errors?.digital_copy}>
            <FormLabel>Digital Copy</FormLabel>
            <Input type="text" name="digital_copy" value={formik.values?.digital_copy} onChange={formik.handleChange} />
            {formik.errors.digital_copy && <FormErrorMessage>{formik.errors?.digital_copy}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
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
    entity: 'pan_card',
    operation: AccessOperationEnum.CREATE,
  }),
)(PanCardCreatePage);
