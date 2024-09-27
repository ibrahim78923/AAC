import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { Box, Typography } from '@mui/material';
import {
  BILLING_CYCLE,
  CONTRACT_STATUS,
  CONTRACT_TYPES,
  LICENSE_TYPE,
} from '@/constants/strings';
import { ItemDetail } from './ItemDetail';
import { localeDateTime } from '@/utils/dateTime';
import { CHARACTERS_LIMIT } from '@/constants/validation';

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

export const contractTypeOptions = [
  {
    _id: CONTRACT_TYPES?.LEASE,
    label: CONTRACT_TYPES?.LEASE,
  },
  {
    _id: CONTRACT_TYPES?.MAINTENANCE,
    label: CONTRACT_TYPES?.MAINTENANCE,
  },
  {
    _id: CONTRACT_TYPES?.SOFTWARE_LICENSE,
    label: 'SOFTWARE_LICENSE',
  },
  {
    _id: CONTRACT_TYPES?.WARRANTY,
    label: CONTRACT_TYPES?.WARRANTY,
  },
];

export const contractStatusOptions = [
  {
    _id: CONTRACT_STATUS?.APPROVED,
    label: 'Approved',
  },
  {
    _id: CONTRACT_STATUS?.DRAFT,
    label: 'Draft',
  },
  {
    _id: CONTRACT_STATUS?.PENDING_APPROVAL,
    label: 'Pending for approval',
  },
  {
    _id: CONTRACT_STATUS?.ACTIVE,
    label: 'Active',
  },
  {
    _id: CONTRACT_STATUS?.EXPIRED,
    label: 'Expired',
  },
  {
    _id: CONTRACT_STATUS?.REJECTED,
    label: 'Rejected',
  },
  {
    _id: CONTRACT_STATUS?.TERMINATED,
    label: 'Terminated',
  },
];

export const billingCycleOptions = [
  {
    _id: BILLING_CYCLE?.MONTHLY,
    label: 'Monthly',
  },
  {
    _id: BILLING_CYCLE?.QUARTERLY,
    label: 'Quarterly',
  },
  {
    _id: BILLING_CYCLE?.HALF_YEARLY,
    label: 'Half Yearly',
  },
  {
    _id: BILLING_CYCLE?.ANNUAL,
    label: 'Annual',
  },
  {
    _id: BILLING_CYCLE?.ONE_TIME,
    label: 'One Time',
  },
];

export const licenseTypeOptions = [
  {
    _id: LICENSE_TYPE?.VOLUME,
    label: 'Volume',
  },
  {
    _id: LICENSE_TYPE?.ENTERPRISE,
    label: 'Enterprise',
  },
  {
    _id: LICENSE_TYPE?.TRIAL,
    label: 'Trial',
  },
  {
    _id: LICENSE_TYPE?.OPEN_SOURCE,
    label: 'OpenSource',
  },
  {
    _id: LICENSE_TYPE?.FREE,
    label: 'Free',
  },
];
export const softwareLicense = {
  software: null,
  itemDetail: [
    {
      serviceName: '',
      priceModel: null,
      cost: 0,
      count: 0,
      comments: '',
    },
  ],
  billingCycle: null,
  licenseType: null,
  licenseKey: '',
};
export const upsertContractFormDefaultValuesFunction: any = (
  data?: any,
  softwareFind?: any,
) => {
  return {
    contractName: data?.contractName ?? '',
    contractNumber: data?.contractNumber ?? '',
    type: data?.contractTypeData ?? {
      _id: softwareFind?._id,
      name: softwareFind?.name,
    },
    cost: data?.cost ?? 0,
    status: data?.status ?? {
      _id: CONTRACT_STATUS?.DRAFT,
      label: 'Draft',
    },
    vendor: data?.vendor ?? null,
    approver: data?.approver ?? null,
    startDate: data?.startDate ? localeDateTime(data?.startDate) : new Date(),
    endDate: data?.startDate ? localeDateTime(data?.endDate) : new Date(),
    autoRenew: data?.autoRenew ?? false,
    notifyExpiry: data?.notifyExpiry ?? false,
    notifyBefore: data?.notifyBefore ?? '',
    notifyTo: data?.notifyTo ?? null,
    itemDetail: !!data?.itemDetail?.length
      ? data?.itemDetail
      : softwareLicense?.itemDetail,
    billingCycle: data?.billingCycle ?? softwareLicense?.billingCycle,
    licenseType: data?.licenseType ?? softwareLicense?.licenseType,
    licenseKey: data?.licenseKey ?? softwareLicense?.licenseKey,
    software: data?.[0] ?? softwareLicense?.software,
    attachFile: null,
  };
};

export const upsertContractFormSchemaFunction: any = Yup?.object()?.shape({
  contractName: Yup?.string()
    ?.trim()
    ?.required('Contract name is required')
    ?.max(
      CHARACTERS_LIMIT?.SERVICES_ASSETS_SOFTWARE_DETAILS_CONTRACTS_NAME_MAX_CHARACTERS,
      `Contract name should be less than ${CHARACTERS_LIMIT?.SERVICES_ASSETS_SOFTWARE_DETAILS_CONTRACTS_NAME_MAX_CHARACTERS} characters`,
    ),
  contractNumber: Yup?.string(),
  type: Yup?.mixed()?.nullable()?.required('Required'),
  cost: Yup?.number()
    ?.typeError('Not a number')
    ?.moreThan(-1, 'cost must be positive'),
  status: Yup?.mixed()?.nullable()?.required('Required'),
  vendor: Yup?.mixed()?.nullable(),
  approver: Yup?.mixed()?.nullable(),
  startDate: Yup?.date(),
  endDate: Yup?.date(),
  autoRenew: Yup?.boolean(),
  notifyExpiry: Yup?.boolean(),
  notifyBefore: Yup?.string()
    ?.trim()
    ?.ensure()
    ?.when('notifyExpiry', {
      is: (value: any) => value,
      then: (schema: any) => schema?.required('Notify before is required'),
      otherwise: (schema) => schema,
    }),
  notifyTo: Yup?.mixed()
    ?.nullable()
    ?.when('notifyExpiry', {
      is: (value: any) => value,
      then: (schema: any) => schema?.required('Notify to is required'),
      otherwise: (schema: any) => schema,
    }),
  software: Yup?.mixed()?.nullable()?.required('Software is required'),
  billingCycle: Yup?.mixed()?.nullable()?.required('Billing cycle is required'),
  licenseType: Yup?.mixed()?.nullable()?.required('License type is required'),
  licenseKey: Yup?.string()
    ?.trim()
    ?.required('License key is required')
    ?.matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/, 'must be a string'),
  itemDetail: Yup?.array()
    ?.of(
      Yup?.object()?.shape({
        serviceName: Yup?.string(),
        priceModel: Yup?.mixed()?.nullable(),
        cost: Yup?.number(),
        count: Yup?.number(),
        comments: Yup?.string(),
      }),
    )
    ?.when('type', {
      is: (value: any) => value?._id === CONTRACT_TYPES?.SOFTWARE_LICENSE,
      then: () => {
        return Yup?.array()
          ?.of(
            Yup?.object()?.shape({
              serviceName: Yup?.string()?.required('Service name is required'),
              priceModel: Yup?.mixed()
                ?.nullable()
                ?.required('price model is required'),
              cost: Yup?.number()
                ?.required('cost is required')
                ?.positive('Greater than zero')
                ?.typeError('Not a number'),
              count: Yup?.number()
                ?.required('count is required')
                ?.positive('Greater than zero')
                ?.typeError('Not a number'),
              comments: Yup?.string()?.max(
                CHARACTERS_LIMIT?.SERVICES_ASSETS_SOFTWARE_DETAILS_CONTRACTS_COMMENTS_MAX_CHARACTERS,
                `Comments should be less than ${CHARACTERS_LIMIT?.SERVICES_ASSETS_SOFTWARE_DETAILS_CONTRACTS_COMMENTS_MAX_CHARACTERS} characters`,
              ),
            }),
          )
          ?.min(1, 'At least one item is required');
      },
      otherwise: (schema: any) => schema?.notRequired(),
    }),
});

export const upsertContractFormFieldsDataFunction = (
  watchForNotifyExpiry = false,
  apiQueryVendor: any,
  apiQueryApprover: any,
  apiQuerySoftware: any,
) => [
  {
    id: 1,
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
      placeholder: 'Enter Contract Name',
      required: true,
    },
  },
  {
    id: 4,
    componentProps: {
      name: 'type',
      label: 'Type',
      disabled: true,
      required: true,
      getOptionLabel: (option: any) => option?.name || '',
    },
    md: 6,
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      fullWidth: true,
      name: 'status',
      label: 'Status',
      options: contractStatusOptions,
      required: true,
      disabled: true,
      getOptionLabel: (option: any) => option?.label,
    },
    md: 6,
    component: RHFAutocomplete,
  },
  {
    id: 7,
    component: RHFTextField,
    md: 6,
    componentProps: {
      fullWidth: true,
      name: 'cost',
      label: 'Cost (£)',
      placeholder: 'Enter Cost',
    },
  },
  {
    id: 8,
    component: RHFAutocompleteAsync,
    md: 6,
    componentProps: {
      fullWidth: true,
      name: 'approver',
      label: 'Approver',
      placeholder: 'Select Approver',
      apiQuery: apiQueryApprover,
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
  },
  {
    id: 9,
    componentProps: {
      fullWidth: true,
      name: 'vendor',
      label: 'Vendor',
      placeholder: 'Select Vendor',
      apiQuery: apiQueryVendor,
      externalParams: { meta: false, limit: 50 },
    },
    md: 6,
    component: RHFAutocompleteAsync,
  },
  {
    id: 10,
    componentProps: {
      color: 'slateBlue.main',
      variant: 'h4',
    },
    heading: 'Tenure of contract',
    md: 12,
    component: Typography,
  },
  {
    id: 11,
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
      disabled: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    id: 12,
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
      disablePast: true,
      textFieldProps: { readOnly: true },
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    id: 13,
    componentProps: {
      name: 'autoRenew',
      label: (
        <Box marginLeft={1}>
          <Typography variant="body1" fontWeight={600}>
            {' '}
            Auto Renew{' '}
          </Typography>
          <Typography variant="body1">
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
    id: 14,
    componentProps: {
      name: 'notifyExpiry',
      label: (
        <Box marginLeft={1}>
          <Typography variant="body1" fontWeight={600}>
            {' '}
            Notify Expiry
          </Typography>
          <Typography variant="body1">
            {' '}
            Notify people upon expiry of contract
          </Typography>
        </Box>
      ),
    },
    component: RHFSwitch,
    md: 12,
  },
  ...(watchForNotifyExpiry
    ? [
        {
          id: 15,
          component: RHFTextField,
          md: 6,
          componentProps: {
            fullWidth: true,
            name: 'notifyBefore',
            label: 'Notify Before',
            placeholder: 'Notify Before',
            required: true,
          },
        },
        {
          id: 16,
          component: RHFAutocompleteAsync,
          md: 6,
          componentProps: {
            fullWidth: true,
            name: 'notifyTo',
            label: 'Notify To',
            placeholder: 'Select User',
            required: true,
            apiQuery: apiQueryApprover,
            getOptionLabel: (option: any) =>
              `${option?.firstName} ${option?.lastName}`,
          },
        },
      ]
    : []),

  {
    id: 17,
    componentProps: {
      color: 'slateBlue.main',
      variant: 'h4',
    },
    heading: 'Item & Cost Details',
    md: 12,
    component: Typography,
  },
  {
    id: 18,
    component: RHFAutocompleteAsync,
    md: 6,
    componentProps: {
      fullWidth: true,
      name: 'software',
      label: 'Software',
      required: true,
      disabled: true,
      apiQuery: apiQuerySoftware,
      externalParams: { limit: 50 },
      getOptionLabel: (option: any) => option?.name,
    },
  },
  {
    id: 19,
    componentProps: {
      name: 'itemDetail',
    },
    component: ItemDetail,
    md: 12,
  },

  {
    id: 20,
    component: RHFAutocomplete,
    md: 12,
    componentProps: {
      fullWidth: true,
      name: 'billingCycle',
      label: 'Billing Cycle',
      placeholder: 'Select Billing Cycle',
      options: billingCycleOptions,
      required: true,
      getOptionLabel: (option: any) => option?.label,
    },
  },
  {
    id: 21,
    componentProps: {
      color: 'slateBlue.main',
      variant: 'h4',
    },
    heading: 'Software License Properties',
    md: 12,
    component: Typography,
  },
  {
    id: 22,
    component: RHFAutocomplete,
    md: 6,
    componentProps: {
      fullWidth: true,
      name: 'licenseType',
      label: 'License Type',
      required: true,
      placeholder: 'Select License Type',
      options: licenseTypeOptions,
      getOptionLabel: (option: any) => option?.label,
    },
  },
  {
    id: 23,
    component: RHFTextField,
    md: 6,
    componentProps: {
      fullWidth: true,
      required: true,
      name: 'licenseKey',
      label: 'License Key',
      placeholder: 'Enter License Key',
    },
  },
];
