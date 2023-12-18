import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const assignedPhysicalGiftFilterValidationSchema = Yup?.object()?.shape({
  minimumCurrentAmount: Yup?.string(),
  active: Yup?.string(),
  upgradeAble: Yup?.string(),
  maximumCurrentAmount: Yup?.string(),
});

export const assignedPhysicalGiftFilterDefaultValues = {
  minimumCurrentAmount: '',
  active: '',
  upgradeAble: '',
  maximumCurrentAmount: '',
};

const activeStatus = ['Yes', 'No'];
const upgradeAbleStatus = ['Yes', 'No'];
export const assignedPhysicalGiftFilterDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'maximumCurrentAmount',
      label: 'Maximum Current Amount',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'minimumCurrentAmount',
      label: 'Minimum Current Amount',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'active',
      label: 'Active',
      type: 'text',
      size: 'small',
      placeholder: 'Yes',
      fullWidth: true,
      options: activeStatus,
    },
    component: RHFAutocomplete,
  },

  {
    id: 4,
    componentProps: {
      name: 'upgradeAble',
      label: 'UpgradeAble',
      type: 'text',
      size: 'small',
      placeholder: 'Yes',
      fullWidth: true,
      options: upgradeAbleStatus,
    },
    component: RHFAutocomplete,
  },
];
