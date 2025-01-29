import { RHFSelect } from '@/components/ReactHookForm';
import React from 'react';

interface SigneeOrderProps {
  name: string;
  data: { label: string; value: string }[];
}

export default function SigningOrder({ name, data }: SigneeOrderProps) {
  return (
    <RHFSelect
      name={name}
      label="Signing Order"
      size="small"
      fullWidth
      select={true}
      placeholder="Select Signee Order"
    >
      {data?.map((item) => (
        <option key={item?.value} value={item?.value}>
          {item?.label}
        </option>
      ))}
    </RHFSelect>
  );
}
