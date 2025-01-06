import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

export default function SigneeFullName() {
  return (
    <RHFTextField
      name="signeeFullName"
      label="Full name"
      size="small"
      fullWidth
      placeholder="Enter full name"
    />
  );
}
