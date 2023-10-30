import {
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const addInventoryValidationSchemaOne = Yup?.object()?.shape({
  description: Yup?.string()?.required('Field is Required'),
  assetnameprefix: Yup?.string()?.required('Field is Required'),
  location: Yup?.string(),
  acquisitionDate: Yup?.string(),
  assetstate: Yup?.string()?.required('Field is Required'),
});
export const addInventoryValidationSchemaUpdate = Yup?.object()?.shape({
  updateExisting: Yup?.string()?.required('Field is Required'),
  dellMonitor: Yup?.boolean(),
  mouse: Yup?.boolean(),
  lcd: Yup?.boolean(),
});
export const addToInventoryItemStatusValidationSchema = Yup?.object()?.shape({
  assetName: Yup?.string()?.required('Field is Required'),
  serialNumber: Yup?.string(),
  assetTag: Yup?.string(),
});

export const addInventoryDefaultValuesOne = {
  description: '',
  assetnameprefix: '',
  location: '',
  acquisitionDate: '',
  assetstate: '',
};

export const addInventoryDefaultValuesOneUpdate = {
  updateExisting: '',
  dellMonitor: false,
  mouse: false,
  lcd: false,
};
export const addToInventoryItemStatusDefaultValues = {
  assetName: '',
  serialNumber: '',
  assetTag: '',
};
export const addToInventoryItemAdded = [
  {
    componentProps: {
      name: 'assetnameprefix',
      label: 'Asset Name Prefix',
      fullWidth: true,
    },
    toShow: 'Yes',
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'location',
      label: 'Location',
      fullWidth: true,
    },
    options: [
      {
        value: 'afghanistan',
        label: 'Afghanistan',
      },
      {
        value: 'alandIslands',
        label: 'Aland Islands',
      },
      {
        value: 'albania',
        label: 'Albania',
      },
      {
        value: 'American Samoa',
        label: 'American Samoa',
      },
    ],
    toShow: 'Yes',
    component: RHFSelect,
    md: 12,
  },

  {
    componentProps: {
      name: 'acquisitionDate',
      label: 'Acquisition Date',
    },
    toShow: 'Yes',
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'assetstate',
      label: 'Asset state',
      fullWidth: true,
    },
    toShow: 'Yes',
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'updateExisting',
      fullWidth: true,
      row: false,
      options: [
        { label: 'LCD', value: 'lcd' },
        { label: 'Dell Monitor', value: 'dellMonitor' },
        { label: 'Mouse', value: 'mouse' },
      ],
    },
    toShow: 'No',
    component: RHFRadioGroup,
    md: 12,
  },
];

export const addToInventoryItemStatus = [
  {
    componentProps: {
      name: 'assetName',
      label: 'Asset_Name',
      fullWidth: true,
      select: false,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'serialNumber',
      label: 'Serial Number',
      fullWidth: true,
      select: false,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'assetTag',
      label: 'Asset Tag',
      fullWidth: true,
      select: false,
    },

    component: RHFTextField,
    md: 12,
  },
];
