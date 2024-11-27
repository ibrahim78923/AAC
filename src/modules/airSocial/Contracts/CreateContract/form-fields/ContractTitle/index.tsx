import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

export default function ContractTitle() {
  return (
    <RHFTextField
      name="contractTitle"
      label="Contract Title"
      required
      fullWidth
      sx={{ '& .MuiInputBase-root': { height: '78px' } }}
    />
  );
}
