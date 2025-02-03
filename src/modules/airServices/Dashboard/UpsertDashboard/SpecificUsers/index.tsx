import { pxToRem } from '@/utils/getFontValue';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { SpecificUsersAccessFormFieldsDynamicI } from '../UpsertDashboard.interface';
import {
  specificUsersAccessColumns,
  specificUsersAccessFormFieldsDynamic,
} from './SpecificUsers.data';
import { UsersFieldDropdown } from '../../DashboardFormFields/UsersFieldDropdown';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';

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
      <TableContainer
        sx={{
          maxHeight: pxToRem(400),
          border: '1px solid',
          borderColor: 'custom.off_white_three',
          borderRadius: 2,
        }}
      >
        <Table stickyHeader sx={{ minWidth: pxToRem(400) }}>
          <TableHead>
            <TableRow>
              {specificUsersAccessColumns?.map(
                (column: AutocompleteOptionsI) => (
                  <TableCell key={column?._id}>{column?.label}</TableCell>
                ),
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {fields?.map((item: any, index: number) => {
              return (
                <TableRow key={item?.id}>
                  {specificUsersAccessFormFieldsDynamic?.(
                    'permissionsUsers',
                    index,
                    disabled,
                  )?.map(
                    (
                      singleField: SpecificUsersAccessFormFieldsDynamicI | any,
                    ) => (
                      <TableCell
                        key={singleField?.id}
                        align={singleField?.align}
                      >
                        {singleField?.data}
                      </TableCell>
                    ),
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
