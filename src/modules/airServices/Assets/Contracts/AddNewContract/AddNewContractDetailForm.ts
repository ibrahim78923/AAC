import {
  RHFDatePicker,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { Typography } from '@mui/material';

const contractTypeOptions = [
  { value: 'lease', label: 'Lease' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'softwareLicense', label: 'Software License' },
  { value: 'warranty', label: 'Warranty' },
];

const associateAssetsOptions = [
  { value: 'logitechMouse', label: 'Logitech Mouse' },
  { value: 'dellMonitor', label: 'Dell Monitor' },
  { value: 'andreasLaptop', label: 'Andreas Laptop' },
];

const statusOptions = [
  { value: 'managed', label: 'Managed' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'saaS', label: 'SaaS' },
  { value: 'mobile', label: 'Mobile' },
];

const vendorOptions = [
  { value: 'microsoft', label: 'Microsoft' },
  { value: 'delll', label: 'Delll' },
  { value: 'apple', label: 'Apple' },
  { value: 'samsung', label: 'Samsung' },
];

const approverOptions = [
  { value: 'markwood', label: 'Markwook' },
  { value: 'randall', label: 'Randall' },
  { value: 'shane', label: 'Shane' },
  { value: 'floyd', label: 'Floyd' },
];

const softwareOptions = [
  { value: 'microsoft', label: 'Microsoft' },
  { value: 'figma', label: 'Figma' },
  { value: 'freshServices', label: 'Freshservices' },
  { value: 'miro', label: 'Miro' },
];

const billingCycleOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'halfYearly', label: 'Half Yearly' },
  { value: 'annual', label: 'Annual' },
  { value: 'oneTime', label: 'One Time' },
];
const licenseTypeOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'halfYearly', label: 'Half Yearly' },
  { value: 'annual', label: 'Annual' },
  { value: 'oneTime', label: 'One Time' },
];

export const validationSchemaAddNewContract = Yup.object().shape({
  contactName: Yup.string().required('Field is Required'),
  contractNumber: Yup.string(),
  type: Yup.string().required('Field is Required'),
  associateAssets: Yup.string().required('Field is Required'),
  status: Yup.string().required('Field is Required'),
  vendor: Yup.string(),
  managedBy: Yup.string(),
  startDate: Yup.date(),
  endDate: Yup.date(),
  autoRenew: Yup.string(),
  notifyExpiry: Yup.string(),
  notifyBefore: Yup.string().required('Field is Required'),
  notifyTo: Yup.string().required('Field is Required'),
  software: Yup.string().required('Field is Required'),
  billingCycle: Yup.string(),
  licenseKey: Yup.string(),
  licenseType: Yup.string(),
});

export const defaultValuesAddNewContract = {
  contactName: '',
  contractNumber: '',
  type: '',
  associateAssets: '',
  status: '',
  vendor: '',
  managedBy: '',
  startDate: new Date(),
  endDate: new Date(),
  autoRenew: '',
  notifyExpiry: '',
  notifyBefore: '',
  notifyTo: '',
  software: '',
  billingCycle: '',
  licenseKey: '',
  licenseType: '',
};

export const addNewContractData = [
  {
    componentProps: {
      name: 'contactName',
      label: 'Contact Name',
      fullWidth: true,
      select: false,
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'contractNumber',
      disabled: true,
      fullWidth: true,
      placeholder: 'CNTW-6',
      label: 'Contract Number',
    },
    md: 6,
    component: RHFTextField,
  },
  {
    componentProps: {
      name: 'type',
      label: 'Type',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: contractTypeOptions,
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      name: 'associateAssets',
      label: 'Associate Assets',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: associateAssetsOptions,
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      name: 'cost',
      label: 'Cost (£)',
      fullWidth: true,
      select: false,
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
      name: 'approver',
      label: 'Approver',
      fullWidth: true,
      select: true,
    },
    options: approverOptions,
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      variant: 'h5',
    },
    heading: 'Tenure of Contract',
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'autoRenew',
      label: 'Auto Renew',
    },
    component: RHFSwitch,
    md: 12,
  },
  {
    componentProps: {
      variant: 'body2',
      sx: { marginTop: '-2rem', marginLeft: '3rem' },
    },
    heading: ' Contract will auto renew upon reaching contract expiry date',
    md: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'notifyExpiry',
      label: 'Notify Expiry',
    },
    component: RHFSwitch,
    md: 12,
  },
  {
    componentProps: {
      variant: 'body2',
      sx: { marginTop: '-2rem', marginLeft: '3.1rem' },
    },
    heading: ' Notify people upon expiry of contract',
    md: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'notifyBefore',
      label: 'Notify Before',
      fullWidth: true,
      select: false,
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'notifyTo',
      label: 'Notify to',
      fullWidth: true,
      select: false,
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      variant: 'h5',
    },
    heading: 'Item & Cost Details',
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'software',
      label: 'Software',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: softwareOptions,
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      variant: 'h5',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'billingCycle',
      label: 'Billing Cycle',
      fullWidth: true,
      select: true,
    },
    options: billingCycleOptions,
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      variant: 'h5',
    },
    heading: 'Software License Properties',
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'licenseType',
      label: 'License Type',
      fullWidth: true,
      select: true,
    },
    options: licenseTypeOptions,
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      name: 'licenseKey',
      label: 'License Key',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 6,
  },
];
