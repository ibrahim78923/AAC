import React from 'react';
import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetRequesterDropdownQuery } from '@/services/airCustomerPortal/catalog';

export default function FullName() {
  const apiQueryRequester = useLazyGetRequesterDropdownQuery();

  return (
    <RHFAutocompleteAsync
      name="fullName"
      label="Full name"
      fullWidth
      required
      size="small"
      apiQuery={apiQueryRequester}
      externalParams={{}}
      getOptionLabel={(option: any) =>
        `${option?.firstName} ${option?.lastName}`
      }
      placeholder="Select party"
      sx={{
        '& > .MuiTypography-root.MuiTypography-body2': {
          fontSize: '12px',
          lineHeight: '1.25',
          mb: '4.5px',
        },
      }}
    />
  );
}
