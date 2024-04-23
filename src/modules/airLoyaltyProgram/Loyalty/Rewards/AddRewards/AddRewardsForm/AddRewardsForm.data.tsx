import {
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFDatePicker,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';
import { LOYALTY_REWARDS_TYPE } from '@/constants/strings';

import * as Yup from 'yup';

export const addPhyicalRewardsValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Title is required'),
  requiredPoints: Yup?.string()?.required('Required points are required'),
  addImage: Yup?.mixed()?.nullable(),
  visibleTo: Yup?.mixed()?.nullable()?.required('Visible To is required'),
  costPrice: Yup?.string()?.required('Cost price is required'),
  activeFrom: Yup?.date(),
  activeTo: Yup?.date(),
  untilDeactivateIt: Yup?.boolean(),
});

export const addDigitalRewardsValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Title is required'),
  requiredPoints: Yup?.string()?.required('Required points are required'),
  chooseCategory: Yup?.mixed()?.nullable()?.required('Category is required'),
  chooseVoucher: Yup?.mixed()?.nullable()?.required('Voucher is required'),
  activeFrom: Yup?.date(),
  activeTo: Yup?.date(),
  untilDeactivateIt: Yup?.boolean(),
});

export const REWARD_VALIDATION_SCHEMA: any = {
  [LOYALTY_REWARDS_TYPE?.PHYSICAL_REWARD]: addPhyicalRewardsValidationSchema,
  [LOYALTY_REWARDS_TYPE?.DIGITAL_REWARD]: addDigitalRewardsValidationSchema,
};

export const addRewardsDefaultValues = {
  title: '',
  requiredPoints: '',
  chooseCategory: null,
  chooseVoucher: null,
  visibleTo: null,
  addImage: null,
  costPrice: '',
  activeFrom: new Date(),
  activeTo: new Date(),
  untilDeactivateIt: false,
};

export const addRewardsFormFieldsDynamic = (
  customersApiQuery: any,
  vouchersApiQuery: any,
  tiersApiQuery: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'title',
      label: 'Title',
      required: true,
      fullWidth: true,
    },

    component: RHFTextField,
    type: [
      LOYALTY_REWARDS_TYPE?.PHYSICAL_REWARD,
      LOYALTY_REWARDS_TYPE?.DIGITAL_REWARD,
    ],
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
    type: [
      LOYALTY_REWARDS_TYPE?.PHYSICAL_REWARD,
      LOYALTY_REWARDS_TYPE?.DIGITAL_REWARD,
    ],
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
    type: [LOYALTY_REWARDS_TYPE?.PHYSICAL_REWARD],
    md: 12,
  },
  {
    id: 25,
    componentProps: {
      name: 'chooseVoucher',
      label: 'Choose Voucher',
      fullWidth: true,
      required: true,
      apiQuery: vouchersApiQuery,
      getOptionLabel: (option: any) => option?.name,
    },
    component: RHFAutocompleteAsync,
    type: [LOYALTY_REWARDS_TYPE?.DIGITAL_REWARD],
    md: 12,
  },

  {
    id: 5,
    componentProps: {
      name: 'chooseCategory',
      label: 'Choose Category',
      fullWidth: true,
      required: true,
      apiQuery: tiersApiQuery,
      getOptionLabel: (option: any) => option?.name,
    },
    component: RHFAutocompleteAsync,
    type: [LOYALTY_REWARDS_TYPE?.DIGITAL_REWARD],
    md: 12,
  },
  {
    id: 6,
    componentProps: {
      name: 'visibleTo',
      label: 'Visible to',
      fullWidth: true,
      required: true,
      apiQuery: customersApiQuery,
      getOptionLabel: (option: any) => option?.name,
    },
    component: RHFAutocompleteAsync,
    type: [LOYALTY_REWARDS_TYPE?.PHYSICAL_REWARD],
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
    type: [LOYALTY_REWARDS_TYPE?.PHYSICAL_REWARD],
    component: RHFTextField,
    md: 12,
  },
  {
    id: 8,
    componentProps: {
      name: 'activeFrom',
      label: 'Active from',
      fullWidth: true,
    },
    type: [
      LOYALTY_REWARDS_TYPE?.PHYSICAL_REWARD,
      LOYALTY_REWARDS_TYPE?.DIGITAL_REWARD,
    ],
    component: RHFDatePicker,
    md: 12,
  },
  {
    id: 9,
    componentProps: {
      name: 'activeTo',
      label: 'Active to',
      fullWidth: true,
    },
    type: [
      LOYALTY_REWARDS_TYPE?.PHYSICAL_REWARD,
      LOYALTY_REWARDS_TYPE?.DIGITAL_REWARD,
    ],
    component: RHFDatePicker,
    md: 12,
  },
  {
    id: 10,
    componentProps: {
      name: 'untilDeactivateIt',
      label: 'Until Deactivate it',
    },
    type: [
      LOYALTY_REWARDS_TYPE?.PHYSICAL_REWARD,
      LOYALTY_REWARDS_TYPE?.DIGITAL_REWARD,
    ],
    component: RHFCheckbox,
    md: 12,
  },
];
