import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

export default function SigneeEmail({ name }: { name: string }) {
  return (
    <RHFTextField
      name={name}
      label="Email"
      size="small"
      fullWidth
      placeholder="Enter email"
    />
  );
}
