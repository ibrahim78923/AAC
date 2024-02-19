import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFDatePicker,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';
const optionsVisibleTo = [' All', 'lists', 'tires'];

export const validationSchema = Yup?.object()?.shape({
  title: Yup?.string(),

  description: Yup?.string(),
  requiredPoints: Yup?.string(),
  chooseRewards: Yup?.string(),
  addImage: Yup?.string(),
  visibleto: Yup?.string(),
  costPrice: Yup?.string(),
  activefrom: Yup?.date(),
  activeto: Yup?.date(),
  untilDeacticateIt: Yup?.string(),
});
export const defaultValues = {
  title: '',
  description: '',
  requiredPoints: '',
  chooseRewards: '',
  visibleto: '',
  addImage: '',
  costPrice: '',
  activefrom: new Date(),
  activeto: new Date(),
  untilDeacticateIt: true,
};

export const addRewardsDrawerData = [
  {
    id: 1,
    componentProps: {
      name: 'title',
      label: 'Title',
      fullWidth: true,
    },

    component: RHFTextField,
    type: ['physicalReward', 'digitalReward'],
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },

    component: RHFTextField,
    type: ['digitalReward'],
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
    id: 4,
    componentProps: {
      name: 'requiredPoints',
      label: 'RequiredPoints',
      fullWidth: true,
    },

    component: RHFTextField,
    type: ['physicalReward', 'digitalReward'],
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: 'chooseRewards',
      label: 'Choose Rewards',
      fullWidth: true,
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
      options: optionsVisibleTo,
    },

    component: RHFAutocomplete,
    type: ['physicalReward', 'digitalReward'],
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'costPrice',
      label: 'CostPrice',
      fullWidth: true,
    },
    type: ['physicalReward', 'digitalReward'],
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
