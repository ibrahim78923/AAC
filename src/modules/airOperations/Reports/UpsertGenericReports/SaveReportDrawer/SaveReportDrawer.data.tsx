import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import {
  RHFCheckbox,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { BACKEND_REPORT_ACCESS } from '@/constants/api';
import * as Yup from 'yup';
import {
  SpecialUsersFieldsI,
  SpecificUsersAccessColumnsI,
  SpecificUsersAccessFormFieldsDynamicI,
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
import { GLOBAL_CHARACTERS_LIMIT } from '@/constants/validation';
import { UsersListDropdown } from './ReportFormFields/UsersListDropdown';
import { ExistingDashboardListDropdown } from './ReportFormFields/ExistingDashboardListDropdown';

const sharedWithOptionsArray = [
  { value: BACKEND_REPORT_ACCESS?.VIEW_AND_EDIT, label: 'View and Edit' },
  { value: BACKEND_REPORT_ACCESS?.VIEW_ONLY, label: 'View Only' },
];
const sharedWithArray = [
  { value: BACKEND_REPORT_ACCESS?.PRIVATE, label: 'Private' },
  { value: BACKEND_REPORT_ACCESS?.EVERYONE, label: 'Everyone' },
  { value: BACKEND_REPORT_ACCESS?.SPECIFIC_USERS, label: 'Specific Users' },
];
const addToDashboardArray = [
  {
    value: BACKEND_REPORT_ACCESS?.DO_NOT_ADD,
    label: 'Do not add to a dashboard',
  },
  { value: BACKEND_REPORT_ACCESS?.ADD_TO_NEW, label: 'Add to new dashboard' },
  {
    value: BACKEND_REPORT_ACCESS?.ADD_TO_EXISTING,
    label: 'Add to existing dashboard',
  },
];

export const reportsValidationSchema = (reportValidation: any) =>
  Yup?.object()?.shape({
    reportName: Yup?.string()
      ?.trim()
      ?.required('Report name is required')
      ?.max(
        GLOBAL_CHARACTERS_LIMIT?.DEFAULT,
        `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.DEFAULT}`,
      ),
    sharedWith: Yup?.string()?.nullable()?.required('Shared with is required'),
    addToDashboard: Yup?.string()
      ?.nullable()
      ?.required('Add to dashboard is required'),
    everyoneCondition: Yup?.string()?.when(() =>
      reportValidation?.selectSharedWith === BACKEND_REPORT_ACCESS?.EVERYONE
        ? Yup?.string()?.nullable()?.required('Everyone condition is required')
        : Yup?.string()?.notRequired(),
    ),
    specificUsersConditionOne: Yup?.array()?.when(() =>
      reportValidation?.selectSharedWith ===
      BACKEND_REPORT_ACCESS?.SPECIFIC_USERS
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
        is: (value: any) => value === BACKEND_REPORT_ACCESS?.SPECIFIC_USERS,
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
      reportValidation?.selectAddToDashboard ===
      BACKEND_REPORT_ACCESS?.ADD_TO_EXISTING
        ? Yup?.array()?.min(1, 'At least one dashboard is required')
        : Yup?.array()?.notRequired(),
    ),
    addToNewConditionOne: Yup?.string()?.when(() =>
      reportValidation?.selectAddToDashboard ===
      BACKEND_REPORT_ACCESS?.ADD_TO_NEW
        ? Yup?.string()
            ?.trim()
            ?.required('Dashboard name is required')
            ?.max(
              GLOBAL_CHARACTERS_LIMIT?.DEFAULT,
              `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.DEFAULT}`,
            )
        : Yup?.string()?.notRequired(),
    ),
    addToNewConditionTwo: Yup?.string()?.when(() =>
      reportValidation?.selectAddToDashboard ===
      BACKEND_REPORT_ACCESS?.ADD_TO_NEW
        ? Yup?.string()?.nullable()?.required('Shared with is required')
        : Yup?.string()?.notRequired(),
    ),
    newDashboardEveryoneCondition: Yup?.string()?.when(() =>
      reportValidation?.selectAddToNewDashboard ===
      BACKEND_REPORT_ACCESS?.EVERYONE
        ? Yup?.string()?.nullable()?.required('Everyone condition is required')
        : Yup?.string()?.notRequired(),
    ),
    newDashboardSpecificUsersConditionOne: Yup?.array()?.when(() =>
      reportValidation?.selectAddToNewDashboard ===
      BACKEND_REPORT_ACCESS?.SPECIFIC_USERS
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
        is: (value: any) => value === BACKEND_REPORT_ACCESS?.SPECIFIC_USERS,
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
  newDashboardFields: SpecialUsersFieldsI[],
  sharedWithFields: SpecialUsersFieldsI[],
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
        <UsersListDropdown name={'specificUsersConditionOne'} />
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
    conditionalComponentTree: <ExistingDashboardListDropdown />,
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
        <UsersListDropdown name={'newDashboardSpecificUsersConditionOne'} />
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
            value: BACKEND_REPORT_ACCESS?.VIEW_AND_EDIT,
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
            value: BACKEND_REPORT_ACCESS?.VIEW_ONLY,
          },
        ]}
      />
    ),
  },
];
