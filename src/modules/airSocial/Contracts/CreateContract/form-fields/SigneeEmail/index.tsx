import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

export default function SigneeEmail() {
  return (
    <RHFTextField
      name="signeeEmail"
      label="Email"
      size="small"
      fullWidth
      placeholder="Enter email"
    />
  );
}
