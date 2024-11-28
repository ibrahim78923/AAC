import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { AIR_OPERATIONS } from '@/constants/routes';
import { AIR_OPERATIONS_ROLES_AND_RIGHT_ROLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import {
  ARRAY_INDEX,
  GENERIC_UPSERT_FORM_CONSTANT,
  SELECTED_ARRAY_LENGTH,
} from '@/constants/strings';
import { Checkbox } from '@mui/material';
import {
  ICloseMenu,
  IRole,
  IRolesAndRightColumns,
} from './RolesAndRight.interface';
import { ChangeEvent } from 'react';
import { NextRouter } from 'next/router';
import { TruncateText } from '@/components/TruncateText';
import { uiDateFormat } from '@/lib/date-time';

export const actionButtonDropdownDynamic = (
  setIsPortalOpen: ((isOpen?: boolean) => void) | any,
  selectedRolesList: Array<IRole> | any,
  router: NextRouter,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [
      AIR_OPERATIONS_ROLES_AND_RIGHT_ROLES_LIST_PERMISSIONS?.EDIT_ROLE,
    ],
    handleClick: (closeMenu: ICloseMenu) => {
      router?.push({
        pathname: AIR_OPERATIONS?.UPSERT_ROLES,
        query: {
          roleId: selectedRolesList?.[ARRAY_INDEX?.ZERO]?._id,
          action: GENERIC_UPSERT_FORM_CONSTANT?.EDIT,
        },
      });
      closeMenu();
    },
    disabled: selectedRolesList?.length > SELECTED_ARRAY_LENGTH?.ONE,
  },
  {
    id: 2,
    title: 'View',
    permissionKey: [
      AIR_OPERATIONS_ROLES_AND_RIGHT_ROLES_LIST_PERMISSIONS?.VIEW_ROLE,
    ],
    handleClick: (closeMenu: ICloseMenu) => {
      router?.push({
        pathname: AIR_OPERATIONS?.UPSERT_ROLES,
        query: {
          roleId: selectedRolesList?.[ARRAY_INDEX?.ZERO]?._id,
          action: GENERIC_UPSERT_FORM_CONSTANT?.VIEW,
        },
      });
      closeMenu();
    },
    disabled: selectedRolesList?.length > SELECTED_ARRAY_LENGTH?.ONE,
  },
  {
    id: 3,
    title: 'Delete',
    permissionKey: [
      AIR_OPERATIONS_ROLES_AND_RIGHT_ROLES_LIST_PERMISSIONS?.DELETE_ROLE,
    ],
    handleClick: (closeMenu: ICloseMenu) => {
      setIsPortalOpen({ isOpen: true, isDelete: true });
      closeMenu();
    },
    disabled: selectedRolesList?.length > SELECTED_ARRAY_LENGTH?.ONE,
  },
];

export const operationsRolesAndRightColumnsDynamic = (
  selectedRoleList?: Array<IRole> | any,
  setSelectedRoleList?: ((roles?: Array<IRole>) => void) | any,
  totalRoles: Array<IRole> | any = [],
) => [
  {
    accessorFn: (row: IRolesAndRightColumns) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!selectedRoleList?.find(
            (item: any) => item?._id === info?.getValue(),
          )
        }
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e?.target?.checked
            ? setSelectedRoleList([...selectedRoleList, info?.row?.original])
            : setSelectedRoleList(
                selectedRoleList?.filter(
                  (item: any) => item?._id !== info?.getValue(),
                ),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          totalRoles?.length
            ? selectedRoleList?.length === totalRoles?.length
            : false
        }
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e?.target?.checked
            ? setSelectedRoleList(totalRoles?.map((item: any) => item))
            : setSelectedRoleList([]);
        }}
        color="primary"
        name="id"
      />
    ),
  },
  {
    accessorFn: (row: IRolesAndRightColumns) => row?._id,
    id: 'Role Id',
    isSortable: true,
    header: 'Role ID',
    cell: (info: any) => info?.getValue()?.slice?.(-3) ?? '---',
  },
  {
    accessorFn: (row: IRolesAndRightColumns) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Role Name',
    cell: (info: any) => (
      <TruncateText
        text={info?.getValue()}
        customTooltipProps={{ placement: 'top-start' }}
      />
    ),
  },
  {
    accessorFn: (row: IRolesAndRightColumns) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created On',
    cell: (info: any) => uiDateFormat(info?.getValue()) ?? '---',
  },
  {
    accessorFn: (info: IRolesAndRightColumns) => info?.description,
    id: 'description',
    header: 'Description',
    isSortable: true,
    cell: (info: any) => (
      <TruncateText
        text={info?.getValue() == '' ? undefined : info?.getValue()}
      />
    ),
  },
];
