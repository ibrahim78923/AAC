import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

type ContractTitleProps = {
  height?: number;
};

export default function ContractTitle({ height = 78 }: ContractTitleProps) {
  return (
    <RHFTextField
      name="name"
      label="Contract Title"
      required
      fullWidth
      sx={{ '& .MuiInputBase-root': { height: `${height}px` } }}
    />
  );
}
