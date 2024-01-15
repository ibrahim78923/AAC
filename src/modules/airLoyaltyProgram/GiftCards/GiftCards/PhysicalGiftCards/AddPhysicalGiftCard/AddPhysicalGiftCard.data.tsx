import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
const optionsVisibleShop = ['Shop 1', 'Shop 2'];

export const validationSchema = Yup?.object()?.shape({
  shop: Yup?.mixed()?.required('Required'),
  noOfGiftCards: Yup?.string()?.trim()?.required('Required'),
});

export const defaultValues = {
  noOfGiftCards: '',
  shop: null,
};

export const addPhysicalGiftCardFormFields = [
  {
    id: 3,
    componentProps: {
      name: 'shop',
      label: 'Shop',
      required: true,
      options: optionsVisibleShop,
      placeholder: 'Select',
    },
    component: RHFAutocomplete,
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
