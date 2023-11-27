import { RHFEditor, RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import {
  productAssetTypeOption,
  productCatalogStatusOption,
} from '../ProductCatalog.data';

export const upsertProductCatalogValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field is Required'),
  assetType: Yup?.string(),
  manufacturer: Yup?.string()?.required('Required'),
  status: Yup?.string()?.required('Field is Required'),
  modeOfProcurement: Yup?.string()?.required('Field is Required'),
  description: Yup?.string(),
});

export const upsertProductCatalogDefaultValuesFunction = (data?: any) => {
  return {
    name: data?.name ?? '',
    assetType: data?.assetType ?? '',
    manufacturer: data?.manufacturer ?? '',
    status: data?.status ?? '',
    modeOfProcurement: data?.modeOfProcurement ?? '',
    description: data?.description ?? '',
  };
};
export const upsertProductCatalogFormFieldsDynamic = () => [
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'assetType',
      label: 'Asset Type',
      fullWidth: true,
      select: true,
      options: productAssetTypeOption,
    },
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      name: 'manufacturer',
      label: 'Manufacturer',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
      options: productCatalogStatusOption,
    },
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      name: 'modeOfProcurement',
      label: 'Mode of Procurement',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      style: { height: '250px' },
    },
    component: RHFEditor,
    md: 12,
  },
];
