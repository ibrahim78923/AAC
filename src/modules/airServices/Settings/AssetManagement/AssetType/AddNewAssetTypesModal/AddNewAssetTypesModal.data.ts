import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchemaAddNewAssetTypes: any = Yup?.object()?.shape({
  name: Yup?.string()?.required('Required'),
  description: Yup?.string(),
});

export const assetTypesDefaultValues = (assetTypeData: any) => {
  return {
    name: assetTypeData?.name ?? '',
    description: assetTypeData?.description ?? '',
  };
};

export const addNewAssetTypesModalField = [
  {
    id: 1,
    componentProps: {
      name: 'name',
      fullWidth: true,
      placeholder: 'Enter Your Name',
      label: 'Name',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 1,
    componentProps: {
      name: 'description',
      multiline: true,
      fullWidth: true,
      minRows: 4,
      placeholder: 'Enter Description',
      label: 'Description',
    },
    component: RHFTextField,
    md: 12,
  },
];
