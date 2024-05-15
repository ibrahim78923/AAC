import { RHFTextField } from '@/components/ReactHookForm';
import { Box, Checkbox } from '@mui/material';
import * as Yup from 'yup';

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
  const handleRowClick = (id: any) => {
    const selectedIndex = selectedUsers?.indexOf(id);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelected = newSelected.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1),
      );
    }
    setSelectedUsers(newSelected);
  };

  // Select All Row
  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    rows: any,
  ) => {
    if (event?.target?.checked) {
      const newSelected = rows?.map((n: any) => n?._id);
      setSelectedUsers(newSelected);
      return;
    }
    setSelectedUsers([]);
  };

  const isSelected = (id: any) => selectedUsers?.indexOf(id) !== -1;

  return [
    {
      accessorFn: (row: any) => row._id,
      id: '_id',
      cell: (info: any) => {
        return (
          <Checkbox
            color="primary"
            checked={isSelected(info?.cell?.row?.original?._id)}
            name={info?.cell?.row?.original?._id}
            onClick={() => {
              handleRowClick(info?.cell?.row?.original?._id);
            }}
            disabled={title === 'View'}
          />
        );
      },
      header: (info: any) => {
        const rows = info?.table?.options?.data;
        return (
          <Checkbox
            color="primary"
            indeterminate={
              selectedUsers?.length > 0 && selectedUsers?.length < rows?.length
            }
            checked={
              rows?.length > 0 &&
              selectedUsers?.length === info?.table?.options?.data?.length
            }
            onChange={(event) => handleSelectAllClick(event, rows)}
            disabled={title === 'View' || rows?.length === 0}
          />
        );
      },
      isSortable: false,
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
      cell: (info: any) => info?.getValue(),
    },
  ];
};
