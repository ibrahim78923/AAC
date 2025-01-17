import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

export default function PersonalTitle({ name }: { name: string }) {
  return (
    <RHFTextField
      name={name}
      label="Personal Title"
      size="small"
      fullWidth
      placeholder="Enter Personal Title"
    />
  );
}
