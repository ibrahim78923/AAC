import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFDatePicker,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';
import { LOYALTY_REWARDS_TYPE } from '../AddRewards.data';
const optionsVisibleTo = [' All', 'lists', 'tires'];

export const addPhyicalRewardsValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required(),
  description: Yup?.string(),
  requiredPoints: Yup?.string()?.required(),
  chooseRewards: Yup?.string(),
  chooseVoucher: Yup?.string(),
  addImage: Yup?.string(),
  visibleto: Yup?.mixed()?.nullable().required(),
  costPrice: Yup?.string()?.required(),
  activefrom: Yup?.date(),
  activeto: Yup?.date(),
  untilDeacticateIt: Yup?.string(),
});
export const addDigitalRewardsValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required(),
  requiredPoints: Yup?.string()?.required(),
  chooseRewards: Yup?.mixed()?.nullable().required(),
  chooseVoucher: Yup?.mixed()?.nullable()?.required(),
  activefrom: Yup?.date(),
  activeto: Yup?.date(),
  untilDeacticateIt: Yup?.string(),
});
export const REWARD_VALIDATION_SCHEMA: any = {
  [LOYALTY_REWARDS_TYPE?.PHYSICAL_REWARD]: addPhyicalRewardsValidationSchema,
  [LOYALTY_REWARDS_TYPE?.DIGITAL_REWARD]: addDigitalRewardsValidationSchema,
};
export const addRewardsDefaultValues = {
  title: '',
  description: '',
  requiredPoints: '',
  chooseCategory: null,
  chooseVoucher: null,
  visibleto: null,
  addImage: '',
  costPrice: '',
  activefrom: new Date(),
  activeto: new Date(),
  untilDeacticateIt: false,
};

export const addRewardsFormFields = [
  {
    id: 1,
    componentProps: {
      name: 'title',
      label: 'Title',
      required: true,
      fullWidth: true,
    },

    component: RHFTextField,
    type: ['physicalReward', 'digitalReward'],
    md: 12,
  },

  {
    id: 4,
    componentProps: {
      name: 'requiredPoints',
      label: 'RequiredPoints',
      fullWidth: true,
      required: true,
    },

    component: RHFTextField,
    type: ['physicalReward', 'digitalReward'],
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'addImage',
      label: 'Add Image',
      fullWidth: true,
    },

    component: RHFDropZone,
    type: ['physicalReward'],
    md: 12,
  },
  {
    id: 25,
    componentProps: {
      name: 'chooseVoucher',
      label: 'Choose Voucher',
      fullWidth: true,
      required: true,
      options: optionsVisibleTo,
    },

    component: RHFAutocomplete,
    type: ['digitalReward'],
    md: 12,
  },

  {
    id: 5,
    componentProps: {
      name: 'chooseCategory',
      label: 'Choose Category',
      fullWidth: true,
      required: true,
      options: optionsVisibleTo,
    },

    component: RHFAutocomplete,
    type: ['digitalReward'],
    md: 12,
  },
  {
    id: 6,
    componentProps: {
      name: 'visibleto',
      label: 'Visible to',
      fullWidth: true,
      required: true,
      options: optionsVisibleTo,
    },

    component: RHFAutocomplete,
    type: ['physicalReward'],
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'costPrice',
      label: 'CostPrice',
      fullWidth: true,
      required: true,
    },
    type: ['physicalReward'],
    component: RHFTextField,
    md: 12,
  },
  {
    id: 8,
    componentProps: {
      name: 'activefrom',
      label: 'Active from',
      fullWidth: true,
    },
    type: ['physicalReward', 'digitalReward'],
    component: RHFDatePicker,
    md: 12,
  },
  {
    id: 9,
    componentProps: {
      name: 'activeto',
      label: 'Active to',
      fullWidth: true,
    },
    type: ['physicalReward', 'digitalReward'],
    component: RHFDatePicker,
    md: 12,
  },
  {
    id: 10,
    componentProps: {
      name: 'untilDeacticateIt',
      label: 'Until Deactivate it',
      fullWidth: true,
    },
    type: ['physicalReward', 'digitalReward'],
    component: RHFCheckbox,
    md: 12,
  },
];
