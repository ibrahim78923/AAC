import * as yup from 'yup';
import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import { timeZone } from '@/constants/time-zone';
import { VALIDATION_CONSTANT } from '@/constants';

export const validationSchemaAgentFields: any = yup?.object()?.shape({
  firstName: yup?.string()?.required('First name is required'),
  lastName: yup?.string()?.required('Last name is required'),
  email: yup
    ?.string()
    ?.email('Please provide valid email')
    ?.required('Email is required'),
  phoneNumber: yup
    ?.string()
    ?.trim()
    ?.required('Phone number is required')
    ?.matches(
      VALIDATION_CONSTANT?.PHONE_NUMBER?.regex,
      VALIDATION_CONSTANT?.PHONE_NUMBER?.message,
    ),
  departmentId: yup?.mixed()?.required('Department is required'),
  permissionsRole: yup?.mixed()?.nullable()?.required('Role is required'),
  timezone: yup?.mixed()?.nullable()?.required('TimeZone is required'),
});

export const defaultValues = (selectedAgentList: any) => {
  const updateData = selectedAgentList?.[0];
  return {
    firstName: updateData?.firstName ?? '',
    lastName: updateData?.lastName ?? '',
    email: updateData?.email ?? '',
    phoneNumber: updateData?.phoneNumber ?? '',
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
      required: true,
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
      required: true,
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
      required: true,
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
      required: true,
      options: timeZone?.map((timeZone: any) => timeZone?.label),
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
];
