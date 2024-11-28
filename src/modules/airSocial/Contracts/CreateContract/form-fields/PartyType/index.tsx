import React from 'react';
import { RHFRadioGroup } from '@/components/ReactHookForm';
import { styles } from './PartyType.style';

export default function PartyType() {
  return (
    <RHFRadioGroup
      sx={styles?.radioGroup}
      name="partyType"
      options={[
        { value: 'company', label: 'Company' },
        { value: 'individual', label: 'Private person' },
      ]}
      defaultValue="individual"
    />
  );
}
