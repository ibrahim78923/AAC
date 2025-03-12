import React from 'react';
import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetDropdownOrganizationUsersQuery } from '@/services/common-APIs';
import useAuth from '@/hooks/useAuth';

interface FieldNameProps {
  name: string;
}

export default function FieldName({ name }: FieldNameProps) {
  const { user }: any = useAuth();
  const apiQueryRequester = useLazyGetDropdownOrganizationUsersQuery();

  return (
    <RHFAutocompleteAsync
      name={name}
      label="Name"
      fullWidth
      required
      size="small"
      apiQuery={apiQueryRequester}
      externalParams={{ id: user?.organization?._id, meta: false }}
      getOptionLabel={(option: any) =>
        `${option?.firstName} ${option?.lastName}`
      }
      placeholder="Search or invite by email"
    />
  );
}
