import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import {
  modeOfProcurementOption,
  productCatalogStatusOption,
} from '../ProductCatalog.data';

export const upsertProductCatalogValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Name is required'),
  assetType: Yup?.mixed()?.nullable()?.required('Asset Type is required'),
  manufacturer: Yup?.string()?.trim()?.required('Manufacturer is required'),
  status: Yup?.mixed()?.nullable()?.required('Status is required'),
  modeOfProcurement: Yup?.mixed()
    ?.nullable()
    ?.required('Mode of procurement is required'),
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
export const upsertProductCatalogFormFieldsDynamic = (
  apiQueryAssetType: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
      required: true,
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
      required: true,
      apiQuery: apiQueryAssetType,
      externalParams: { meta: false, limit: 50 },
    },
    component: RHFAutocompleteAsync,
    md: 6,
  },
  {
    id: 3,
    componentProps: {
      name: 'manufacturer',
      label: 'Manufacturer',
      fullWidth: true,
      required: true,
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
      required: true,
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
      required: true,
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
