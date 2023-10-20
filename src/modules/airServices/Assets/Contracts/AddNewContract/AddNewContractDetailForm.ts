import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

const contactTypeOptions = [
  { value: 'Lease', label: 'Lease' },
  { value: 'Maintenance', label: 'Maintenance' },
  { value: 'Software License', label: 'Software License' },
  { value: 'Warranty', label: 'Warranty' },
];

const assetsOptions = [
  { value: 'Logitech Mouse', label: 'Logitech Mouse' },
  { value: 'Dell Monitor', label: 'Dell Monitor' },
  { value: 'Andrea’s Laptop', label: 'Andrea’s Laptop' },
];

const statusOptions = [
  { value: 'Draft', label: 'Draft' },
  { value: 'Pending Approval', label: 'Pending Approval' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Expired', label: 'Expired' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Terminated', label: 'Terminated' },
];

const vendorOptions = [
  { value: 'Microsoft', label: 'Microsoft' },
  { value: 'Delll', label: 'Delll' },
  { value: 'Apple', label: 'Apple' },
  { value: 'Samsung', label: 'Samsung' },
];

const approvalOptions = [
  { value: 'Markwood', label: 'Markwood' },
  { value: 'Randall', label: 'Randall' },
  { value: 'Shane', label: 'Shane' },
  { value: 'Floyd', label: 'Floyd' },
];

export const validationSchemaAddNewContract = Yup.object().shape({
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

export const defaultValuesAddNewContract = {
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

export const addNewContractData = [
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
    options: contactTypeOptions,
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
    options: assetsOptions,
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
    options: statusOptions,
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
    options: vendorOptions,
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
    options: approvalOptions,
    component: RHFSelect,
    md: 6,
  },
];
