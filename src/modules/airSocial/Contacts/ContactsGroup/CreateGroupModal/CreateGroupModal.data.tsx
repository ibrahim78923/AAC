import { RHFTextField } from '@/components/ReactHookForm';
import { Box, Checkbox } from '@mui/material';
import * as Yup from 'yup';
export const createGroupValidationSchema = Yup?.object()?.shape({
  groupName: Yup?.string()?.trim()?.required('Field is Required'),
});

export const createGroupDefaultValues = {
  groupName: '',
};

export const createGroupFiltersDataArray = [
  {
    componentProps: {
      name: 'groupName',
      label: 'Group Name',
    },
    component: RHFTextField,
    md: 12,
  },
];

export const columns: any = ({
  selectedUsers,
  setSelectedUsers,
  smsMarketingContactsData,
}: any) => {
  const isAllUsersSelected =
    selectedUsers?.length === smsMarketingContactsData?.length;
  const handleUserSelection = (userId: any, isSelected: any) => {
    setSelectedUsers((prevSelectedUserIds: any) => {
      if (isSelected) {
        if (!prevSelectedUserIds?.includes(userId)) {
          return [...prevSelectedUserIds, userId];
        }
      } else {
        return prevSelectedUserIds?.filter((id: any) => id !== userId);
      }
      return prevSelectedUserIds;
    });
  };
  const handleSelectAllUsers = () => {
    if (isAllUsersSelected) {
      setSelectedUsers([]);
    } else {
      const allUserIds = smsMarketingContactsData?.map((user: any) => user?.id);
      setSelectedUsers(allUserIds);
    }
  };

  return [
    {
      accessorFn: (row: any) => row?.id,
      id: 'id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={selectedUsers?.includes(info?.row?.original?.id)}
          onChange={(e) => {
            handleUserSelection(info?.row?.original?.id, e?.target?.checked);
          }}
        />
      ),
      header: (
        <Checkbox
          color="primary"
          name="Id"
          checked={isAllUsersSelected}
          onChange={handleSelectAllUsers}
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      header: 'name',
      cell: (info: any) => (
        <>
          <Box sx={{ display: 'flex', gap: 1 }}>{info?.getValue()}</Box>
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.phoneNo,
      id: 'phoneNo',
      header: 'Phone Number',
      cell: (info: any) => info?.getValue(),
    },
  ];
};
