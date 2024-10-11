import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFDropZone,
  RHFRadioButtonTwoLabel,
  RHFTextField,
} from '@/components/ReactHookForm';
import { CHARACTERS_LIMIT, REGEX } from '@/constants/validation';
import * as Yup from 'yup';

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

const appliedToOptions = [
  { label: 'Base', value: 'BASE' },
  { label: 'Bronze', value: 'BRONZE' },
  { label: 'Silver', value: 'SILVER' },
  { label: 'Gold', value: 'GOLD' },
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
    ?.typeError('Not a number'),
  quantity: Yup?.number()
    ?.positive('Greater than zero')
    ?.typeError('Not a number'),
  activeFrom: Yup?.date()?.nullable(),
  activeTo: Yup?.date()?.nullable(),
  limitRewards: Yup?.string()?.nullable(),
  limit: Yup?.mixed()
    ?.nullable()
    ?.when('limitRewards', {
      is: (value: any) => value === 'limited',
      then: (schema: any) => schema?.required('Limit is Required'),
      otherwise: (schema: any) => schema?.notRequired(),
    }),
});

export const addRewardsDefaultValues = {
  title: '',
  requiredPoints: 0,
  fileUrl: null,
  appliedTo: null,
  costPrice: 0,
  quantity: 0,
  activeFrom: new Date(),
  activeTo: new Date(),
  limitRewards: '',
  limit: null,
};

export const upsertRewardsData = () => [
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
    componentProps: {
      name: 'appliedTo',
      label: 'Applied To',
      placeholder: 'Select Applied To',
      fullWidth: true,
      required: true,
      options: appliedToOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: 'costPrice',
      label: 'Cost Price',
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
      disablePast: true,
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
