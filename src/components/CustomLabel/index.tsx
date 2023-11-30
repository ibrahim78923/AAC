import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CustomLabel: FC<{ label: string; required?: boolean }> = (props) => {
  const { label, required = false } = props;
  const { palette }: any = useTheme();
  return (
    <Typography
      component={'span'}
      sx={{
        textTransform: 'capitalize',
        '&::after': required
          ? {
              content: '"*"',
              color: palette?.error?.main,
            }
          : '',
        color: 'inherit',
      }}
    >
      {label}
    </Typography>
  );
};

export default CustomLabel;
