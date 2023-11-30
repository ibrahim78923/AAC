// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Switch, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomLabel from '../CustomLabel';

// ----------------------------------------------------------------------
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  marginRight: '10px',
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 18,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(15px)',
      color: 'white',
      '& + .MuiSwitch-track': {
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 1,
    width: 16,
    height: 16,
    borderRadius: '50%',
    transition: theme?.transitions?.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 12,
    opacity: 1,
    boxSizing: 'border-box',
    backgroundColor: 'GrayText',
  },
}));

export default function RHFSwitch({ name, disabled, required, ...other }: any) {
  const { control } = useFormContext();
  return (
    <FormControlLabel
      sx={{
        ml: '5px',
        '& .MuiFormControlLabel-label': {
          display: 'none',
        },
      }}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <AntSwitch
                disabled={disabled}
                {...field}
                checked={field?.value}
              />
              {other?.label && (
                <CustomLabel label={other?.label} required={required} />
              )}
            </>
          )}
        />
      }
      {...other}
    />
  );
}
