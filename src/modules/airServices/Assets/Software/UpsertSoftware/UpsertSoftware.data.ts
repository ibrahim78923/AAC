import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import { useLazyGetAgentsDropdownQuery } from '@/services/airServices/assets/software';
import * as Yup from 'yup';

const statusOptions = [
  'Restricted',
  'Ignored',
  'Managed',
  'Disabled',
  'InReview',
];
const typeOptions = ['Desktop', 'Saas', 'Mobile'];

export const upsertSoftwareFormValidationSchema: any = Yup?.object()?.shape({
  name: Yup?.string()?.required('Required'),
  description: Yup?.string(),
  status: Yup?.string()?.required('Required'),
  type: Yup?.string()?.required('Required'),
  publisher: Yup?.string(),
  category: Yup?.string(),
});

export const upsertSoftwareFormDefaultValues = (data: any) => {
  return {
    name: data?.name ?? '',
    description: data?.details?.description ?? '',
    status: data?.status ?? null,
    type: data?.type ?? null,
    publisher: data?.details?.publisher ?? '',
    category: data?.details?.category ?? '',
    managedBy: data?.managedByDetails ?? '',
  };
};

export const upsertSoftwareFormFields = () => {
  const userList = useLazyGetAgentsDropdownQuery();
  return [
    {
      id: 1,
      componentProps: {
        name: 'name',
        label: 'Name',
        fullWidth: true,
        required: true,
      },
      component: RHFTextField,
    },
    {
      id: 2,
      componentProps: {
        name: 'description',
        label: 'Description',
        placeholder: 'Enter Description',
        fullWidth: true,
        multiline: true,
        minRows: 3,
      },
      component: RHFTextField,
    },
    {
      id: 3,
      componentProps: {
        name: 'status',
        label: 'Status',
        fullWidth: true,
        required: true,
        options: statusOptions,
      },
      component: RHFAutocomplete,
    },
    {
      id: 4,
      componentProps: {
        name: 'type',
        label: 'Type',
        fullWidth: true,
        required: true,
        options: typeOptions,
      },
      component: RHFAutocomplete,
    },
    {
      id: 5,
      componentProps: {
        name: 'publisher',
        label: 'Publisher',
        fullWidth: true,
      },
      component: RHFTextField,
    },
    {
      id: 6,
      componentProps: {
        name: 'category',
        label: 'Category',
        fullWidth: true,
      },
      component: RHFTextField,
    },
    {
      id: 7,
      componentProps: {
        name: 'managedBy',
        label: 'Managed By',
        fullWidth: true,
        apiQuery: userList,
        getOptionLabel: (option: any) =>
          option?.firstName || option?.lastName
            ? option?.firstName + ' ' + option?.lastName
            : '',
      },
      component: RHFAutocompleteAsync,
    },
  ];
};
