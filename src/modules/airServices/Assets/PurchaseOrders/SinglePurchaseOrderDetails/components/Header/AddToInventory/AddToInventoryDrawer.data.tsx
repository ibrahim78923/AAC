import {
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const validationSchema = Yup.object().shape({
  addNew: Yup.string(),

  assetnameprefix: Yup.string().required('Field is Required'),
  location: Yup.string(),
  acquisitionDate: Yup.string(),
  assetstate: Yup.string(),
  assetName: Yup.string().required('Field is Required'),
  serialNumber: Yup.string(),
  assetTag: Yup.string(),
});

export const defaultValues = {
  addNew: 'No',
  assetnameprefix: '',
  location: '',
  acquisitionDate: '',
  assetstate: '',
  assetName: '',
  serialNumber: '',
  assetTag: '',
};
export const addToInventoryDrawerArray = [
  {
    componentProps: {
      name: 'addNew',
      fullWidth: true,
      options: [
        { label: 'Add New', value: 'No' },
        { label: 'Update Existing', value: 'Yes' },
      ],
    },
    component: RHFRadioGroup,
    md: 12,
  },
  {
    componentProps: {
      name: 'dellMonitor',
      label: 'Dell Monitor',
      fullWidth: true,
      select: false,
      required: true,
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
      select: false,
      required: true,
    },
    toShow: 'No',
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'lCD',
      label: 'LCD',
      fullWidth: true,
      select: false,
      required: true,
    },
    toShow: 'No',
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'assetnameprefix',
      label: 'Asset Name Prefix',
      fullWidth: true,
      select: false,
      required: true,
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
      select: true,
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
      fullWidth: true,
      select: false,
      value: 'Select Status',
    },
    toShow: 'Yes',
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'assetstate ',
      label: 'Asset state ',
      fullWidth: true,
      select: false,
      required: true,
      value: 'In stock',
    },
    toShow: 'Yes',
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
      value: 'Dell',
    },
    // inventry: 'hi',
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
      value: 'Enter serial Number',
    },
    // inventry: 'hi',
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
      value: 'Enter Asset tag',
    },
    // inventry: 'hi',
    component: RHFTextField,
    md: 12,
  },
];
