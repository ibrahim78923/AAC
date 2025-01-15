import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

export default function HereinafterReferredToAs({ name }: { name?: string }) {
  return (
    <RHFTextField
      name={name}
      label="Hereinafter referred to as"
      size="small"
      fullWidth
      placeholder="Enter the name of the party"
    />
  );
}
