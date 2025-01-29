import {
  RHFAutocompleteAsync,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { useLazyGetRequesterDropdownQuery } from '@/services/airCustomerPortal/catalog';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  signingOrder: Yup?.string()?.trim(),
  onBehalfOf: Yup?.mixed().nullable(),
  personalTitle: Yup?.string()?.trim(),
  fullName: Yup?.string(),
  email: Yup?.string()?.trim(),
});

export const defaultValues = {
  signingOrder: '',
  onBehalfOf: null,
  personalTitle: '',
  fullName: '',
  email: '',
};

export const AddSigneeFieldsData = () => {
  const apiQueryRequester = useLazyGetRequesterDropdownQuery();
  return [
    {
      componentProps: {
        name: 'signingOrder',
        label: 'Signing order',
        fullWidth: true,
        select: true,
        placeholder: 'select order',
      },
      options: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        label: 'on behalf of',
        name: 'onBehalfOf',
        fullWidth: true,
        placeholder: 'Select Assignee',
        apiQuery: apiQueryRequester,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: {},
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      component: RHFTextField,
      md: 12,
      componentProps: {
        name: 'personalTitle',
        label: 'Personal Title',
        placeholder: 'Enter Title',
      },
    },
    {
      component: RHFTextField,
      md: 12,
      componentProps: {
        name: 'fullName',
        label: 'Full name',
        placeholder: 'Enter Full name',
        required: true,
      },
    },
    {
      component: RHFTextField,
      md: 12,
      componentProps: {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter Email',
      },
    },
  ];
};
