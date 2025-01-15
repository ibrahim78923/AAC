import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

export default function SigneeFullName({ name }: { name: string }) {
  return (
    <RHFTextField
      name={name}
      label="Full name"
      size="small"
      fullWidth
      placeholder="Enter full name"
    />
  );
}
