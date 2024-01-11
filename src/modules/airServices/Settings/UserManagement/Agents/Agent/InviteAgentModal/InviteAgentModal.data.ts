import * as yup from 'yup';
import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { timeZone } from '@/constants/time-zone';
import { AGENTS } from '@/constants/strings';

export const roleData = ['ORG_AGENT'];

export const validationSchemaAgentFields: any = yup?.object()?.shape({
  firstName: yup?.string()?.required('Required'),
  lastName: yup?.string()?.required('Required'),
  email: yup?.string()?.required('Required'),
  phoneNumber: yup?.string()?.required('Required'),
  departmentId: yup?.string()?.required('Required'),
  role: yup?.string()?.required('Required'),
  timezone: yup?.string()?.required('Required'),
});

export const defaultValues = (selectedAgentList: any) => {
  const updateData = selectedAgentList[0];

  return {
    firstName: updateData?.firstName ?? '',
    lastName: updateData?.lastName ?? '',
    email: updateData?.email ?? '',
    phoneNumber: updateData?.phoneNumber ?? '',
    departmentId: updateData?.departmentData?.name ?? '',
    role: updateData?.role ?? '',
    timezone: updateData?.timezone ?? '',
  };
};

export const agentFieldsData = (
  editAgentModalTitle: any,
  departmentData: any,
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
    gridLength: 5.6,
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
    gridLength: 5.6,
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'email',
      fullWidth: true,
      disabled: editAgentModalTitle === AGENTS?.UPDATE_AGENT,
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
      options: departmentData?.map((item: any) => item?.name),
      required: true,
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      fullWidth: true,
      name: 'role',
      label: 'Role',
      placeholder: 'Select Role',
      options: roleData,
      required: true,
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
  {
    id: 7,
    componentProps: {
      fullWidth: true,
      name: 'timezone',
      label: 'Time Zone',
      placeholder: 'Select Time Zone',
      required: true,
      options: timeZone?.map((timeZone) => timeZone?.label),
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
];
