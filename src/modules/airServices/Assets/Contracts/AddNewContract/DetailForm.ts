import {
  RHFDropZone,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const validationSchema = Yup.object().shape({
  contactname: Yup.string().required('Field is Required'),
  contactnumber: Yup.string(),
  type: Yup.string().required('Field is Required'),
  assets: Yup.string().required('Field is Required'),
  cost: Yup.string(),
  status: Yup.string().required('Field is Required'),
  vendor: Yup.string(),
  approval: Yup.string(),
  file: Yup.mixed(),
});

export const defaultValues = {
  contactname: '',
  contactnumber: '',
  type: '',
  assets: '',
  cost: '',
  status: '',
  vendor: '',
  approval: '',
  file: '',
};
export const dataArray = [
  {
    componentProps: {
      name: 'contactname',
      label: 'Contact Name',
      fullWidth: true,
      placeholder: 'Contact Name',
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'contactnumber',
      label: 'Contact Number',
      fullWidth: true,
      placeholder: 'Contact Number',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'type',
      label: 'Contact Type',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      {
        value: 'Lease',
        label: 'Lease',
      },
      {
        value: 'Maintenance',
        label: 'Maintenance',
      },
      {
        value: 'Software License',
        label: 'Software License',
      },
      {
        value: 'Warranty',
        label: 'Warranty',
      },
    ],
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      name: 'assets',
      label: 'Associate Assets',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      {
        value: 'Logitech Mouse',
        label: 'Logitech Mouse',
      },
      {
        value: 'Dell Monitor',
        label: 'Dell Monitor',
      },
      {
        value: 'Andrea’s Laptop',
        label: 'Andrea’s Laptop',
      },
    ],
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      name: 'cost',
      label: 'Cost (£)',
      fullWidth: true,
      placeholder: 'Cost (£)',
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
      required: true,
    },
    options: [
      {
        value: 'Draft',
        label: 'Draft',
      },
      {
        value: 'Pending Approval',
        label: 'Pending Approval',
      },
      {
        value: 'Approved',
        label: 'Approved',
      },
      {
        value: 'Expired ',
        label: 'Expired ',
      },
      {
        value: 'Rejected',
        label: 'Rejected',
      },
      {
        value: 'Terminated',
        label: 'Terminated',
      },
    ],
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      name: 'vendor',
      label: 'Vendor',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'Microsoft',
        label: 'Microsoft',
      },
      {
        value: 'Delll',
        label: 'Delll',
      },
      {
        value: 'Apple',
        label: 'Apple',
      },
      {
        value: 'Samsung',
        label: 'Samsung',
      },
    ],
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      name: 'approval',
      label: 'Approval',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'Markwood',
        label: 'Markwood',
      },
      {
        value: 'Randall',
        label: 'Randall',
      },
      {
        value: 'Shane',
        label: 'Shane',
      },
      {
        value: 'Floyd',
        label: 'Floyd',
      },
    ],
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      name: 'file',
      label: 'Attach a File',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];
