import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

const assetStateOptions = ['In Stock', 'In Transit', 'In Use'];

export const addAssetValidationSchema = Yup?.object()?.shape({
  displayName: Yup?.string()?.trim()?.required('Field is Required'),
  assetState: Yup?.string()?.required('Field is Required'),
});

export const addAssetDefaultValues = {
  displayName: '',
  assetState: '',
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
      name: 'assetState',
      label: 'Asset State',
      required: true,
      fullWidth: true,
      options: assetStateOptions,
    },
    component: RHFAutocomplete,
  },
];
