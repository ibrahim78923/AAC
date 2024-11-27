import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

export default function Address() {
  return (
    <RHFTextField
      name="address"
      label="Address"
      size="small"
      fullWidth
      multiline={true}
      rows={4}
    />
  );
}
