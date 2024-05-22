import * as yup from 'yup';
import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import { timeZone } from '@/constants/time-zone';
import { VALIDATION_CONSTANT } from '@/constants';

export const validationSchemaAgentFields: any = yup?.object()?.shape({
  firstName: yup?.string()?.trim()?.required('First name is required'),
  lastName: yup?.string()?.trim()?.required('Last name is required'),
  email: yup
    ?.string()
    ?.trim()
    ?.email('Please provide valid email')
    ?.required('Email is required'),
  phoneNumber: yup
    ?.string()
    ?.trim()
    ?.test(
      'is-valid-phone',
      VALIDATION_CONSTANT?.PHONE_NUMBER?.message,
      function (value) {
        if (value) {
          return VALIDATION_CONSTANT?.PHONE_NUMBER?.regex?.test(value);
        }
        return true;
      },
    ),
  departmentId: yup?.mixed()?.nullable(),
  permissionsRole: yup?.mixed()?.nullable(),
  timezone: yup?.mixed()?.nullable(),
});

export const defaultValues = (selectedAgentList: any) => {
  const updateData = selectedAgentList?.[0];
  return {
    firstName: updateData?.firstName ?? '',
    lastName: updateData?.lastName ?? '',
    email: updateData?.email ?? '',
    phoneNumber: updateData?.phoneNumber ?? undefined,
    departmentId: updateData?.departmentData ?? null,
    permissionsRole: updateData?.accountsPermissions ?? null,
    timezone: updateData?.timezone ?? null,
  };
};

export const agentFieldsData = (
  selectedAgentList: any,
  departmentDropdown: any,
  roleApiQuery: any,
  roleApiQueryParams: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'firstName',
      fullWidth: true,
      placeholder: 'First Name',
      label: 'First Name',
      required: true,
    },
    gridLength: 6,
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'lastName',
      fullWidth: true,
      placeholder: 'Last Name',
      label: 'Last Name',
      required: true,
    },
    gridLength: 6,
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'email',
      fullWidth: true,
      disabled: !!selectedAgentList?.length,
      placeholder: 'Email',
      label: 'Email',
      required: true,
    },
    gridLength: 12,
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'phoneNumber',
      fullWidth: true,
      placeholder: 'Phone Number',
      label: 'Phone Number',
    },
    gridLength: 12,
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      fullWidth: true,
      name: 'departmentId',
      label: 'Department',
      placeholder: 'Select Department',
      apiQuery: departmentDropdown,
    },
    gridLength: 12,
    component: RHFAutocompleteAsync,
  },
  {
    id: 6,
    componentProps: {
      fullWidth: true,
      name: 'permissionsRole',
      label: 'Role',
      placeholder: 'Select Role',
      apiQuery: roleApiQuery,
      externalParams: roleApiQueryParams,
    },
    gridLength: 12,
    component: RHFAutocompleteAsync,
  },
  {
    id: 7,
    componentProps: {
      fullWidth: true,
      name: 'timezone',
      label: 'Time Zone',
      placeholder: 'Select Time Zone',
      options: timeZone?.map((timeZone: any) => timeZone?.label),
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
];
