import { pxToRem } from '@/utils/getFontValue';
import {
  specificUsersAccessColumns,
  specificUsersAccessFormFieldsDynamic,
} from './SpecificUsers.data';
import { UsersFieldDropdown } from '../../DashboardFormFields/UsersFieldDropdown';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FieldArrayTable } from '@/components/Table/FieldArrayTable';
import { useCallback } from 'react';

export const SpecificUsers = (props: any) => {
  const { name, disabled } = props;
  const { control } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      <UsersFieldDropdown disabled={disabled} />
      <FieldArrayTable
        tableContainerCustomStyles={{
          maxHeight: pxToRem(400),
          border: '1px solid',
          borderColor: 'custom.off_white_three',
          borderRadius: 2,
        }}
        stickyHeader={true}
        canAddItem={false}
        columns={specificUsersAccessColumns}
        fields={fields}
        minWidth={pxToRem(400)}
        getRowData={useCallback(
          (index: any) =>
            specificUsersAccessFormFieldsDynamic?.(
              'permissionsUsers',
              index,
              disabled,
            ),
          [disabled],
        )}
      />
    </>
  );
};
