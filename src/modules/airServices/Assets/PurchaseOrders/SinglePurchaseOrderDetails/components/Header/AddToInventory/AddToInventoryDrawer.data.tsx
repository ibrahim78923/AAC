import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const addInventoryValidationSchemaOne = Yup.object().shape({
  assetnameprefix: Yup.string().required('Field is Required'),
  location: Yup.string(),
  acquisitionDate: Yup.string(),
  assetstate: Yup.string().required('Field is Required'),
});
export const addInventoryValidationSchemaUpdate = Yup.object().shape({
  dellMonitor: Yup.string().required('Field is Required'),
  mouse: Yup.string().required('Field is Required'),
  lcd: Yup.string().required('Field is Required'),
});
export const addInventoryValidationSchemaTwo = Yup.object().shape({
  assetName: Yup.string().required('Field is Required'),
  serialNumber: Yup.string().required('Field is Required'),
  assetTag: Yup.string().required('Field is Required'),
});

export const addInventoryDefaultValuesOne = {
  assetnameprefix: '',
  location: '',
  acquisitionDate: '',
  assetstate: '',
};

export const addInventoryDefaultValuesOneUpdate = {
  dellMonitor: '',
  mouse: '',
  lcd: '',
};
export const addInventoryDefaultValuesTwo = {
  assetName: '',
  serialNumber: '',
  assetTag: '',
};
export const addToInventoryDrawerArray = [
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
      name: 'dellMonitor',
      label: 'Dell Monitor',
      fullWidth: true,
    },
    toShow: 'No',
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'mouse',
      label: 'Mouse',
      fullWidth: true,
    },
    toShow: 'No',
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'lcd',
      label: 'LCD',
      fullWidth: true,
    },
    toShow: 'No',
    component: RHFTextField,
    md: 12,
  },
];

export const addToInventorySecondDrawerArray = [
  {
    componentProps: {
      name: 'assetName',
      label: 'Asset_Name',
      fullWidth: true,
      select: false,
      required: true,
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
      required: true,
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
      required: true,
    },

    component: RHFTextField,
    md: 12,
  },
];
