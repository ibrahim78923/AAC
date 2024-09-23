import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { AIR_OPERATIONS, DATE_FORMAT } from '@/constants';
import { AIR_OPERATIONS_ROLES_AND_RIGHT_ROLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import {
  ARRAY_INDEX,
  GENERIC_UPSERT_FORM_CONSTANT,
  SELECTED_ARRAY_LENGTH,
} from '@/constants/strings';
import { errorSnackbar } from '@/utils/api';
import { Checkbox } from '@mui/material';
import dayjs from 'dayjs';
import {
  ICloseMenu,
  IRole,
  IRolesAndRightColumns,
} from './RolesAndRight.interface';
import { ChangeEvent } from 'react';
import { NextRouter } from 'next/router';
import { TruncateText } from '@/components/TruncateText';

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
      if (selectedRolesList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      router?.push({
        pathname: AIR_OPERATIONS?.UPSERT_ROLES,
        query: {
          roleId: selectedRolesList?.[ARRAY_INDEX?.ZERO]?._id,
          action: GENERIC_UPSERT_FORM_CONSTANT?.EDIT,
        },
      });
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'View',
    permissionKey: [
      AIR_OPERATIONS_ROLES_AND_RIGHT_ROLES_LIST_PERMISSIONS?.VIEW_ROLE,
    ],
    handleClick: (closeMenu: ICloseMenu) => {
      if (selectedRolesList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      router?.push({
        pathname: AIR_OPERATIONS?.UPSERT_ROLES,
        query: {
          roleId: selectedRolesList?.[ARRAY_INDEX?.ZERO]?._id,
          action: GENERIC_UPSERT_FORM_CONSTANT?.VIEW,
        },
      });
      closeMenu();
    },
  },
  {
    id: 3,
    title: 'Delete',
    permissionKey: [
      AIR_OPERATIONS_ROLES_AND_RIGHT_ROLES_LIST_PERMISSIONS?.DELETE_ROLE,
    ],
    handleClick: (closeMenu: ICloseMenu) => {
      if (selectedRolesList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setIsPortalOpen({ isOpen: true, isDelete: true });
      closeMenu();
    },
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
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
  {
    accessorFn: (row: IRolesAndRightColumns) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created On',
    cell: (info: any) =>
      dayjs(info?.getValue())?.format(DATE_FORMAT?.UI) ?? '---',
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
