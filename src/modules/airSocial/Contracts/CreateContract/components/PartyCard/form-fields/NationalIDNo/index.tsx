import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

interface NationalIDNoProps {
  name?: string;
}

export default function NationalIDNo({ name }: NationalIDNoProps) {
  return (
    <RHFTextField
      name={name}
      label="National ID no"
      size="small"
      fullWidth
      placeholder="Enter National ID no (i.e. Social Security No. or CPR)"
    />
  );
}
