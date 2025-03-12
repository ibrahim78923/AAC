import { RHFSelect } from '@/components/ReactHookForm';
import React from 'react';

interface SigneeOrderProps {
  name: string;
  data: { label: string; value: number }[];
  disabled?: boolean;
}

export default function SigningOrder({
  name,
  data,
  disabled = false,
}: SigneeOrderProps) {
  return (
    <RHFSelect
      name={name}
      label="Signing Order"
      size="small"
      fullWidth
      select={true}
      placeholder="Select Signee Order"
      disabled={disabled}
    >
      {data?.map((item) => (
        <option key={item?.value} value={item?.value}>
          {item?.label}
        </option>
      ))}
    </RHFSelect>
  );
}
