import React from 'react';
import { RHFSelect } from '@/components/ReactHookForm';

export default function OnBehalfOf({
  name,
  data,
}: {
  name: string;
  data: any;
}) {
  return (
    <RHFSelect
      name={name}
      label="On Behalf Of"
      fullWidth
      size="small"
      placeholder="Select party"
      sx={{
        '& > .MuiTypography-root.MuiTypography-body2': {
          fontSize: '12px',
          lineHeight: '1.25',
          mb: '4.5px',
        },
      }}
    >
      {data?.map((item: any) => (
        <option key={item?.value} value={item?.value}>
          {item?.label}
        </option>
      ))}
    </RHFSelect>
  );
}
