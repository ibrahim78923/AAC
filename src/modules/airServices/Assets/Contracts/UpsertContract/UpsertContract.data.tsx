import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { Box, Typography } from '@mui/material';
import { ItemDetail } from './ItemDetail';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import { CHARACTERS_LIMIT, REGEX } from '@/constants/validation';
import GetContractSoftwareDropdown from '../ContractFormFieldsDropdowns/GetContractSoftwareDropdown';
import GetContractApproverDropdown from '../ContractFormFieldsDropdowns/GetContractApproverDropdown';
import GetContractVendorDropdown from '../ContractFormFieldsDropdowns/GetContractVendorDropdown';
import GetContractAdminAgentDropdown from '../ContractFormFieldsDropdowns/GetContractAdminAgentDropdown';
import GetContractAssetsDropdown from '../ContractFormFieldsDropdowns/GetContractAssetsDropdown';
import GetContractContractTypeDropdown from '../ContractFormFieldsDropdowns/GetContractContractTypeDropdown';
import { localeDateTime } from '@/lib/date-time';
import {
  BILLING_CYCLE,
  CONTRACT_STATUS,
  LICENSE_TYPE,
} from '@/constants/services';

export const CONTRACT_TYPES_CHECK = {
  LEASE: 'lease',
  MAINTENANCE: 'maintenance',
  SOFTWARE_LICENSE: 'software_licence',
  WARRANTY: 'warranty',
};

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
export const upsertContractFormDefaultValuesFunction = (
  data?: any,
  form?: any,
) => {
  const initialValues: any = dynamicFormInitialValue(data, form);

  return {
    contractName: data?.name ?? '',
    contractNumber: data?.contractNumber ?? '',
    type: data?.contractTypeData ?? null,
    associateAssets: data?.associatedAsset ?? null,
    cost: data?.cost ?? 0,
    status: data?.status
      ? {
          _id: data?.status,
          label: data?.status,
        }
      : {
          _id: CONTRACT_STATUS?.DRAFT,
          label: 'Draft',
        },
    vendor: data?.vendor ?? null,
    approver: data?.approver ?? null,
    startDate: data?.startDate ? localeDateTime(data?.startDate) : new Date(),
    endDate: data?.startDate ? localeDateTime(data?.endDate) : new Date(),
    autoRenew: data?.autoRenew ?? false,
    notifyExpiry: data?.notifyRenewal ?? false,
    notifyBefore: data?.notifyBefore ?? '',
    notifyTo: data?.notifyTo ?? null,
    itemDetail: !!data?.itemsDetail?.length
      ? data?.itemsDetail
      : softwareLicense?.itemDetail,
    billingCycle: data?.billingCycle
      ? billingCycleOptions?.find(
          (billingCycleOption: any) =>
            billingCycleOption?._id === data?.billingCycle,
        )
      : null,
    licenseType: data?.licenseType
      ? licenseTypeOptions?.find(
          (licenseTypeOption: any) =>
            licenseTypeOption?._id === data?.licenseType,
        )
      : null,
    licenseKey: data?.licenseKey ?? softwareLicense?.licenseKey,
    software: data?.software ?? softwareLicense?.software,
    attachFile: null,
    ...initialValues,
  };
};

export const upsertContractFormSchemaFunction: any = (form?: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    contractName: Yup?.string()
      ?.required('Required')
      ?.matches(REGEX?.ALPHABETS, 'Must be a string')
      ?.max(
        CHARACTERS_LIMIT?.SERVER_ASSETS_CONTRACTS_NAME_MAX_CHARACTERS,
        `Max ${CHARACTERS_LIMIT?.SERVER_ASSETS_CONTRACTS_NAME_MAX_CHARACTERS} characters`,
      ),
    contractNumber: Yup?.string(),
    type: Yup?.mixed()?.nullable()?.required('Required'),
    associateAssets: Yup?.mixed()
      ?.nullable()
      ?.when('type', {
        is: (y: any) => y?.name !== CONTRACT_TYPES_CHECK?.SOFTWARE_LICENSE,
        then: (schema: any) => schema?.required('Required'),
        otherwise: (schema: any) => schema?.notRequired(),
      }),
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
        then: (schema: any) => schema?.required('Required'),
        otherwise: (schema) => schema?.notRequired(),
      }),
    notifyTo: Yup?.mixed()
      ?.nullable()
      ?.when('notifyExpiry', {
        is: (value: any) => value,
        then: (schema: any) => schema?.required('Required'),
        otherwise: (schema: any) => schema?.notRequired(),
      }),
    software: Yup?.mixed()
      ?.nullable()
      ?.when('type', {
        is: (value: any) =>
          value?.name === CONTRACT_TYPES_CHECK?.SOFTWARE_LICENSE,
        then: (schema: any) => schema?.required('Required'),
        otherwise: (schema) => schema?.notRequired(),
      }),

    billingCycle: Yup?.mixed()
      ?.nullable()
      ?.when('type', {
        is: (value: any) =>
          value?.name === CONTRACT_TYPES_CHECK?.SOFTWARE_LICENSE,
        then: (schema: any) => schema?.required('Required'),
        otherwise: (schema) => schema?.notRequired(),
      }),
    licenseType: Yup?.mixed()
      ?.nullable()
      ?.when('type', {
        is: (value: any) =>
          value?.name === CONTRACT_TYPES_CHECK?.SOFTWARE_LICENSE,
        then: (schema: any) => schema?.required('Required'),
        otherwise: (schema) => schema?.notRequired(),
      }),
    licenseKey: Yup?.string()
      ?.ensure()
      ?.when('type', {
        is: (value: any) =>
          value?.name === CONTRACT_TYPES_CHECK?.SOFTWARE_LICENSE,
        then: (schema: any) =>
          schema
            ?.matches(REGEX?.ALPHABETS, 'Must be a string')
            ?.required('Required'),
        otherwise: (schema: any) => schema?.notRequired(),
      }),
    itemDetail: Yup?.array()
      ?.of(
        Yup?.object()?.shape({
          serviceName: Yup?.string(),
          priceModel: Yup?.mixed()?.nullable(),
          cost: Yup?.number()
            ?.typeError('Not a number')
            ?.moreThan(-1, 'cost must be positive'),
          count: Yup?.number()
            ?.typeError('Not a number')
            ?.moreThan(-1, 'cost must be positive'),
          comments: Yup?.string()?.max(
            CHARACTERS_LIMIT?.SERVER_ASSETS_CONTRACTS_COMMENTS_MAX_CHARACTERS,
            `Max ${CHARACTERS_LIMIT?.SERVER_ASSETS_CONTRACTS_COMMENTS_MAX_CHARACTERS} characters`,
          ),
        }),
      )
      ?.when('type', {
        is: (value: any) =>
          value?.name === CONTRACT_TYPES_CHECK?.SOFTWARE_LICENSE,
        then: () => {
          return Yup?.array()
            ?.of(
              Yup?.object()?.shape({
                serviceName: Yup?.string()?.required('Required'),
                priceModel: Yup?.mixed()?.nullable()?.required('Required'),
                cost: Yup?.number()
                  ?.positive('Greater than zero')
                  ?.typeError('Not a number'),
                count: Yup?.number()
                  ?.positive('Greater than zero')
                  ?.typeError('Not a number'),
                comments: Yup?.string(),
              }),
            )
            ?.min(1, 'At least one item is required');
        },
        otherwise: (schema: any) => schema?.notRequired(),
      }),
    ...formSchema,
  });
};

export const upsertContractFormFieldsDataFunction = (
  watchForNotifyExpiry = false,
  watchForContractType: any,
  watchStartDate: any,
  contractId: any,
) => [
  {
    _id: 1,
    componentProps: {
      color: 'slateBlue.main',
      variant: 'h4',
    },
    heading: 'General Details',
    md: 12,
    component: Typography,
  },
  {
    _id: 2,
    component: RHFTextField,
    md: 6,
    componentProps: {
      name: 'contractName',
      label: 'Contract Name',
      placeholder: 'Enter Contract Name',
      required: true,
    },
  },
  {
    _id: 3,
    md: 6,
    component: GetContractContractTypeDropdown,
    componentProps: { name: 'type', contractId },
  },
  {
    _id: 4,
    md: 6,
    component: GetContractAssetsDropdown,
    componentProps: {
      watchForContractType,
    },
  },
  {
    _id: 5,
    componentProps: {
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
    _id: 6,
    component: RHFTextField,
    md: 6,
    componentProps: {
      name: 'cost',
      label: 'Cost (£)',
      placeholder: 'Enter Cost',
    },
  },
  {
    _id: 7,
    component: GetContractAdminAgentDropdown,
    md: 6,
  },
  {
    _id: 8,
    md: 6,
    component: GetContractVendorDropdown,
  },
  {
    _id: 9,
    componentProps: {
      color: 'slateBlue.main',
      variant: 'h4',
    },
    heading: 'Tenure of contract',
    md: 12,
    component: Typography,
  },
  {
    _id: 10,
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
      disablePast: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    _id: 11,
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
      disablePast: true,
      textFieldProps: { readOnly: true },
      minDate: watchStartDate,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    _id: 12,
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
    _id: 13,
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
          _id: 14,
          component: RHFTextField,
          md: 6,
          componentProps: {
            name: 'notifyBefore',
            label: 'Notify Before',
            placeholder: 'Notify Before',
            required: true,
          },
        },
        {
          _id: 15,
          component: GetContractApproverDropdown,
          md: 6,
        },
      ]
    : []),
  ...(watchForContractType?.name === CONTRACT_TYPES_CHECK?.SOFTWARE_LICENSE
    ? [
        {
          _id: 16,
          componentProps: {
            color: 'slateBlue.main',
            variant: 'h4',
          },
          heading: 'Item & Cost Details',
          md: 12,
          component: Typography,
        },
        {
          _id: 17,
          component: GetContractSoftwareDropdown,
          md: 6,
        },
        {
          _id: 18,
          componentProps: {
            name: 'itemDetail',
          },
          component: ItemDetail,
          md: 12,
        },

        {
          _id: 19,
          component: RHFAutocomplete,
          md: 6,
          componentProps: {
            name: 'billingCycle',
            label: 'Billing Cycle',
            placeholder: 'Select Billing Cycle',
            required: true,
            options: billingCycleOptions,
            getOptionLabel: (option: any) => option?.label,
          },
        },
        {
          _id: 20,
          componentProps: {
            color: 'slateBlue.main',
            variant: 'h4',
          },
          heading: 'Software License Properties',
          md: 12,
          component: Typography,
        },
        {
          _id: 21,
          component: RHFAutocomplete,
          md: 6,
          componentProps: {
            name: 'licenseType',
            label: 'License Type',
            placeholder: 'Select License Type',
            required: true,
            options: licenseTypeOptions,
            getOptionLabel: (option: any) => option?.label,
          },
        },
        {
          _id: 22,
          component: RHFTextField,
          md: 6,
          componentProps: {
            name: 'licenseKey',
            label: 'License Key',
            placeholder: 'Enter License Key',
            required: true,
          },
        },
      ]
    : []),
];
