import { pxToRem } from '@/utils/getFontValue';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  SpecificUsersAccessColumnsI,
  SpecificUsersAccessFormFieldsDynamicI,
} from '../UpsertDashboard.interface';
import {
  specificUsersAccessColumns,
  specificUsersAccessFormFieldsDynamic,
} from './SpecificUsers.data';
import { UsersFieldDropdown } from '../../DashboardFormFields/UsersFieldDropdown';

export const SpecificUsers = (props: any) => {
  const { fields } = props;
  return (
    <>
      <UsersFieldDropdown />
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
                (column: SpecificUsersAccessColumnsI) => (
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
