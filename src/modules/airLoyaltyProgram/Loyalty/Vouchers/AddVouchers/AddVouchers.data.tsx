import {
  RHFAutocompleteAsync,
  RHFDateTimePicker,
  RHFRadioButtonTwoLabel,
  RHFTextField,
} from '@/components/ReactHookForm';
const vouchersRadioGroupOptions = [
  {
    value: 'unlimitedVouchers',
    labelOne: 'Unlimited vouchers',
    labelTwo: 'for this promotion',
  },
  {
    value: 'limitedVouchers',
    labelOne: 'Limited number of vouchers',
    labelTwo: 'for this promotion',
  },
];
const redemptionsRadioGroupOptions = [
  {
    value: 'unlimitedRedemptions',
    labelOne: 'Unlimited redemptions',
    labelTwo: 'per contact',
  },
  {
    value: 'limitedRedemptions',
    labelOne: 'Limited redemptions',
    labelTwo: 'per contact',
  },
];
const timeRadioGroupOptions = [
  {
    value: 'unlimitedTime',
    labelOne: 'Unlimited time',
    labelTwo: 'to redeem',
  },
  {
    value: 'limitedTime',
    labelOne: 'Limited time',
    labelTwo: 'to redeem',
  },
];
const offRadioGroupOptions = [
  {
    value: 'flatOff',
    labelOne: 'Flat off',
    labelTwo: 'for this promotion',
  },
  {
    value: 'percentageOff',
    labelOne: 'Percentage off',
    labelTwo: 'for this promotion',
  },
];
export const addVouchersFormFieldsDefaultValues = (data?: any) => {
  return {
    name: data?.name ?? '',
    description: data?.description ?? '',
    assignTo: data?.assignTo ?? null,
    voucherCode: data?.voucherCode ?? '',
    vouchers: data?.vouchers ?? '',
    redemptions: data?.redemptions ?? '',
    time: data?.time ?? '',
    off: data?.off ?? '',
    limitPercentage: data?.limitPercentage ?? '',
    limitAmount: data?.limitAmount ?? '',
    limitVouchers: data?.limitVouchers ?? '',
    limitRedemptions: data?.limitRedemptions ?? '',
    limitTime: data?.limitTime ?? null,
  };
};
export const addVouchersFormFieldsDataFunction = (apiQueryAgent?: any) => [
  {
    id: 2,
    componentProps: {
      fullWidth: true,
      name: 'name',
      label: 'Name',
      placeholder: 'Name',
    },
    component: RHFTextField,
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'description',
      label: 'Description',
      placeholder: 'Description',
    },
    component: RHFTextField,
  },
  {
    id: 150,
    componentProps: {
      fullWidth: true,
      name: 'assignTo',
      label: 'Assign to',
      placeholder: 'Assign to',
      apiQuery: apiQueryAgent,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 82,
    componentProps: {
      fullWidth: true,
      name: 'voucherCode',
      label: 'Voucher code',
      placeholder: 'Voucher code',
    },
    component: RHFTextField,
  },
];

export const addVouchersRadioButtonsFormFields = [
  {
    id: 2,
    componentProps: {
      fullWidth: true,
      name: 'vouchers',
      options: vouchersRadioGroupOptions,
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
  {
    id: 3,
    componentProps: {
      fullWidth: true,
      name: 'redemptions',
      options: redemptionsRadioGroupOptions,
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
    id: 4,
    componentProps: {
      fullWidth: true,
      name: 'time',
      options: timeRadioGroupOptions,
    },
    component: RHFRadioButtonTwoLabel,
    conditionalComponentOne: (
      <RHFDateTimePicker
        name="limitTime"
        label="Expiration Duration"
        size="small"
        fullWidth
      />
    ),
  },
  {
    id: 5,
    componentProps: {
      fullWidth: true,
      name: 'off',
      options: offRadioGroupOptions,
    },
    component: RHFRadioButtonTwoLabel,
    conditionalComponentOne: (
      <RHFTextField
        name="limitAmount"
        label="Add amount"
        size="small"
        type="number"
      />
    ),
    conditionalComponentTwo: (
      <RHFTextField
        name="limitPercentage"
        label="Add percentage"
        size="small"
        type="number"
      />
    ),
  },
];
