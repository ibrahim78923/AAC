import {
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFDatePicker,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import {
  LOYALTY_REWARDS_CLASS,
  LOYALTY_REWARDS_TYPE,
} from '@/constants/strings';

import * as Yup from 'yup';

export const addPhysicalRewardsValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Title is required'),
  requiredPoints: Yup?.number()
    ?.positive('Greater than zero')
    ?.typeError('Not a number')
    ?.required('Required points are required'),
  addImage: Yup?.mixed()?.nullable(),
  visibleTo: Yup?.mixed()?.nullable()?.required('Visible To is required'),
  costPrice: Yup?.number()
    ?.positive('Greater than zero')
    ?.typeError('Not a number')
    ?.required('Cost price is required'),
  activeFrom: Yup?.date()?.nullable(),
  untilDeactivate: Yup?.boolean(),
  activeTo: Yup?.date()
    ?.nullable()
    ?.when('untilDeactivate', {
      is: (value: any) => !value,
      then: (schema: any) => schema?.required('Active to is required'),
      otherwise: (schema) => schema?.notRequired(),
    }),
});

export const addDigitalRewardsValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Title is required'),
  requiredPoints: Yup?.number()
    ?.positive('Greater than zero')
    ?.typeError('Not a number')
    ?.required('Required points are required'),
  chooseCategory: Yup?.mixed()?.nullable()?.required('Category is required'),
  chooseVoucher: Yup?.mixed()?.nullable()?.required('Voucher is required'),
  activeFrom: Yup?.date()?.nullable(),
  untilDeactivate: Yup?.boolean(),
  activeTo: Yup?.date()
    ?.nullable()
    ?.when('untilDeactivate', {
      is: (value: any) => !value,
      then: (schema: any) => schema?.required('Active to is required'),
      otherwise: (schema) => schema?.notRequired(),
    }),
});

export const REWARD_VALIDATION_SCHEMA: any = {
  [LOYALTY_REWARDS_TYPE?.PHYSICAL_REWARD]: addPhysicalRewardsValidationSchema,
  [LOYALTY_REWARDS_TYPE?.DIGITAL_REWARD]: addDigitalRewardsValidationSchema,
};

export const addRewardsDefaultValues = {
  title: '',
  requiredPoints: 0,
  chooseCategory: null,
  chooseVoucher: null,
  visibleTo: [],
  addImage: null,
  costPrice: 0,
  activeFrom: new Date(),
  activeTo: null,
  untilDeactivate: false,
};

export const addRewardsFormFieldsDynamic = (
  customersApiQuery: any,
  vouchersApiQuery: any,
  tiersApiQuery: any,
  watchForDeactivate: any,
) => [
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
      externalParams: {
        meta: false,
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
      },
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
      externalParams: {
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        type: LOYALTY_REWARDS_CLASS?.TIERS,
      },
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
      multiple: true,
      apiQuery: customersApiQuery,
      externalParams: {
        meta: false,
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
      },
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
      disablePast: true,
      disabled: watchForDeactivate,
      required: !watchForDeactivate,
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
      name: 'untilDeactivate',
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
