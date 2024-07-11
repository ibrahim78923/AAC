import {
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

const phoneRegex = /^\+\d{1,3}[-.\s]?\d{10,}$/;

export const detailsValidationSchema = Yup?.object()?.shape({
  email: Yup?.string()?.email('Invalid email')?.required('Required Field'),
  firstName: Yup.string().nullable(),
  lastName: Yup.string().nullable(),
  address: Yup.string().nullable(),
  dateOfBirth: Yup.date().nullable(),
  contactOwnerId: Yup.mixed().nullable(),
  phoneNumber: Yup.string()
    .nullable()
    .matches(phoneRegex, 'Phone number is not valid'),
  whatsAppNumber: Yup.string()
    .nullable()
    .matches(phoneRegex, 'WhatsApp number is not valid'),
  lifeCycleStageId: Yup.mixed().nullable(),
  jobTitle: Yup.string().nullable(),
  statusId: Yup.mixed().nullable(),
  dateOfJoining: Yup.date().nullable(),
  profilePicture: Yup.string().nullable(),
});

export const detailsDefaultValues = {
  email: '',
  profilePicture: '',
  firstName: '',
  lastName: '',
  address: '',
  jobTitle: '',
  phoneNumber: null,
  whatsAppNumber: null,
  lifeCycleStageId: null,
  contactOwnerId: null,
  statusId: null,
  dateOfJoining: null,
  dateOfBirth: null,
};

export const detailsDataArray = (
  orgId: any,
  contactOwnerData: any,
  lifeCycleStagesData: any,
  contactStatusData: any,
) => {
  return [
    {
      id: 'firstName',
      label: 'First Name',
      componentProps: {
        name: 'firstName',
        placeholder: 'First Name',
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
        placeholder: 'Last Name',
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
        placeholder: 'Address',
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
      component: RHFAutocompleteAsync,
      md: 4,
      componentProps: {
        name: 'contactOwnerId',
        label: 'Contact Owner',
        placeholder: 'Select Owner',
        apiQuery: contactOwnerData,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: { id: orgId, meta: false },
      },
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
      component: RHFAutocompleteAsync,
      md: 4,
      componentProps: {
        name: 'lifeCycleStageId',
        label: 'Lifecycle Stage',
        placeholder: 'Select Lifecycle Stage',
        apiQuery: lifeCycleStagesData,
        getOptionLabel: (option: any) => option?.name,
        externalParams: {},
      },
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
      component: RHFAutocompleteAsync,
      md: 4,
      componentProps: {
        name: 'statusId',
        label: 'Status',
        placeholder: 'Select Status',
        apiQuery: contactStatusData,
        getOptionLabel: (option: any) => option?.name,
        externalParams: {},
      },
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
