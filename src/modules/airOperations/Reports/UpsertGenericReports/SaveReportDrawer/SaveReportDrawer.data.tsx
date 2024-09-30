import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import {
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { REPORT_TYPE } from '@/constants/strings';
import * as Yup from 'yup';
import {
  SpecialUsersFieldsI,
  SpecificUsersAccessColumnsI,
  SpecificUsersAccessFormFieldsDynamicI,
  UsersDropdownOptionsI,
} from './SaveReportDrawer.interface';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { pxToRem } from '@/utils/getFontValue';

const sharedWithOptionsArray = [
  { value: REPORT_TYPE?.VIEW_AND_EDIT, label: 'View and Edit' },
  { value: REPORT_TYPE?.VIEW_ONLY, label: 'View Only' },
];
const sharedWithArray = [
  { value: REPORT_TYPE?.PRIVATE, label: 'Private' },
  { value: REPORT_TYPE?.EVERYONE, label: 'Everyone' },
  { value: REPORT_TYPE?.SPECIFIC_USERS, label: 'Specific Users' },
];
const addToDashboardArray = [
  { value: REPORT_TYPE?.DO_NOT_ADD, label: 'Do not add to a dashboard' },
  { value: REPORT_TYPE?.ADD_TO_NEW, label: 'Add to new dashboard' },
  { value: REPORT_TYPE?.ADD_TO_EXISTING, label: 'Add to existing dashboard' },
];

export const reportsValidationSchema = (reportValidation: any) =>
  Yup?.object()?.shape({
    reportName: Yup?.string()?.required('Required'),
    sharedWith: Yup?.string()?.nullable()?.required('Required'),
    addToDashboard: Yup?.string()?.nullable()?.required('Required'),
    everyoneCondition: Yup?.string()?.when(() =>
      reportValidation?.selectSharedWith === REPORT_TYPE?.EVERYONE
        ? Yup?.string()?.nullable()?.required('Required')
        : Yup?.string()?.notRequired(),
    ),
    specificUsersConditionOne: Yup?.array()?.when(() =>
      reportValidation?.selectSharedWith === REPORT_TYPE?.SPECIFIC_USERS
        ? Yup?.array()?.min(1, 'At least one user is required')
        : Yup?.array()?.notRequired(),
    ),
    sharedWithPermissions: Yup?.array()
      ?.of(
        Yup?.object()?.shape({
          name: Yup?.string(),
          permission: Yup?.string(),
          userId: Yup?.string(),
        }),
      )
      ?.when('sharedWith', {
        is: (value: any) => value === REPORT_TYPE?.SPECIFIC_USERS,
        then: () => {
          return Yup?.array()?.of(
            Yup?.object()?.shape({
              name: Yup?.string(),
              permission: Yup?.string()?.required('Permission is required'),
              userId: Yup?.string(),
            }),
          );
        },
        otherwise: (schema: any) => schema?.notRequired(),
      }),
    addToExistingCondition: Yup?.array()?.when(() =>
      reportValidation?.selectAddToDashboard === REPORT_TYPE?.ADD_TO_EXISTING
        ? Yup?.array()?.min(1, 'At least one dashboard is required')
        : Yup?.array()?.notRequired(),
    ),
    addToNewConditionOne: Yup?.string()?.when(() =>
      reportValidation?.selectAddToDashboard === REPORT_TYPE?.ADD_TO_NEW
        ? Yup?.string()?.nullable()?.required('Required')
        : Yup?.string()?.notRequired(),
    ),
    addToNewConditionTwo: Yup?.string()?.when(() =>
      reportValidation?.selectAddToDashboard === REPORT_TYPE?.ADD_TO_NEW
        ? Yup?.string()?.nullable()?.required('Required')
        : Yup?.string()?.notRequired(),
    ),
    newDashboardEveryoneCondition: Yup?.string()?.when(() =>
      reportValidation?.selectAddToNewDashboard === REPORT_TYPE?.EVERYONE
        ? Yup?.string()?.nullable()?.required('Required')
        : Yup?.string()?.notRequired(),
    ),
    newDashboardSpecificUsersConditionOne: Yup?.array()?.when(() =>
      reportValidation?.selectAddToNewDashboard === REPORT_TYPE?.SPECIFIC_USERS
        ? Yup?.array()?.min(1, 'At least one user is required')
        : Yup?.array()?.notRequired(),
    ),
    newDashboardPermissions: Yup?.array()
      ?.of(
        Yup?.object()?.shape({
          name: Yup?.string(),
          permission: Yup?.string(),
          userId: Yup?.string(),
        }),
      )
      ?.when('addToNewConditionTwo', {
        is: (value: any) => value === REPORT_TYPE?.SPECIFIC_USERS,
        then: () => {
          return Yup?.array()?.of(
            Yup?.object()?.shape({
              name: Yup?.string(),
              permission: Yup?.string()?.required('Permission is required'),
              userId: Yup?.string(),
            }),
          );
        },
        otherwise: (schema: any) => schema?.notRequired(),
      }),
  });

export const reportsDefaultValues = (singleReport: any) => {
  return {
    reportName: singleReport?.genericReport?.name ?? '',
    sharedWith: singleReport?.genericReport?.accessLevel?.type ?? null,
    addToDashboard: null,
    addToExistingCondition: [],
    everyoneCondition: singleReport?.genericReport?.accessLevel?.access ?? null,
    specificUsersConditionOne: [],
    addToNewConditionOne: '',
    addToNewConditionTwo: null,
    newDashboardEveryoneCondition: null,
    newDashboardSpecificUsersConditionOne: [],
    addFilter: singleReport?.genericReport?.isDateFilter ?? false,
  };
};

export const reportsDataArray = (
  usersDropdown: any,
  dashboardDropdown: any,
  newDashboardFields: SpecialUsersFieldsI[],
  sharedWithFields: SpecialUsersFieldsI[],
  id: any,
  productId: any,
) => [
  {
    id: 7578,
    componentProps: {
      name: 'reportName',
      label: 'Report Name',
      placeholder: 'Enter Name',
      fullWidth: true,
      required: true,
      size: 'small',
    },
    component: RHFTextField,
  },
  {
    id: 3466,
    componentProps: {
      name: 'sharedWith',
      label: 'Shared with',
      required: true,
      options: sharedWithArray,
    },
    component: RHFRadioGroup,
    conditionalComponentOne: (
      <RHFRadioGroup
        name="everyoneCondition"
        size="small"
        row={false}
        options={sharedWithOptionsArray}
      />
    ),
    conditionalComponentTwo: (
      <>
        <RHFAutocompleteAsync
          size="small"
          name="specificUsersConditionOne"
          label="Select user"
          multiple={true}
          required={true}
          apiQuery={usersDropdown}
          getOptionLabel={(option: UsersDropdownOptionsI) =>
            `${option?.firstName} ${option?.lastName}`
          }
          placeholder="Select Option"
          externalParams={{
            meta: false,
            id: productId,
          }}
        />
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
              {sharedWithFields?.map((item: any, index: number) => {
                return (
                  <TableRow key={item?.id}>
                    {specificUsersAccessFormFieldsDynamic?.(
                      'sharedWithPermissions',
                      index,
                    )?.map(
                      (
                        singleField:
                          | SpecificUsersAccessFormFieldsDynamicI
                          | any,
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
    ),
  },
  {
    id: 7657,
    componentProps: {
      name: 'addToDashboard',
      label: 'Add this report to a dashboard',
      required: true,
      options: addToDashboardArray,
    },
    component: RHFRadioGroup,
    conditionalComponentTree: (
      <RHFAutocompleteAsync
        size="small"
        name="addToExistingCondition"
        label="Select Dashboard"
        required={true}
        multiple={true}
        apiQuery={dashboardDropdown}
        getOptionLabel={(option: any) => option?.name}
        placeholder="Select Option"
        externalParams={{
          productId: id,
        }}
      />
    ),
    conditionalComponentFour: (
      <>
        <RHFTextField
          name="addToNewConditionOne"
          label="Dashboard Name"
          placeholder="Enter Dashboard Name"
          size="small"
          type="text"
          required={true}
        />
        <RHFRadioGroup
          name="addToNewConditionTwo"
          size="small"
          options={sharedWithArray}
        />
      </>
    ),
    conditionalComponentFive: (
      <RHFRadioGroup
        name="newDashboardEveryoneCondition"
        size="small"
        row={false}
        options={sharedWithOptionsArray}
      />
    ),
    conditionalComponentSix: (
      <>
        <RHFAutocompleteAsync
          size="small"
          name="newDashboardSpecificUsersConditionOne"
          label="Select user"
          multiple={true}
          required={true}
          apiQuery={usersDropdown}
          getOptionLabel={(option: UsersDropdownOptionsI) =>
            `${option?.firstName} ${option?.lastName}`
          }
          placeholder="Select Option"
          externalParams={{
            meta: false,
            id: productId,
          }}
        />
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
              {newDashboardFields?.map((item: any, index: number) => {
                return (
                  <TableRow key={item?.id}>
                    {specificUsersAccessFormFieldsDynamic?.(
                      'newDashboardPermissions',
                      index,
                    )?.map(
                      (
                        singleField:
                          | SpecificUsersAccessFormFieldsDynamicI
                          | any,
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
    ),
  },
  {
    id: 4785,
    componentProps: {
      name: 'addFilter',
      label: 'Add Date Range Filter in Complete Report',
      icon: <CheckboxIcon />,
      checkedIcon: <CheckboxCheckedIcon />,
    },
    component: RHFCheckbox,
  },
];

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
    id: 1,
    data: <RHFTextField name={`${name}.${index}.name`} size="small" disabled />,
  },
  {
    id: 2,
    align: 'center',
    data: (
      <RHFRadioGroup
        name={`${name}.${index}.permission`}
        size="small"
        options={[
          {
            value: REPORT_TYPE?.VIEW_AND_EDIT,
          },
        ]}
      />
    ),
  },
  {
    id: 3,
    align: 'center',
    data: (
      <RHFRadioGroup
        name={`${name}.${index}.permission`}
        size="small"
        options={[
          {
            value: REPORT_TYPE?.VIEW_ONLY,
          },
        ]}
      />
    ),
  },
];
