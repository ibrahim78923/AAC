import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

export default function HereinafterReferredToAs() {
  return (
    <RHFTextField
      name="hereinafterReferredToAs"
      label="Hereinafter referred to as"
      size="small"
      fullWidth
      placeholder="Enter the name of the party"
    />
  );
}
