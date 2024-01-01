import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

const assetStateOptions = ['IN_STOCK', 'IN_TRANSIT', 'IN_USE'];

export const addAssetValidationSchema = Yup?.object()?.shape({
  displayName: Yup?.string()?.trim()?.required('Required'),
  state: Yup?.string()?.required('Required'),
});

export const addAssetDefaultValues = {
  displayName: '',
  state: '',
};

export const addAssetDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'displayName',
      label: 'Display Name',
      required: true,
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'state',
      label: 'Asset State',
      required: true,
      fullWidth: true,
      options: assetStateOptions,
    },
    component: RHFAutocomplete,
  },
];
