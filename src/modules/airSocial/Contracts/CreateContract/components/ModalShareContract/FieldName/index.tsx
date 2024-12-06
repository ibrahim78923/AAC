import React from 'react';
import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetContactDropdownListQuery } from '@/services/commonFeatures/contacts';

interface FieldNameProps {
  name: string;
}

export default function FieldName({ name }: FieldNameProps) {
  const apiQueryRequester = useLazyGetContactDropdownListQuery();

  return (
    <RHFAutocompleteAsync
      name={name}
      label="Name"
      fullWidth
      required
      size="small"
      apiQuery={apiQueryRequester}
      externalParams={{ meta: false }}
      getOptionLabel={(option: any) =>
        `${option?.firstName} ${option?.lastName}`
      }
      placeholder="Search people or invite by email"
    />
  );
}
