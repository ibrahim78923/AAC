import {
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const validationSchema = Yup.object().shape({
  assetnameprefix: Yup.string().required('Field is Required'),
  assetstate: Yup.string().required('Field is Required'),
  dellMonitor: Yup.string().required('Field is Required'),
  mouse: Yup.string().required('Field is Required'),
  lCD: Yup.string().required('Field is Required'),
});

export const validationSchema1 = Yup.object().shape({
  assetName: Yup.string().required('Field is Required'),
  serialNumber: Yup.string().required('Field is Required'),
  assetTag: Yup.string().required('Field is Required'),
});
export const defaultValues = {
  addNew: 'No',
  assetnameprefix: '',
  location: '',
  acquisitionDate: '',
  assetstate: '',
};
export const defaultValues1 = {
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
      select: false,
      required: true,
      // value: 'In stock',
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
    },
    // inventry: 'hi',
    component: RHFTextField,
    md: 12,
  },
];
