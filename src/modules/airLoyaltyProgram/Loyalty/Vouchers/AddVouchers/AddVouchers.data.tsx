import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDesktopDateTimePicker,
  RHFDropzonePreview,
  RHFRadioButtonTwoLabel,
  RHFTextField,
} from '@/components/ReactHookForm';
import { VOUCHERS_CONSTANTS } from '@/constants/loyalty-program';
import { REGEX } from '@/constants/validation';
import * as Yup from 'yup';

const vouchersRadioGroupOptions = [
  {
    value: 'unlimited',
    labelOne: 'Unlimited vouchers',
    labelTwo: 'for this promotion',
  },
  {
    value: 'limited',
    labelOne: 'Limited number of vouchers',
    labelTwo: 'for this promotion',
  },
];
const redemptionsRadioGroupOptions = [
  {
    value: 'unlimited',
    labelOne: 'Unlimited redemptions',
    labelTwo: 'per consumer',
  },
  {
    value: 'limited',
    labelOne: 'Limited redemptions',
    labelTwo: 'per consumer',
  },
];
const addAmountOperatorOptions = [
  'Less than',
  'Greater than',
  'Equal to',
  'Less than or equal to',
  'Greater than or equal to',
];
export const vouchersValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Required'),
  description: Yup?.string(),
  fileUrl: Yup?.mixed()?.nullable()?.required('Required'),
  appliedTo: Yup?.object()?.required('Required'),
  operator: Yup?.string()?.required('Required'),
  addAmount: Yup?.number()
    ?.typeError('Required')
    ?.min(1, 'Minimum 1')
    ?.required('Required'),
  percentageOff: Yup?.number()
    ?.typeError('Percentage off must be a number')
    ?.min(1, 'Minimum 1')
    ?.max(100, 'Maximum 100')
    ?.required('Required'),
  activeFrom: Yup?.date()?.required('Required'),
  activeTo: Yup?.date()?.required('Required'),
  voucherCode: Yup?.string()
    ?.length(8, 'Voucher code must be 8 letters')
    ?.required('Required'),
  redemptionLimitType: Yup?.string()?.required('Required'),
  redemptionLimitPerConsumer: Yup?.string()?.when('redemptionLimitType', {
    is: (type: any) => type === VOUCHERS_CONSTANTS?.LIMITED,
    then: (schema: Yup.StringSchema) => schema?.required('Required'),
    otherwise: (schema: Yup.StringSchema) => schema?.notRequired(),
  }),
  voucherLimitType: Yup?.string()?.required('Required'),
  voucherLimitValue: Yup?.string()?.when('voucherLimitType', {
    is: (type: any) => type === VOUCHERS_CONSTANTS?.LIMITED,
    then: (schema: Yup.StringSchema) => schema?.required('Required'),
    otherwise: (schema: Yup.StringSchema) => schema?.notRequired(),
  }),
});
export const addVouchersFormFieldsDefaultValues = (data?: any) => {
  return {
    name: data?.name ?? '',
    description: data?.description ?? '',
    fileUrl: !!data?.voucherAttachment
      ? { url: data?.voucherAttachment }
      : null,
    appliedTo: data?.tierDetails ?? null,
    operator: data?.operator ?? '',
    addAmount: data?.addAmount ?? '',
    percentageOff: data?.percentageOff ?? '',
    activeFrom: !!data?.activeFrom ? new Date(data?.activeFrom) : null,
    activeTo: !!data?.activeTo ? new Date(data?.activeTo) : null,
    voucherCode: data?.voucherCode ?? '',
    redemptionLimitType: data?.redemptionLimitType ?? '',
    redemptionLimitPerConsumer: data?.redemptionLimitPerConsumer ?? '',
    voucherLimitType: data?.voucherLimitType ?? '',
    voucherLimitValue: data?.voucherLimitValue ?? '',
  };
};
export const addVouchersFormFieldsDataFunction = (
  apiQueryVoucherTiers: any,
  activeFromValue: any,
) => [
  {
    id: 223,
    componentProps: {
      name: 'name',
      label: 'Voucher Name',
      placeholder: 'Enter voucher name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 920,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Description',
    },
    component: RHFTextField,
  },
  {
    id: 165,
    componentProps: {
      name: 'fileUrl',
      label: 'Add Image',
      required: true,
      fileName: 'Image',
      fileType: 'SVG, PNG, JPG, PDF (max 2.44 MB)',
      accept: {
        'image/png': ['.png', '.PNG'],
        'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG'],
        'image/svg': ['.svg', '.SVG'],
      },
    },
    component: RHFDropzonePreview,
  },
  {
    id: 82,
    componentProps: {
      name: 'voucherCode',
      label: 'Voucher code',
      placeholder: 'Enter 8 digit code OR click Generate button',
      required: true,
      inputProps: { style: { textTransform: 'uppercase' } },
    },
    component: RHFTextField,
  },
  {
    id: 150,
    componentProps: {
      name: 'appliedTo',
      label: 'Applied to',
      placeholder: 'Select Tier',
      required: true,
      apiQuery: apiQueryVoucherTiers,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 84,
    gridLength: 6,
    componentProps: {
      name: 'operator',
      label: 'Add amount',
      placeholder: 'operator',
      required: true,
      options: addAmountOperatorOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 86,
    gridLength: 6,
    componentProps: {
      name: 'addAmount',
      label: REGEX?.NON_BREAKING_SPACE,
      placeholder: '00',
      type: 'number',
      sx: { mt: '2px' },
    },
    component: RHFTextField,
  },
  {
    id: 96,
    componentProps: {
      name: 'percentageOff',
      label: 'Percentage off',
      placeholder: 'Enter discount percentage (e.g., 20)',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 37,
    componentProps: {
      name: 'activeFrom',
      label: 'Active From',
      disablePast: true,
      required: true,
      fullWidth: true,
    },
    component: RHFDesktopDateTimePicker,
  },
  {
    id: 39,
    componentProps: {
      name: 'activeTo',
      label: 'Active To',
      minDate: activeFromValue,
      required: true,
      fullWidth: true,
    },
    component: RHFDesktopDateTimePicker,
  },
];

export const addVouchersRadioButtonsFormFields = [
  {
    id: 2,
    componentProps: {
      name: 'redemptionLimitType',
      label: 'Redeem Limit',
      options: redemptionsRadioGroupOptions,
      required: true,
    },
    component: RHFRadioButtonTwoLabel,
    conditionalComponentOne: (
      <RHFTextField
        name="redemptionLimitPerConsumer"
        label="Limit"
        size="small"
        type="number"
        required
      />
    ),
  },
  {
    id: 342,
    componentProps: {
      name: 'voucherLimitType',
      label: 'Voucher Limit',
      options: vouchersRadioGroupOptions,
      required: true,
    },
    component: RHFRadioButtonTwoLabel,
    conditionalComponentOne: (
      <RHFTextField
        name="voucherLimitValue"
        label="Limit"
        size="small"
        type="number"
        required
      />
    ),
  },
];
