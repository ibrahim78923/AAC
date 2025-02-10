import React from 'react';
import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetContactDropdownListQuery } from '@/services/commonFeatures/contacts';
import { useLazyGetCommonAllCompaniesQuery } from '@/services/common-APIs';
import { useFormContext } from 'react-hook-form';

export default function FullName({ index }: { index: number }) {
  const { watch } = useFormContext();
  const parties = watch('parties');
  const apiQueryContacts = useLazyGetContactDropdownListQuery();
  const apiQueryCompanies = useLazyGetCommonAllCompaniesQuery();

  return parties[index]?.moduleType === 'COMPANIES' ? (
    <RHFAutocompleteAsync
      name={`parties.${index}.name`}
      label="Full name"
      fullWidth
      size="small"
      required={true}
      apiQuery={apiQueryCompanies}
      externalParams={{ meta: false }}
      getOptionLabel={(option: any) => {
        return option?.name;
      }}
      placeholder="Select party"
      sx={{
        '& > .MuiTypography-root.MuiTypography-body2': {
          fontSize: '12px',
          lineHeight: '1.25',
          mb: '4.5px',
        },
      }}
    />
  ) : (
    <RHFAutocompleteAsync
      name={`parties.${index}.name`}
      label="Full name"
      fullWidth
      size="small"
      required={true}
      apiQuery={apiQueryContacts}
      externalParams={{ meta: false }}
      getOptionLabel={(option: any) => {
        return `${option?.firstName} ${option?.lastName}`;
      }}
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
