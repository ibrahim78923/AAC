import {
  RHFAutocomplete,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import {
  modeOfProcurementOption,
  productCatalogStatusOption,
} from '../ProductCatalog.data';
import {
  CHARACTERS_LIMIT,
  GLOBAL_CHARACTERS_LIMIT,
} from '@/constants/validation';
import { AssetTypeDropdown } from './AssetTypeDropdown';

export const upsertProductCatalogValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()
    ?.trim()
    ?.required('Name is required')
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.NAME,
      `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.NAME}`,
    ),
  assetType: Yup?.mixed()?.nullable()?.required('Asset Type is required'),
  manufacturer: Yup?.string()
    ?.trim()
    ?.max(
      CHARACTERS_LIMIT?.SERVICES_SETTING_PRODUCT_CATALOG_MANUFACTURER_MAX_CHARACTERS,
      `Maximum characters limit is ${CHARACTERS_LIMIT?.SERVICES_SETTING_PRODUCT_CATALOG_MANUFACTURER_MAX_CHARACTERS}`,
    ),
  status: Yup?.mixed()?.nullable()?.required('Status is required'),
  modeOfProcurement: Yup?.mixed()?.nullable(),
  description: Yup?.string()?.trim(),
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
    _id: 1,
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
    _id: 2,
    component: AssetTypeDropdown,
    md: 6,
  },
  {
    _id: 3,
    componentProps: {
      name: 'manufacturer',
      label: 'Manufacturer',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    _id: 4,
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      required: true,
      options: productCatalogStatusOption,
      isOptionEqualToValue: (option: any, newValue: any) => option === newValue,
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    _id: 5,
    componentProps: {
      name: 'modeOfProcurement',
      label: 'Mode of Procurement',
      fullWidth: true,
      options: modeOfProcurementOption,
      isOptionEqualToValue: (option: any, newValue: any) => option === newValue,
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    _id: 6,
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
