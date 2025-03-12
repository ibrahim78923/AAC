import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

export default function FieldMessage() {
  return (
    <RHFTextField
      name="emailContent"
      label="Message"
      size="small"
      fullWidth
      multiline={true}
      rows={4}
      placeholder="This message will be included in the email notification sent to the recipients."
    />
  );
}
