import { RHFRadioGroup, RHFTextField } from '@/components/ReactHookForm';
import { MANAGE_ACCESS_TYPES } from '@/constants/strings';
import { pxToRem } from '@/utils/getFontValue';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import * as Yup from 'yup';
import { UsersFieldDropdown } from '../ReportFormFields/UsersFieldDropdown';

export const MANAGE_ACCESS_REPORT_TYPES = {
  PRIVATE_TO_OWNER: 'Private to owner',
  EVERYONE: 'Everyone',
  EVERYONE_EDIT_AND_VIEW: 'Everyone can edit and view',
  EVERYONE__ONLY_VIEW: 'Everyone can view',
  SPECIFIC_USER_AND_TEAMS: 'Only Specific user and teams',
};

export const MANAGE_REPORT_ACCESS_TYPES = {
  PRIVATE_TO_OWNER: MANAGE_ACCESS_TYPES?.PRIVATE_CAPITAL,
  EVERYONE: MANAGE_ACCESS_TYPES?.EVERYONE_CAPITAL,
  EVERYONE_EDIT_AND_VIEW: MANAGE_ACCESS_TYPES?.VIEW_AND_EDIT_CAPITAL,
  EVERYONE_ONLY_VIEW: MANAGE_ACCESS_TYPES?.VIEW_ONLY_CAPITAL,
  EDIT_AND_VIEW: MANAGE_ACCESS_TYPES?.VIEW_AND_EDIT_CAPITAL,
  ONLY_VIEW: MANAGE_ACCESS_TYPES?.VIEW_ONLY_CAPITAL,
  SPECIFIC_USER_AND_TEAMS: MANAGE_ACCESS_TYPES?.SPECIFIC_USERS,
};

export const manageReportAccessValidationSchema = Yup?.object()?.shape({
  access: Yup?.string()?.required('Access is required'),
  specialUsers: Yup?.mixed()
    ?.nullable()
    ?.when('access', {
      is: (value: any) =>
        value === MANAGE_REPORT_ACCESS_TYPES?.SPECIFIC_USER_AND_TEAMS,
      then: () => Yup?.array()?.min(1, 'User is required'),
      otherwise: (schema: any) => schema?.notRequired(''),
    }),
  permissions: Yup?.string()?.when('access', {
    is: (value: any) => value === MANAGE_REPORT_ACCESS_TYPES?.EVERYONE,
    then: () => Yup?.string()?.required('Permission is required'),
    otherwise: (schema: any) => schema?.notRequired(''),
  }),
  permissionsUsers: Yup?.array()
    ?.of(
      Yup?.object()?.shape({
        name: Yup?.string(),
        access: Yup?.string(),
        id: Yup?.string(),
      }),
    )
    ?.when('access', {
      is: (value: any) =>
        value === MANAGE_REPORT_ACCESS_TYPES?.SPECIFIC_USER_AND_TEAMS,
      then: () => {
        return Yup?.array()?.of(
          Yup?.object()?.shape({
            name: Yup?.string(),
            access: Yup?.string()?.required('access is required'),
            id: Yup?.string(),
          }),
        );
      },
      otherwise: (schema: any) => schema?.notRequired(),
    }),
});

export const manageReportAccessDefaultValues = () => {
  return {
    specialUsers: [],
    permissionsUsers: [],
    access: '',
    permissions: '',
  };
};

export const specificUsersAccessColumns = [
  { _id: 'name', label: 'Name' },
  { _id: 'viewAndEdit', label: 'View and Edit' },
  { _id: 'viewOnly', label: 'View Only' },
];

export const specificUsersAccessFormFieldsDynamic = (
  name: string,
  index: number,
) => [
  {
    _id: 1,
    data: <RHFTextField name={`${name}.${index}.name`} size="small" disabled />,
  },
  {
    _id: 2,
    align: 'center',
    data: (
      <RHFRadioGroup
        name={`${name}.${index}.access`}
        size="small"
        options={[
          {
            value: MANAGE_REPORT_ACCESS_TYPES?.EDIT_AND_VIEW,
          },
        ]}
      />
    ),
  },
  {
    _id: 3,
    align: 'center',
    data: (
      <RHFRadioGroup
        name={`${name}.${index}.access`}
        size="small"
        options={[
          {
            value: MANAGE_REPORT_ACCESS_TYPES?.ONLY_VIEW,
          },
        ]}
      />
    ),
  },
];

export const manageReportAccessFromFieldsDynamic = (fields: any) => [
  {
    _id: 3,
    md: 9,
    componentProps: {
      name: 'access',
      row: false,
      options: [
        {
          value: MANAGE_REPORT_ACCESS_TYPES?.PRIVATE_TO_OWNER,
          label: 'Private to owner',
        },
        {
          value: MANAGE_REPORT_ACCESS_TYPES?.EVERYONE,
          label: 'Everyone',
          filter: (
            <Box px={3}>
              <RHFRadioGroup
                name="permissions"
                row={false}
                options={[
                  {
                    value: MANAGE_REPORT_ACCESS_TYPES?.EVERYONE_EDIT_AND_VIEW,
                    label: 'Everyone can edit and view',
                  },
                  {
                    value: MANAGE_REPORT_ACCESS_TYPES?.EVERYONE_ONLY_VIEW,
                    label: 'Everyone can view',
                  },
                ]}
              />
            </Box>
          ),
        },
        {
          value: MANAGE_REPORT_ACCESS_TYPES?.SPECIFIC_USER_AND_TEAMS,
          label: 'Only Specific users',
          filter: (
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
                      {specificUsersAccessColumns?.map((column: any) => (
                        <TableCell key={column?._id}>{column?.label}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {fields?.map((item: any, index: number) => {
                      return (
                        <TableRow key={item?.id}>
                          {specificUsersAccessFormFieldsDynamic?.(
                            'permissionsUsers',
                            index,
                          )?.map((singleField: any) => (
                            <TableCell
                              key={singleField?.id}
                              align={singleField?.align}
                            >
                              {singleField?.data}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ),
        },
      ],
    },
    component: RHFRadioGroup,
  },
];
