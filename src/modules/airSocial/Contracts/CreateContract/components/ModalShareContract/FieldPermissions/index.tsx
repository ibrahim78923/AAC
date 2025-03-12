import React from 'react';
import { RHFSelect } from '@/components/ReactHookForm';
import { ENUM_CONTRACT_PERMISSIONS } from '@/utils/contracts';

interface FieldPermissionProps {
  name: string;
}

export default function FieldPermissions({ name }: FieldPermissionProps) {
  return (
    <RHFSelect
      name={name}
      label="Permission"
      size="small"
      placeholder="View, private comments, private history"
      required
    >
      <option value={ENUM_CONTRACT_PERMISSIONS?.VIEW_ACCESS}>
        View Contract
      </option>
      <option value={ENUM_CONTRACT_PERMISSIONS?.FULL_ACCESS}>
        Full Access
      </option>
    </RHFSelect>
  );
}
