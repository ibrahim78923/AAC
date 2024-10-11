import { RHFAutocompleteAsync, RHFCheckbox } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = (
  isCustomers: boolean,
  isCustomersGroup: boolean,
) => {
  return Yup?.object()?.shape({
    customers: isCustomers
      ? Yup.array()
          .min(1, 'At least one customer must be selected')
          .required('Field is Required')
      : Yup.array().ensure(),
    customersGroup: isCustomersGroup
      ? Yup.array()
          .min(1, 'At least one customer group must be selected')
          .required('Field is Required')
      : Yup.array().ensure(),
  });
};

export const defaultValues = {
  isCustomers: false,
  customers: [],
  isCustomersGroup: false,
  customersGroup: [],
};

export const formFields = (
  isCustomers: boolean,
  isCustomersGroup: boolean,
  customersData: any,
  customersGroupData: any,
) => {
  return [
    {
      id: 'isCustomers',
      componentProps: {
        name: 'isCustomers',
        label: 'Customers',
        disabled: isCustomersGroup,
      },
      component: RHFCheckbox,
    },

    ...(isCustomers
      ? [
          {
            componentProps: {
              placeholder: 'Select Customers',
              name: 'customers',
              label: 'Customers',
              apiQuery: customersData,
              multiple: true,
              getOptionLabel: (option: any) => `${option?.email}`,
              externalParams: { meta: false },
            },
            component: RHFAutocompleteAsync,
            md: 12,
          },
        ]
      : []),

    {
      id: 'isCustomersGroup',
      componentProps: {
        name: 'isCustomersGroup',
        label: 'Customers Group',
        disabled: isCustomers,
      },
      component: RHFCheckbox,
    },

    ...(isCustomersGroup
      ? [
          {
            componentProps: {
              placeholder: 'Select Customers Group',
              name: 'customersGroup',
              label: 'Customers Group',
              apiQuery: customersGroupData,
              multiple: true,
              getOptionLabel: (option: any) => `${option?.name}`,
              // externalParams: { meta: false },
            },
            component: RHFAutocompleteAsync,
            md: 12,
          },
        ]
      : []),
  ];
};
