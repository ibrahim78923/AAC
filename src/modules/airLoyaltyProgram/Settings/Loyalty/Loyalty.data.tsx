import { PoundSignIcon } from '@/assets/icons';
import { RHFTextField } from '@/components/ReactHookForm';
import { InputAdornment } from '@mui/material';

export const loyaltySettingsFormDefaultValues = (data?: any) => {
  return {
    maxPointLimit: data?.maxPointLimit ?? '',
    exchangeRate: data?.exchangeRate ?? '',
  };
};

export const loyaltySettingsFormFields = [
  {
    _id: 1,
    md: 8,
    componentProps: {
      name: 'maxPointLimit',
      label: 'Maximum points limit',
      placeholder: 'Enter maximum points limit (e.g., 1000)',
      type: 'number',
      inputProps: {
        min: 0,
      },
    },
    component: RHFTextField,
  },
  {
    _id: 2,
    md: 8,
    componentProps: {
      name: 'exchangeRate',
      label: 'Exchange rate per point',
      placeholder: 'Enter exchange rate per point (e.g., 1)',
      type: 'number',
      inputProps: {
        min: 0,
      },
      InputProps: {
        startAdornment: (
          <InputAdornment position="start">
            <PoundSignIcon />
          </InputAdornment>
        ),
      },
    },
    component: RHFTextField,
  },
];
