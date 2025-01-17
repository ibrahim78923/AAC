import { RHFSelect } from '@/components/ReactHookForm';
import React from 'react';

interface SigneeOrderProps {
  name: string;
}

export default function SigningOrder({ name }: SigneeOrderProps) {
  return (
    <RHFSelect
      name={name}
      label="Signing Order"
      size="small"
      fullWidth
      select={true}
      placeholder="Select Signee Order"
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </RHFSelect>
  );
}
