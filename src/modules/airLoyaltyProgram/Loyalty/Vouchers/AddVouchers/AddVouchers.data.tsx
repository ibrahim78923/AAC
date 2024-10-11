import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDesktopDateTimePicker,
  RHFDropzonePreview,
  RHFRadioButtonTwoLabel,
  RHFTextField,
} from '@/components/ReactHookForm';
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
export const addVouchersFormFieldsDefaultValues = (data?: any) => {
  return {
    name: data?.name ?? '',
    description: data?.description ?? '',
    image: data?.image ?? '',
    appliedTo: data?.assignTo ?? null,
    addAmountOperator: data?.addAmountOperator ?? '',
    addAmount: data?.addAmount ?? '',
    percentageOff: data?.percentageOff ?? '',
    activeFrom: data?.activeFrom ?? null,
    activeTo: data?.activeTo ?? null,
    voucherCode: data?.voucherCode ?? '',
    redeemType: data?.redeemType ?? '',
    limitRedemptions: data?.limitRedemptions ?? '',
    voucherType: data?.voucherType ?? '',
    limitVouchers: data?.limitVouchers ?? '',
  };
};
export const addVouchersFormFieldsDataFunction = (
  apiQueryTiers: any,
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
      name: 'image',
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
      placeholder: 'Enter 8 digit code OR Click Button',
      required: true,
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
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
      apiQuery: apiQueryTiers,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 84,
    gridLength: 6,
    componentProps: {
      name: 'addAmountOperator',
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
      name: 'add Amount',
      label: '\u00a0\u00a0',
      placeholder: '00',
      type: 'number',
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
      name: 'redeemType',
      label: 'Redeem Limit',
      options: redemptionsRadioGroupOptions,
      required: true,
    },
    component: RHFRadioButtonTwoLabel,
    conditionalComponentOne: (
      <RHFTextField
        name="limitRedemptions"
        label="Limit"
        size="small"
        type="number"
      />
    ),
  },
  {
    id: 342,
    componentProps: {
      name: 'voucherType',
      label: 'Voucher Limit',
      options: vouchersRadioGroupOptions,
      required: true,
    },
    component: RHFRadioButtonTwoLabel,
    conditionalComponentOne: (
      <RHFTextField
        name="limitVouchers"
        label="Limit"
        size="small"
        type="number"
      />
    ),
  },
];
