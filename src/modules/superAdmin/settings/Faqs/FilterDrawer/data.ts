import {
  RHFAutocompleteAsync,
  RHFSwitchableDatepicker,
} from '@/components/ReactHookForm';
import { fullName } from '@/utils/avatarUtils';

export const filtersDataArray = (products: any, createdByUsers: any) => {
  return [
    {
      md: 12,
      component: RHFAutocompleteAsync,
      componentProps: {
        name: 'faqCategory',
        label: 'Category',
        placeholder: 'Select Category',
        apiQuery: products,
        getOptionLabel: (option: any) => option?.name,
      },
    },
    {
      md: 12,
      component: RHFAutocompleteAsync,
      componentProps: {
        name: 'createdBy',
        label: 'Created By',
        apiQuery: createdByUsers,
        placeholder: 'Select User',
        externalParams: { role: 'SUPER_ADMIN' },
        getOptionLabel: (option: any) =>
          fullName(option?.firstName, option?.lastName),
      },
    },
    {
      componentProps: {
        name: 'createdAt',
        label: 'Created Date',
        fullWidth: true,
      },
      component: RHFSwitchableDatepicker,
      md: 12,
    },
  ];
};
