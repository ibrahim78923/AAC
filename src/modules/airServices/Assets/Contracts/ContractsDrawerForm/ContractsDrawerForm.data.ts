import { RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const ContractsDrawerFormValidationSchema = Yup.object().shape({
  type: Yup.string(),
  status: Yup.string(),
  vender: Yup.string(),
  expiry: Yup.string(),
});

export const ContractsDrawerFormDefaultValues = {
  type: '',
  status: '',
  vender: '',
  expiry: '',
};

export const ContractsDrawerFormDataArray = [
  {
    componentProps: {
      name: 'type',
      label: 'Contact Type',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'All',
        label: 'All',
      },
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
  },
  {
    componentProps: {
      name: 'status',
      label: 'Contact Status',
      fullWidth: true,
      select: true,
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
  },
  {
    componentProps: {
      name: 'vender',
      label: 'Vender',
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
  },
  {
    componentProps: {
      name: 'expiry',
      label: 'Expiry',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'None',
        label: 'None',
      },
      {
        value: 'All Time',
        label: 'All Time',
      },
      {
        value: 'Today',
        label: 'Today',
      },
      {
        value: 'Yesterday',
        label: 'Yesterday',
      },
      {
        value: 'Previous Week',
        label: 'Previous Week',
      },
      {
        value: 'Previous Month',
        label: 'Previous Month',
      },
      {
        value: 'Next Week',
        label: 'Next Week',
      },
      {
        value: 'Next Month',
        label: 'Next Month',
      },
    ],
    component: RHFSelect,
  },
];
