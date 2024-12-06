import React from 'react';
import { RHFMultiSearchableSelect } from '@/components/ReactHookForm';

interface FieldPermissionsProps {
  name: string;
}

export default function FieldPermissions({ name }: FieldPermissionsProps) {
  return (
    <RHFMultiSearchableSelect
      name={name}
      label="Permissions"
      options={[
        { label: 'View Contract', value: 'view' },
        { label: 'Full Access', value: 'fullAccess' },
      ]}
      size="small"
      placeholder="View, private comments, private history"
    />
  );
}
