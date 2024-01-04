import { ROLES_ACTION_CONSTANTS } from '@/constants/strings';
import { Checkbox } from '@mui/material';

export const rolesActionsDropdown = (handleActionClick: any) => [
  {
    title: ROLES_ACTION_CONSTANTS?.EDIT,
    handleClick: (closeMenu: any) => {
      handleActionClick('Edit');
      closeMenu?.();
    },
  },
  {
    title: ROLES_ACTION_CONSTANTS?.VIEW,
    handleClick: (closeMenu: any) => {
      handleActionClick('View');
      closeMenu?.();
    },
  },
  {
    title: ROLES_ACTION_CONSTANTS?.DELETE,
    handleClick: (closeMenu: any) => {
      handleActionClick?.('Delete');
      closeMenu?.();
    },
  },
];

export const rolesListData: any = [
  {
    id: 1,
    roleId: '123',
    roleName: 'User',
    createdDate: '12/10/2023',
    description: 'This Role is of Xyz and will do this & that.',
  },
  {
    id: 2,
    roleId: '456',
    roleName: 'Account admin',
    createdDate: '12/10/2023',
    description: 'This Role is of Xyz and will do this & that.',
  },
  {
    id: 3,
    roleId: '7899',
    roleName: 'Admin',
    createdDate: '12/10/2023',
    description: 'This Role is of Xyz and will do this & that.',
  },
  {
    id: 4,
    roleId: '752',
    roleName: 'Admin',
    createdDate: '12/10/2023',
    description: 'This Role is of Xyz and will do this & that.',
  },
];
export const rolesListsColumnsFunction = (
  selectedRolesList: any,
  setSelectedRolesList: any,
  listData: any,
): any => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!selectedRolesList?.find(
            (item: any) => item?.id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedRolesList([
                ...selectedRolesList,
                rolesListData?.find(
                  (item: any) => item?.id === info?.getValue(),
                ),
              ])
            : setSelectedRolesList(
                selectedRolesList?.filter((item: any) => {
                  return item?.id !== info?.getValue();
                }),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={selectedRolesList?.length === listData?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedRolesList([...listData])
            : setSelectedRolesList([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.roleId,
    id: 'roleId',
    isSortable: true,
    header: 'Role ID',
  },
  {
    accessorFn: (row: any) => row?.roleName,
    id: 'roleName',
    header: 'Role Name',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.createdDate,
    id: 'createdDate',
    isSortable: true,
    header: 'Created On',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.description,
    id: 'description',
    isSortable: true,
    header: 'Description',
    cell: (info: any) => info?.getValue(),
  },
];
