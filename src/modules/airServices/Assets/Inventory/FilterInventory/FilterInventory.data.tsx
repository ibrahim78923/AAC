import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const dropdownDummy = [
  {
    value: 'option1',
    label: 'Option 1',
  },
  {
    value: 'option2',
    label: 'Option 2',
  },
];

export const inventoryFilterFormDefaultValues = {
  assetType: '',
  usedBy: '',
  department: '',
  locations: '',
  createdDate: '',
  updatedDate: '',
  impact: '',
  createdBy: '',
  assetLifeExpiry: '',
};

export const inventoryFilterFormDefaultValuesFunction = (
  data: any = inventoryFilterFormDefaultValues,
) => {
  return {
    assetType: data?.assetType,
    usedBy: data?.usedBy,
    department: data?.department,
    locations: data?.locations,
    createdDate: data?.createdDate,
    updatedDate: data?.updatedDate,
    impact: data?.impact,
    createdBy: data?.createdBy,
    assetLifeExpiry: data?.assetLifeExpiry,
  };
};

export const inventoryFilterFormSchema: any = Yup.object().shape({
  assetType: Yup.string(),
  usedBy: Yup.string(),
  department: Yup.string(),
  locations: Yup.string(),
  createdDate: Yup.string(),
  updatedDate: Yup.string(),
  impact: Yup.string(),
  createdBy: Yup.string(),
  assetLifeExpiry: Yup.string(),
});

export const inventoryFilterFormFieldsDataFunction = (
  isFieldDisable = false,
) => [
  {
    id: 2,
    component: RHFSelect,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'assetType',
      label: 'Asset Type',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'usedBy',
      label: 'Used By',
      disabled: isFieldDisable,
    },
    gridLength: 12,
    component: RHFTextField,
  },
  {
    id: 150,
    componentProps: {
      fullWidth: true,
      name: 'department',
      label: 'Department',
      disabled: isFieldDisable,
    },
    gridLength: 12,
    component: RHFTextField,
  },
  {
    id: 200,
    component: RHFTextField,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'locations',
      label: 'Locations',
      disabled: isFieldDisable,
    },
  },
  {
    id: 129,
    componentProps: {
      fullWidth: true,
      name: 'createdDate',
      label: 'Created Date',
      disabled: isFieldDisable,
      select: true,
      options: dropdownDummy,
    },
    gridLength: 12,
    component: RHFSelect,
  },
  {
    id: 129,
    componentProps: {
      fullWidth: true,
      name: 'updatedDate',
      label: 'Updated Date',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 12,
    component: RHFSelect,
  },

  {
    id: 82,
    component: RHFSelect,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'impact',
      label: 'Impact',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
  },
  {
    id: 96,
    componentProps: {
      fullWidth: true,
      name: 'createdBy',
      label: 'Created By',
      disabled: isFieldDisable,
    },
    gridLength: 12,
    component: RHFTextField,
  },
  {
    id: 8281,
    component: RHFSelect,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'assetLifeExpiry',
      label: 'Asset Life Expire On',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
  },
];
