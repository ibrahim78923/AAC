import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const groupValidationSchema = Yup?.object()?.shape({
  groupName: Yup?.string(),
  shopsBranches: Yup?.mixed()?.nullable(),
});

export const groupDefaultValues = (data?: any) => {
  return {
    groupName: data ?? '',
    shopsBranches: data?.shopsBranches ?? [],
  };
};

const shopsBranchesOptions = [
  'Clock Log',
  'Share My Dine',
  'RLD',
  'Zero Code',
  'PPCN',
];

export const groupDataArray = [
  {
    id: 5654,
    componentProps: {
      name: 'groupName',
      label: 'Group Name',
      type: 'text',
      size: 'small',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    id: 4435,
    componentProps: {
      name: 'shopsBranches',
      label: 'Shops/branches',
      size: 'small',
      placeholder: 'Select',
      options: shopsBranchesOptions,
    },
    component: RHFAutocomplete,
  },
];
