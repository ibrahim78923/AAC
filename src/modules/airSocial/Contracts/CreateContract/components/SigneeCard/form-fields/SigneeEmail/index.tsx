import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

export default function SigneeEmail({
  name,
  disable,
}: {
  name: string;
  disable: boolean;
}) {
  return (
    <RHFTextField
      name={name}
      label="Email"
      size="small"
      fullWidth
      placeholder="Enter email"
      required={true}
      disabled={disable}
    />
  );
}
