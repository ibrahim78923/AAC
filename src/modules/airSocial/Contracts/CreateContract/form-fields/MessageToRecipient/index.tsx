import { RHFTextField } from '@/components/ReactHookForm';
import React from 'react';

export default function MessageToRecipient() {
  return (
    <RHFTextField
      name="message"
      label="Message to the recipient"
      size="small"
      fullWidth
      multiline={true}
      rows={3}
      placeholder="Default message to the recipient"
    />
  );
}
