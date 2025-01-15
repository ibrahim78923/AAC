import React from 'react';
import { RHFRadioGroup } from '@/components/ReactHookForm';
import { styles } from './PartyType.style';

interface PartyTypeProps {
  name: string;
}

export default function PartyType({ name }: PartyTypeProps) {
  return (
    <RHFRadioGroup
      sx={styles?.radioGroup}
      name={name}
      options={[
        { value: 'COMPANIES', label: 'Company' },
        { value: 'CONTACTS', label: 'Private person' },
      ]}
    />
  );
}
