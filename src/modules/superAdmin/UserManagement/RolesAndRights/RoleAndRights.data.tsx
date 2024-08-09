import { Checkbox } from '@mui/material';
import RHFDatePicker from '@/components/ReactHookForm/RHFDatePicker';
import {
  RHFAutocomplete,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ExpandMore } from '@mui/icons-material';
import { SwitchBtn } from '@/components/SwitchButton';
import * as Yup from 'yup';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_ROLES_AND_RIGHTS_PERMISSIONS } from '@/constants/permission-keys';
import { capitalizeFirstLetters, convertIdToShortNumber } from '@/utils';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { PRODUCT_USER_STATUS } from '@/constants/strings';

// Table data starts here

export const columns = (columnsProps: any) => {
  const { handleRolesSwitchChange, checkedRows, handleCheckboxChange } =
    columnsProps;
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          name={info?.getValue()}
          defaultChecked={checkedRows === info?.row?.original?._id}
          onChange={(e: any) =>
            handleCheckboxChange(e, info?.row?.original?._id)
          }
        />
      ),
      header: '',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?._id,
      id: 'roleId',
      header: 'Role ID',
      isSortable: false,
      cell: (info: any) => convertIdToShortNumber(info?.getValue()) ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'roleName',
      isSortable: true,
      header: 'Role Name',
      cell: (info: any) => capitalizeFirstLetters(info?.getValue()) ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <PermissionsGuard
          permissions={[
            SUPER_ADMIN_ROLES_AND_RIGHTS_PERMISSIONS?.ACTIVE_INACTIVE_ROLES,
          ]}
        >
          <SwitchBtn
            defaultChecked={
              info?.row?.original?.status === PRODUCT_USER_STATUS?.ACTIVE
                ? true
                : false
            }
            handleSwitchChange={(e: any) =>
              handleRolesSwitchChange(e, info?.row?.original?._id)
            }
          />
        </PermissionsGuard>
      ),
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdOn',
      isSortable: true,
      header: 'Created On',
      cell: (info: any) =>
        dayjs(info?.getValue())?.format(DATE_FORMAT?.UI) ?? 'N/A',
    },
  ];
};

// Filters data starts here

export const rolesDefaultValues = {
  status: '',
  startDate: null,
  endDate: null,
};

export const rolesFiltersArray = [
  {
    componentProps: {
      label: 'Status',
      name: 'status',
      fullWidth: true,
      placeholder: 'Select status',
      options: ['ACTIVE', 'INACTIVE'],
    },

    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      label: 'Start Date',
      name: 'startDate',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      label: 'End Date',
      name: 'endDate',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
];

// Add new role drawer data starts here

export const addUserSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
});

export const addUserDefault = {
  name: '',
  description: '',
  status: '',
};

export const addUsersArrayData = [
  {
    componentProps: {
      name: 'name',
      label: 'Role Name',
      placeholder: 'Enter role name',
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Enter description...',
      multiline: true,
      rows: 5,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      label: 'Default User',
      name: 'status',
      fullWidth: true,
    },
    component: RHFSwitch,
    md: 6,
  },
];

export const accData = [
  {
    title: 'Dashboard',
    hasSwitch: true,
    content: 'Dashboard content here',
    endIcon: <ExpandMore />,
  },
  {
    title: 'Deals',
    hasSwitch: true,
    content: 'Deals content here',
    endIcon: <ExpandMore />,
  },
];
