import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

export default function FieldVerificationCode() {
  return (
    <RHFTextField
      name="verificationCode"
      label="Verification code"
      size="small"
      fullWidth
      placeholder="6 digit code"
      required
    />
  );
}
