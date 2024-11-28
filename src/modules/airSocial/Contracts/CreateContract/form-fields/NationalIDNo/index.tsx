import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

export default function NationalIDNo() {
  return (
    <RHFTextField
      name="idNo"
      label="National ID no"
      size="small"
      fullWidth
      placeholder="Enter National ID no (i.e. Social Security No. or CPR)"
    />
  );
}
