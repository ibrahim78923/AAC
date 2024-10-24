import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import { ROLES } from '@/constants/strings';
export const defaultValues = {
  quoteStatus: '',
  createdBy: '',
};

export const dataArray = (productsAllUsers: any) => {
  return [
    {
      id: '01',
      md: 12,
      component: RHFAutocomplete,
      componentProps: {
        name: 'status',
        label: 'Quote Status',
        placeholder: 'Select Quote Status',
        fullWidth: true,
        options: ['DRAFT', 'PUBLISHED'],
      },
    },
    {
      id: '02',
      md: 12,
      component: RHFAutocompleteAsync,
      componentProps: {
        name: 'createdBy',
        label: 'Created By',
        fullWidth: true,
        placeholder: 'Select Option',
        apiQuery: productsAllUsers,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: { role: ROLES?.ORG_EMPLOYEE },
      },
    },
  ];
};
