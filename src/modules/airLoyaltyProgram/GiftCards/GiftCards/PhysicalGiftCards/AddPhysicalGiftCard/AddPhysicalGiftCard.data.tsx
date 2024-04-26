import { RHFAutocompleteAsync, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addPhysicalGiftCardValidationSchema = Yup?.object()?.shape({
  shop: Yup?.mixed()?.required('Required'),
  noOfGiftCards: Yup?.string()?.trim()?.required('Required'),
});

export const addPhysicalGiftCardDefaultValues = {
  noOfGiftCards: '',
  shop: null,
};

export const addPhysicalGiftCardFormFieldsDynamic = (shopApiQuery: any) => [
  {
    id: 3,
    componentProps: {
      name: 'shop',
      label: 'Shop',
      required: true,
      placeholder: 'Select',
      apiQuery: shopApiQuery,
      getOptionLabel: (option: any) => option?.shopName,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
  {
    id: 1,
    componentProps: {
      name: 'noOfGiftCards',
      label: 'No of Gift Cards',
      required: true,
      placeholder: 'Enter Number of Gift Cards',
    },

    component: RHFTextField,
  },
];
