import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const detailsValidationSchema = Yup?.object()?.shape({
  email: Yup?.string()?.email('Invalid email')?.required('Required Field'),
  firstName: Yup.string().nullable(),
  lastName: Yup.string().nullable(),
  address: Yup.string().nullable(),
  dateOfBirth: Yup.date().nullable(),
  contactOwnerId: Yup.string().nullable(),
  phoneNumber: Yup.string()
    .nullable()
    .test(
      'is-valid-phone-number',
      'Phone number must contain only numbers',
      function (value) {
        if (!value) {
          return true;
        }
        return /^\d+$/.test(value);
      },
    )
    .test(
      'is-minimum-digits',
      'Phone number must contain at least 6 digits',
      function (value) {
        if (!value) {
          return true;
        }
        return value.length >= 6;
      },
    ),
  whatsAppNumber: Yup.string()
    .nullable()
    .test(
      'is-valid-whatsapp-number',
      'WhatsApp number must contain only numbers',
      function (value) {
        if (!value) {
          return true;
        }
        return /^\d+$/.test(value);
      },
    )
    .test(
      'is-minimum-digits',
      'WhatsApp number must contain at least 6 digits',
      function (value) {
        if (!value) {
          return true;
        }
        return value.length >= 6;
      },
    ),
  lifeCycleStageId: Yup.string().nullable(),
  jobTitle: Yup.string().nullable(),
  statusId: Yup.string().nullable(),
  dateOfJoining: Yup.date().nullable(),
  profilePicture: Yup.string().nullable(),
});

export const detailsDefaultValues = {
  dateOfBirth: null,
  dateOfJoining: null,
};

export const detailsDataArray = (
  contactOwnerData: any,
  lifeCycleStagesData: any,
  contactStatusData: any,
) => {
  return [
    {
      id: 'firstName',
      label: 'first Name',
      componentProps: {
        name: 'firstName',
        placeholder: 'Ahmed',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 4,
    },
    {
      id: 'lastName',
      label: 'Last Name',
      componentProps: {
        name: 'lastName',
        placeholder: 'Khan',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 4,
    },
    {
      id: 'email',
      label: 'Email',
      componentProps: {
        name: 'email',
        placeholder: 'Email',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 4,
    },
    {
      id: 'address',
      label: 'Address',
      componentProps: {
        name: 'address',
        placeholder: '7 Park Lane, Birmingham',
      },
      component: RHFTextField,
      md: 4,
    },
    {
      id: 'dateOfBirth',
      label: 'Date of birth',
      componentProps: {
        name: 'dateOfBirth',
        placeholder: '10/04/2023',
        fullWidth: true,
      },
      component: RHFDatePicker,
      md: 4,
    },
    {
      id: 'contactOwnerId',
      label: 'Contact Owner',
      componentProps: {
        name: 'contactOwnerId',
        placeholder: 'Ahmed',
        select: true,
      },
      options: contactOwnerData,
      component: RHFSelect,
      md: 4,
    },
    {
      id: 'phoneNumber',
      label: 'Phone Number',
      componentProps: {
        name: 'phoneNumber',
        placeholder: '+44 063556245',
      },
      component: RHFTextField,
      md: 4,
    },
    {
      id: 'whatsAppNumber',
      label: 'WhatsApp Number',
      componentProps: {
        name: 'whatsAppNumber',
        placeholder: '+44 063556245',
        select: false,
      },
      component: RHFTextField,
      md: 4,
    },
    {
      id: 'lifeCycleStageId',
      label: 'Lifecycle Stage ',
      componentProps: {
        name: 'lifeCycleStageId',
        placeholder: 'Lead',
        select: true,
      },
      options: lifeCycleStagesData,
      component: RHFSelect,
      md: 4,
    },
    {
      id: 'jobTitle',
      label: 'Job title',
      componentProps: {
        name: 'jobTitle',
        placeholder: 'Data Scientist',
      },
      component: RHFTextField,
      md: 4,
    },
    {
      id: 'statusId',
      label: 'Status',
      componentProps: {
        name: 'statusId',
        placeholder: 'New',
        fullWidth: true,
        select: true,
      },
      component: RHFSelect,
      md: 4,
      options: contactStatusData,
    },
    {
      id: 'dateOfJoining',
      label: 'Date of joining',
      componentProps: {
        name: 'dateOfJoining',
        placeholder: '10/04/2023',
        select: false,
        fullWidth: true,
      },
      component: RHFDatePicker,
      md: 4,
    },
  ];
};
