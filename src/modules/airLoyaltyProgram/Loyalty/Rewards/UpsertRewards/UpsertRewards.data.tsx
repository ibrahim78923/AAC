import {
  RHFDatePicker,
  RHFDropZone,
  RHFRadioButtonTwoLabel,
  RHFTextField,
} from '@/components/ReactHookForm';
import { CHARACTERS_LIMIT, REGEX } from '@/constants/validation';
import * as Yup from 'yup';
import AppliedToDropdown from '../RewardsDropdowns/AppliedToDropdown';

const rewardsRadioGroupOptions = [
  {
    value: 'unlimited',
    labelOne: 'Unlimited redeemable',
    labelTwo: 'per consumer',
  },
  {
    value: 'limited',
    labelOne: 'Limited redeemable',
    labelTwo: 'per consumer',
  },
];

export const rewardsValidationSchema: any = Yup?.object()?.shape({
  title: Yup?.string()
    ?.required('Title is required')
    ?.matches(REGEX?.ALPHABETS_AND_SPACE, 'must be a string')
    ?.max(
      CHARACTERS_LIMIT?.LOYALTY_REWARDS_TITLE_MAX_CHARACTERS,
      `maximum ${CHARACTERS_LIMIT?.LOYALTY_REWARDS_TITLE_MAX_CHARACTERS} characters`,
    ),
  requiredPoints: Yup?.number()
    ?.positive('Greater than zero')
    ?.typeError('Not a number')
    ?.required('Required points are required'),
  fileUrl: Yup?.mixed()?.nullable(),
  appliedTo: Yup?.mixed()?.nullable()?.required('Visible To is required'),
  costPrice: Yup?.number()
    ?.positive('Greater than zero')
    ?.typeError('Not a number')
    ?.required('Cost Price is required'),
  activeFrom: Yup?.date()?.nullable()?.required('Active from is required'),
  activeTo: Yup?.date()
    ?.nullable()
    .min(
      Yup?.ref('activeFrom'),
      'The active to date must be grater than or equal to the active from date.',
    )
    ?.required('Active to is required'),
  limitRewards: Yup?.string()?.nullable(),
  limit: Yup?.string()?.when('limitRewards', {
    is: (value: any) => value === 'limited',
    then: (schema: any) => schema?.required('Limit is Required'),
    otherwise: (schema: any) => schema?.notRequired(),
  }),
});

export const addRewardsDefaultValues = (data: any) => {
  return {
    title: data?.data?.title ?? '',
    requiredPoints: data?.data?.requiredPoints ?? 0,
    fileUrl: null,
    appliedTo: data?.data?.tierDetails ?? null,
    costPrice: data?.data?.costPrice ?? 0,
    quantity: data?.data?.quantity ?? 0,
    activeFrom: !!data?.data?.activeFrom
      ? new Date(data?.data?.activeFrom)
      : null,
    activeTo: !!data?.data?.activeTo ? new Date(data?.data?.activeTo) : null,
    limitRewards: data?.data?.redeemedLimitType ?? 'unlimited',
    limit: data?.data?.redemptionLimitPerConsumer || '',
  };
};

export const upsertRewardsData = (watch: any) => [
  {
    id: 1,
    componentProps: {
      name: 'title',
      label: 'Title',
      placeholder: 'Enter title',
      required: true,
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'requiredPoints',
      label: 'Required Points',
      placeholder: 'Enter points',
      fullWidth: true,
      required: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'fileUrl',
      label: 'Add Image',
      fullWidth: true,
    },

    component: RHFDropZone,
    md: 12,
  },
  {
    id: 4,
    component: AppliedToDropdown,
  },
  {
    id: 5,
    componentProps: {
      name: 'costPrice',
      label: 'Cost Price',
      required: true,
      placeholder: 'Enter cost price',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 6,
    componentProps: {
      name: 'quantity',
      label: 'Quantity',
      placeholder: 'Enter Quantity',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'activeFrom',
      label: 'Active from',
      fullWidth: true,
      disablePast: true,
      required: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    id: 8,
    componentProps: {
      name: 'activeTo',
      label: 'Active to',
      fullWidth: true,
      required: true,
      minDate: watch('activeFrom'),
      disabled: !!!watch('activeFrom'),
    },
    component: RHFDatePicker,
    md: 12,
  },
];

export const rewardsRadioButtonsFormFields = [
  {
    id: 30,
    componentProps: {
      fullWidth: true,
      name: 'limitRewards',
      options: rewardsRadioGroupOptions,
    },
    component: RHFRadioButtonTwoLabel,
    conditionalComponentOne: (
      <RHFTextField
        name="limit"
        label="Limit"
        size="small"
        type="number"
        placeholder="Enter limit"
        required
      />
    ),
  },
];
