import {
  RHFDatePicker,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ItemDetail } from './ItemDetail';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { Box, Typography } from '@mui/material';

const todayDate = dayjs().format('MM/DD/YYYY');

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

export const contractType = [
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
];
export const contractStatus = [
  {
    value: 'Approved',
    label: 'Approved',
  },
  {
    value: 'Draft',
    label: 'Draft',
  },
  {
    value: 'Pending for approval',
    label: 'Pending for approval',
  },
  {
    value: 'Active',
    label: 'Active',
  },
  {
    value: 'Expired',
    label: 'Expired',
  },
  {
    value: 'Rejected',
    label: 'Rejected',
  },
  {
    value: 'Terminated',
    label: 'Terminated',
  },
];
export const billingCycleOptions = [
  {
    value: 'Monthly',
    label: 'Monthly',
  },
  {
    value: 'Quarterly',
    label: 'Quarterly',
  },
  {
    value: 'Half Yearly',
    label: 'Half Yearly',
  },
  {
    value: 'Annual',
    label: 'Annual',
  },
  {
    value: 'One Time',
    label: 'One Time',
  },
];
export const licenseTypeOptions = [
  {
    value: 'Volume',
    label: 'Volume',
  },
  {
    value: 'Enterprise',
    label: 'Enterprise',
  },
  {
    value: 'Trail',
    label: 'Trail',
  },
  {
    value: 'OpenSource',
    label: 'OpenSource',
  },
  {
    value: 'Free',
    label: 'Free',
  },
];

const softwareLicense = {
  software: '',
  itemDetail: [
    {
      serviceName: '',
      priceModel: '',
      cost: 0,
      count: 0,
      comments: '',
    },
  ],
  billingCycle: '',
  licenseType: '',
  licenseKey: '',
};

export const upsertContractFormDefaultValuesFunction = (data?: any) => {
  return {
    contractName: data?.contractName ?? '',
    contractNumber: data?.contractNumber ?? '',
    type: data?.type ?? '',
    associateAssets: data?.associateAssets ?? '',
    cost: data?.cost ?? '',
    status: data?.status ?? '',
    vendor: data?.vendor ?? '',
    approver: data?.approver ?? '',
    startDate: new Date(data?.startDate ?? todayDate),
    endDate: new Date(data?.endDate ?? todayDate),
    autoRenew: data?.autoRenew ?? false,
    notifyExpiry: data?.notifyExpiry ?? false,
    notifyBefore: data?.notifyBefore ?? '',
    notifyTo: data?.notifyTo ?? '',
    itemDetail: !!data?.itemDetail?.length
      ? data?.itemDetail
      : softwareLicense?.itemDetail,
    billingCycle: data?.billingCycle ?? softwareLicense?.billingCycle,
    licenseType: data?.licenseType ?? softwareLicense?.licenseType,
    licenseKey: data?.licenseKey ?? softwareLicense?.licenseKey,
    software: data?.software ?? softwareLicense?.software,
  };
};

export const upsertContractFormSchemaFunction = Yup?.object()?.shape({
  contractName: Yup?.string()?.required('Contract Name is required'),
  contractNumber: Yup?.string()?.required('Contract Number is required'),
  type: Yup?.string()?.required('Type is required'),
  associateAssets: Yup?.string()
    ?.ensure()
    ?.when('type', {
      is: (y: any) => y !== 'Software License',
      then: (schema: any) => schema?.required(),
      otherwise: (schema) => schema?.notRequired(),
    }),
  cost: Yup?.string()?.required('Cost is required'),
  status: Yup?.string()?.required('Status is required'),
  vendor: Yup?.string()?.required('Vendor is required'),
  approver: Yup?.string()?.required('approver is required'),
  startDate: Yup?.date()?.required('Start date is required'),
  endDate: Yup?.date()?.required('End date is required'),
  autoRenew: Yup?.boolean()?.required('auto renew is required'),
  notifyExpiry: Yup?.boolean(),
  notifyBefore: Yup?.string()
    ?.trim()
    ?.ensure()
    ?.when('notifyExpiry', {
      is: (y: any) => y,
      then: (schema: any) => schema?.required(),
      otherwise: (schema) => schema,
    }),
  notifyTo: Yup?.string()
    ?.trim()
    ?.ensure()
    ?.when('notifyExpiry', {
      is: (y: any) => y,
      then: (schema: any) => schema?.required(),
      otherwise: (schema) => schema,
    }),
  software: Yup?.string()
    ?.ensure()
    ?.when('type', {
      is: (y: any) => y === 'Software License',
      then: (schema: any) => schema?.required(),
      otherwise: (schema) => schema?.notRequired(),
    }),
  billingCycle: Yup?.string()
    ?.ensure()
    ?.when('type', {
      is: (y: any) => y === 'Software License',
      then: (schema: any) => schema?.required(),
      otherwise: (schema) => schema?.notRequired(),
    }),
  licenseType: Yup?.string()
    ?.ensure()
    ?.when('type', {
      is: (y: any) => y === 'Software License',
      then: (schema: any) => schema?.required(),
      otherwise: (schema) => schema?.notRequired(),
    }),
  licenseKey: Yup?.string()
    ?.ensure()
    ?.when('type', {
      is: (y: any) => y === 'Software License',
      then: (schema: any) => schema?.required(),
      otherwise: (schema) => schema?.notRequired(),
    }),
  itemDetail: Yup?.array()
    ?.of(
      Yup?.object()?.shape({
        serviceName: Yup?.string(),
        priceModel: Yup?.string(),
        cost: Yup?.number(),
        count: Yup?.number(),
        comments: Yup?.string(),
      }),
    )
    ?.when('type', {
      is: (val: any) => val === 'Software License',
      then: () => {
        return Yup?.array()?.of(
          Yup?.object()?.shape({
            serviceName: Yup?.string()?.required('service name is required'),
            priceModel: Yup?.string()?.required('Price model is required'),
            cost: Yup?.number()?.positive()?.typeError('Not a number'),
            count: Yup?.number()?.positive()?.typeError('Not a number'),
            comments: Yup?.string(),
          }),
        );
      },
      otherwise: (schema: any) => schema?.notRequired(),
    }),
});

export const upsertContractFormFieldsDataFunction = (
  watchForType: any,
  watchForNotifyExpiry = false,
  isFieldDisable = false,
) => [
  {
    id: 3092,
    componentProps: {
      color: 'slateBlue.main',
      variant: 'h4',
    },
    heading: 'General Details',
    md: 12,
    component: Typography,
  },
  {
    id: 2,
    component: RHFTextField,
    md: 6,
    componentProps: {
      fullWidth: true,
      name: 'contractName',
      label: 'Contract Name',
      disabled: isFieldDisable,
    },
  },
  {
    id: 20,
    component: RHFTextField,
    md: 6,
    componentProps: {
      fullWidth: true,
      name: 'contractNumber',
      label: 'Contract Number',
      disabled: isFieldDisable,
    },
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'type',
      label: 'Type',
      select: true,
      options: contractType,
      disabled: isFieldDisable,
    },
    md: 6,
    component: RHFSelect,
  },
  {
    id: 150,
    componentProps: {
      fullWidth: true,
      name: 'associateAssets',
      label: 'Associate Assets',
      select: true,
      options: dropdownDummy,
      disabled: watchForType === 'Software License',
    },
    md: 6,
    component: RHFSelect,
  },
  {
    id: 129,
    componentProps: {
      fullWidth: true,
      name: 'status',
      label: 'Status',
      select: true,
      options: contractStatus,
      disabled: isFieldDisable,
    },
    md: 6,
    component: RHFSelect,
  },
  {
    id: 200,
    component: RHFTextField,
    md: 6,
    componentProps: {
      fullWidth: true,
      name: 'cost',
      label: 'Cost (£)',
      disabled: isFieldDisable,
    },
  },
  {
    id: 82,
    component: RHFSelect,
    md: 6,
    componentProps: {
      fullWidth: true,
      name: 'approver',
      label: 'Approver',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
  },
  {
    id: 100,
    componentProps: {
      fullWidth: true,
      name: 'vendor',
      label: 'Vendor',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    md: 6,
    component: RHFSelect,
  },
  {
    id: 36677,
    componentProps: {
      color: 'slateBlue.main',
      variant: 'h4',
    },
    heading: 'Tenure of contract',
    md: 12,
    component: Typography,
  },
  {
    id: 4246,
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    id: 54223,
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    id: 6524,
    componentProps: {
      name: 'autoRenew',
      label: (
        <Box marginLeft={1}>
          <Typography variant="h6"> Auto Renew </Typography>
          <Typography>
            {' '}
            Contract will auto renew upon reaching contract expiry date
          </Typography>
        </Box>
      ),
    },
    component: RHFSwitch,
    md: 12,
  },
  {
    id: 435,
    componentProps: {
      name: 'notifyExpiry',
      label: (
        <Box marginLeft={1}>
          <Typography> Notify Expiry</Typography>
          <Typography> Notify people upon expiry of contract</Typography>
        </Box>
      ),
    },
    component: RHFSwitch,
    md: 12,
  },
  ...(watchForNotifyExpiry
    ? [
        {
          id: 24230,
          component: RHFTextField,
          md: 6,
          componentProps: {
            fullWidth: true,
            name: 'notifyBefore',
            label: 'Notify Before',
            disabled: isFieldDisable,
          },
        },
        {
          id: 20421,
          component: RHFTextField,
          md: 6,
          componentProps: {
            fullWidth: true,
            name: 'notifyTo',
            label: 'Notify To',
            disabled: isFieldDisable,
          },
        },
      ]
    : []),
  ...(watchForType === 'Software License'
    ? [
        {
          id: 82,
          component: RHFSelect,
          md: 6,
          componentProps: {
            fullWidth: true,
            name: 'software',
            label: 'Software',
            select: true,
            options: dropdownDummy,
            disabled: isFieldDisable,
          },
        },
        {
          id: 3,
          componentProps: {
            color: 'slateBlue.main',
            variant: 'h4',
          },
          heading: 'Item & Cost Details',
          md: 12,
          component: Typography,
        },
        {
          id: 54383,
          componentProps: {
            name: 'itemDetail',
          },
          component: ItemDetail,
          md: 12,
        },
        {
          id: 3,
          componentProps: {
            color: 'slateBlue.main',
            variant: 'h4',
          },
          heading: 'Software License Properties',
          md: 12,
          component: Typography,
        },
        {
          id: 82,
          component: RHFSelect,
          md: 6,
          componentProps: {
            fullWidth: true,
            name: 'billingCycle',
            label: 'Billing Cycle',
            select: true,
            options: billingCycleOptions,
            disabled: isFieldDisable,
          },
        },
        {
          id: 82,
          component: RHFSelect,
          md: 6,
          componentProps: {
            fullWidth: true,
            name: 'licenseType',
            label: 'License Type',
            select: true,
            options: licenseTypeOptions,
            disabled: isFieldDisable,
          },
        },
        {
          id: 24230,
          component: RHFTextField,
          md: 6,
          componentProps: {
            fullWidth: true,
            name: 'licenseKey',
            label: 'License Key',
            disabled: isFieldDisable,
          },
        },
      ]
    : []),
];
