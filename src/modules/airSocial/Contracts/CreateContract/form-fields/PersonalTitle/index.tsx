import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

export default function PersonalTitle() {
  return (
    <RHFTextField
      name="personalTitle"
      label="Personal Title"
      size="small"
      fullWidth
      placeholder="Enter Personal Title"
    />
  );
}
