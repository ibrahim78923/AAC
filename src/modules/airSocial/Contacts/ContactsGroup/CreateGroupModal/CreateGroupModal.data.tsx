import { RHFTextField } from '@/components/ReactHookForm';
import { Box } from '@mui/material';
import * as Yup from 'yup';
import RowSelection from '@/components/RowSelection';
import RowSelectionAll from '@/components/RowSelectionAll';
import { createGroupModalTitle } from '../Contacts.data';

export const createGroupValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field is Required'),
});

export const createGroupDefaultValues = {
  name: '',
};

export const createGroupFiltersDataArray = (title: string) => [
  {
    componentProps: {
      name: 'name',
      label: 'Group Name',
      disabled: title === 'View',
    },
    component: RHFTextField,
    md: 12,
  },
];

export const columns: any = ({
  selectedUsers,
  setSelectedUsers,
  title,
}: any) => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      isSortable: false,
      header: (info: any) => {
        const rows = info?.table?.options?.data;
        return (
          <RowSelectionAll
            rows={rows}
            selectedRow={selectedUsers}
            setSelectedRow={setSelectedUsers}
            disabled={
              title === createGroupModalTitle?.view || rows?.length === 0
            }
          />
        );
      },
      cell: (info: any) => {
        const id = info?.cell?.row?.original?._id;
        return (
          <RowSelection
            id={id}
            selectedRow={selectedUsers}
            setSelectedRow={setSelectedUsers}
            disabled={title === createGroupModalTitle?.view}
          />
        );
      },
    },
    {
      accessorFn: (row: any) => `${row?.firstName} ${row?.lastName}`,
      id: 'name',
      header: 'Contact',
      cell: (info: any) => {
        const row = info?.row?.original;
        const email = row?.email;
        const firstName = row?.firstName;
        const lastName = row?.lastName;
        const fullName = () => {
          if (!firstName && !lastName) {
            return false;
          } else if (firstName && !lastName) {
            return firstName;
          } else if (!firstName && lastName) {
            return lastName;
          } else if (firstName && lastName) {
            return firstName + ' ' + lastName;
          }
        };

        return (
          <Box>
            {fullName() && (
              <Box sx={{ color: 'blue.dull_blue' }}>{fullName()}</Box>
            )}

            <Box sx={{ fontSize: '12px' }}>{email}</Box>
          </Box>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'phoneNumber',
      header: 'Phone Number',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
  ];
};
