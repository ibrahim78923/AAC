import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

interface AddressProps {
  name?: string;
}

export default function Address({ name }: AddressProps) {
  return (
    <RHFTextField
      name={name}
      label="Address"
      size="small"
      fullWidth
      multiline={true}
      rows={4}
    />
  );
}
