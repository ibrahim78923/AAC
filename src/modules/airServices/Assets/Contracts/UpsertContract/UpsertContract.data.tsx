import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { Box, Typography } from '@mui/material';
import {
  BILLING_CYCLE,
  CONTRACT_STATUS,
  CONTRACT_TYPES,
  LICENSE_TYPE,
} from '@/constants/strings';
//TODO: will be cater in integration
// import { ItemDetail } from './ItemDetail';

const todayDate = dayjs()?.format('MM/DD/YYYY');

const dropdownDummy = [
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
    label: CONTRACT_TYPES?.SOFTWARE_LICENSE,
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
    type: data?.type ?? null,
    associateAssets: data?.associateAssets ?? null,
    cost: data?.cost ?? '',
    status: data?.status ?? null,
    vendor: data?.vendor ?? null,
    approver: data?.approver ?? null,
    startDate: new Date(data?.startDate ?? todayDate),
    endDate: new Date(data?.endDate ?? todayDate),
    autoRenew: data?.autoRenew ?? false,
    notifyExpiry: data?.notifyExpiry ?? false,
    notifyBefore: data?.notifyBefore ?? '',
    notifyTo: data?.notifyTo ?? '',
    //TODO: will be cater in integration
    //   itemDetail: !!data?.itemDetail?.length
    //   ? data?.itemDetail
    //   : softwareLicense?.itemDetail,
    // billingCycle: data?.billingCycle ?? softwareLicense?.billingCycle,
    // licenseType: data?.licenseType ?? softwareLicense?.licenseType,
    // licenseKey: data?.licenseKey ?? softwareLicense?.licenseKey,
    // software: data?.software ?? softwareLicense?.software,
  };
};

export const upsertContractFormSchemaFunction: any = Yup?.object()?.shape({
  contractName: Yup?.string()?.required('Required'),
  contractNumber: Yup?.string(),
  type: Yup?.mixed()?.nullable()?.required('Required'),
  associateAssets: Yup?.mixed()
    ?.nullable()
    ?.when('type', {
      is: (y: any) => y?.label !== CONTRACT_TYPES?.SOFTWARE_LICENSE,
      then: (schema: any) => schema?.required('Required'),
      otherwise: (schema: any) => schema?.notRequired(),
    }),
  cost: Yup?.string(),
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
      then: (schema: any) => schema?.required(),
      otherwise: (schema) => schema,
    }),
  notifyTo: Yup?.string()
    ?.trim()
    ?.ensure()
    ?.when('notifyExpiry', {
      is: (value: any) => value,
      then: (schema: any) => schema?.required(),
      otherwise: (schema) => schema,
    }),
  //TODO: will be cater in integration
  // software: Yup?.string()
  // ?.ensure()
  // ?.when('type', {
  //   is: (value: any) => value?.label === CONTRACT_TYPES?.SOFTWARE_LICENSE,
  //   then: (schema: any) => schema?.required('Required'),
  //   otherwise: (schema) => schema?.notRequired(),
  // }),

  // billingCycle: Yup?.string()
  //   ?.ensure()
  //   ?.when('type', {
  //     is: (value: any) => value?.label === CONTRACT_TYPES?.SOFTWARE_LICENSE,
  //     then: (schema: any) => schema?.required(),
  //     otherwise: (schema) => schema?.notRequired(),
  //   }),
  // licenseType: Yup?.string()
  //   ?.ensure()
  //   ?.when('type', {
  //     is: (value: any) => value?.label === CONTRACT_TYPES?.SOFTWARE_LICENSE,
  //     then: (schema: any) => schema?.required(),
  //     otherwise: (schema) => schema?.notRequired(),
  //   }),
  // licenseKey: Yup?.string()
  //   ?.ensure()
  //   ?.when('type', {
  //     is: (value: any) => value?.label === CONTRACT_TYPES?.SOFTWARE_LICENSE,
  //     then: (schema: any) => schema?.required(),
  //     otherwise: (schema) => schema?.notRequired(),
  //   }),
  // itemDetail: Yup?.array()
  //   ?.of(
  //     Yup?.object()?.shape({
  //       serviceName: Yup?.string(),
  //       priceModel: Yup?.string(),
  //       cost: Yup?.number(),
  //       count: Yup?.number(),
  //       comments: Yup?.string(),
  //     }),
  //   )
  //   ?.when('type', {
  //     is: (value: any) => value?.label === CONTRACT_TYPES?.SOFTWARE_LICENSE,
  //     then: () => {
  //       return Yup?.array()
  //         ?.of(
  //           Yup?.object()?.shape({
  //             serviceName: Yup?.string()?.required('Required'),
  //             priceModel: Yup?.string()?.required('Required'),
  //             cost: Yup?.number()
  //               ?.positive('Greater than zero')
  //               ?.typeError('Not a number'),
  //             count: Yup?.number()
  //               ?.positive('Greater than zero')
  //               ?.typeError('Not a number'),
  //             comments: Yup?.string(),
  //           }),
  //         )
  //         ?.min(1, 'At least one item is required');
  //     },
  //     otherwise: (schema: any) => schema?.notRequired(),
  //   }),
});

export const upsertContractFormFieldsDataFunction = (
  watchForNotifyExpiry = false,
  watchForContractType: any,
  apiQueryVendor: any,
  apiQueryAsset: any,
  isFieldDisable = false,
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
      disabled: isFieldDisable,
      required: true,
    },
  },
  {
    id: 3,
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
    id: 4,
    componentProps: {
      fullWidth: true,
      name: 'type',
      label: 'Type',
      options: contractTypeOptions,
      disabled: isFieldDisable,
      getOptionLabel: (option: any) => option?.label,
      required: true,
      //TODO: will be cater in integration
      // onChange: (e: any) => {
      //   console.log(e);
      //   console.log((option: any) => option?.label);
      //   setValue?.('type', watchForContractType?.label);
      //   console.log(getValues?.('type'));
      //   // setContractType?.(getValues?.('type'));
      //   if (getValues?.('type') !== ' ') {
      //     clearError?.('type');
      //   }
      //   if (getValues?.('type') === CONTRACT_TYPES?.SOFTWARE_LICENSE) {
      //     setValue?.('associateAssets', '');
      //     clearError?.('associateAssets');
      //     return;
      //   }
      //   setValue?.('associateAssets', getValues?.('associateAssets'));
      //   getValues?.('associateAssets') !== ''
      //     ? clearError?.('associateAssets')
      //     : setError?.('associateAssets', {
      //         message: 'Required',
      //       });
      // },
    },
    md: 6,
    component: RHFAutocomplete,
  },
  {
    id: 5,
    componentProps: {
      fullWidth: true,
      name: 'associateAssets',
      label: 'Associate Assets',
      required:
        watchForContractType?.label !== CONTRACT_TYPES?.SOFTWARE_LICENSE,
      disabled:
        watchForContractType?.label === CONTRACT_TYPES?.SOFTWARE_LICENSE,
      apiQuery: apiQueryAsset,
      externalParams: { limit: 50 },
      getOptionLabel: (option: any) => option?.displayName,
    },
    md: 6,
    component: RHFAutocompleteAsync,
  },
  {
    id: 6,
    componentProps: {
      fullWidth: true,
      name: 'status',
      label: 'Status',
      options: contractStatusOptions,
      disabled: isFieldDisable,
      required: true,
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
      disabled: isFieldDisable,
    },
  },
  {
    id: 8,
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
    id: 9,
    componentProps: {
      fullWidth: true,
      name: 'vendor',
      label: 'Vendor',
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
            disabled: isFieldDisable,
            required: true,
          },
        },
        {
          id: 16,
          component: RHFTextField,
          md: 6,
          componentProps: {
            fullWidth: true,
            name: 'notifyTo',
            label: 'Notify To',
            disabled: isFieldDisable,
            required: true,
          },
        },
      ]
    : []),
  //TODO: will be cater in integration
  // ...(watchForContractType?.label === CONTRACT_TYPES?.SOFTWARE_LICENSE
  //   ? [
  //       {
  //         id: 17,
  //         componentProps: {
  //           color: 'slateBlue.main',
  //           variant: 'h4',
  //         },
  //         heading: 'Item & Cost Details',
  //         md: 12,
  //         component: Typography,
  //       },
  //       {
  //         id: 18,
  //         component: RHFSelect,
  //         md: 6,
  //         componentProps: {
  //           fullWidth: true,
  //           name: 'software',
  //           label: 'Software',
  //           select: true,
  //           options: dropdownDummy,
  //           disabled: isFieldDisable,
  //           required: true,
  //         },
  //       },
  //       {
  //         id: 19,
  //         componentProps: {
  //           name: 'itemDetail',
  //         },
  //         component: ItemDetail,
  //         md: 12,
  //       },

  //       {
  //         id: 20,
  //         component: RHFSelect,
  //         md: 12,
  //         componentProps: {
  //           fullWidth: true,
  //           name: 'billingCycle',
  //           label: 'Billing Cycle',
  //           select: true,
  //           options: billingCycleOptions,
  //           disabled: isFieldDisable,
  //         },
  //       },
  //       {
  //         id: 21,
  //         componentProps: {
  //           color: 'slateBlue.main',
  //           variant: 'h4',
  //         },
  //         heading: 'Software License Properties',
  //         md: 12,
  //         component: Typography,
  //       },
  //       {
  //         id: 22,
  //         component: RHFSelect,
  //         md: 6,
  //         componentProps: {
  //           fullWidth: true,
  //           name: 'licenseType',
  //           label: 'License Type',
  //           select: true,
  //           options: licenseTypeOptions,
  //           disabled: isFieldDisable,
  //         },
  //       },
  //       {
  //         id: 23,
  //         component: RHFTextField,
  //         md: 6,
  //         componentProps: {
  //           fullWidth: true,
  //           name: 'licenseKey',
  //           label: 'License Key',
  //           disabled: isFieldDisable,
  //         },
  //       },
  //     ]
  //   : []),
];
