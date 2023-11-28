import {
  RHFAutocomplete,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import {
  modeOfProcurementOption,
  productAssetTypeOption,
  productCatalogStatusOption,
} from '../ProductCatalog.data';

export const upsertProductCatalogValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field is Required'),
  assetType: Yup?.mixed()?.nullable()?.required('Required'),
  manufacturer: Yup?.string()?.required('Required'),
  status: Yup?.mixed()?.nullable()?.required('Field is Required'),
  modeOfProcurement: Yup?.mixed()?.nullable()?.required('Field is Required'),
  description: Yup?.string(),
});

export const upsertProductCatalogDefaultValuesFunction = (data?: any) => {
  return {
    name: data?.name ?? '',
    assetType: data?.assetType ?? null,
    manufacturer: data?.manufacturer ?? '',
    status: data?.status ?? null,
    modeOfProcurement: data?.modeOfProcurement ?? null,
    description: data?.description ?? '',
  };
};
export const upsertProductCatalogFormFieldsDynamic = () => [
  {
    id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 2,
    componentProps: {
      name: 'assetType',
      label: 'Asset Type',
      fullWidth: true,
      options: productAssetTypeOption,
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 3,
    componentProps: {
      name: 'manufacturer',
      label: 'Manufacturer',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 4,
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      options: productCatalogStatusOption,
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 5,
    componentProps: {
      name: 'modeOfProcurement',
      label: 'Mode of Procurement',
      fullWidth: true,
      options: modeOfProcurementOption,
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 6,
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
