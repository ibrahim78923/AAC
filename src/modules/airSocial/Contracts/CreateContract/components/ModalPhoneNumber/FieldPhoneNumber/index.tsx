import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

export default function FieldPhoneNumber() {
  return (
    <RHFTextField
      name="phoneNumber"
      label="Phone number"
      size="small"
      fullWidth
      placeholder="+44xxxxxxxxxx"
      required
    />
  );
}
