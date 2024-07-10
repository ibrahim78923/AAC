import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { REPORT_TYPE } from '@/constants/strings';
import * as Yup from 'yup';
import { usersDropdownOptionsI } from './SaveReportDrawer.interface';

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
  { value: 'doNotAdd', label: 'Do not add to a dashboard' },
  { value: 'addToNew', label: 'Add to new dashboard' },
  { value: 'addToExisting', label: 'Add to existing dashboard' },
];
const addToDashboardOptionsArray = ['Test1', 'Test2', 'Test3'];

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
        ? Yup?.array()?.nullable()?.required('Required')
        : Yup?.array()?.notRequired(),
    ),
    specificUsersConditionTwo: Yup?.string()?.when(() =>
      reportValidation?.selectSharedWith === REPORT_TYPE?.SPECIFIC_USERS
        ? Yup?.string()?.nullable()?.required('Required')
        : Yup?.string()?.notRequired(),
    ),
    addToExistingCondition: Yup?.string()?.when(() =>
      reportValidation?.selectAddToDashboard === REPORT_TYPE?.ADD_TO_EXISTING
        ? Yup?.string()?.nullable()?.required('Required')
        : Yup?.string()?.notRequired(),
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
        ? Yup?.array()?.nullable()?.required('Required')
        : Yup?.array()?.notRequired(),
    ),
    newDashboardSpecificUsersConditionTwo: Yup?.string()?.when(() =>
      reportValidation?.selectAddToNewDashboard === REPORT_TYPE?.SPECIFIC_USERS
        ? Yup?.string()?.nullable()?.required('Required')
        : Yup?.string()?.notRequired(),
    ),
  });

export const reportsDefaultValues = {
  reportName: '',
  sharedWith: null,
  addToDashboard: null,
  addToExistingCondition: null,
  everyoneCondition: null,
  specificUsersConditionOne: [],
  specificUsersConditionTwo: null,
  addToNewConditionOne: null,
  addToNewConditionTwo: null,
  newDashboardEveryoneCondition: null,
  newDashboardSpecificUsersConditionOne: [],
  newDashboardSpecificUsersConditionTwo: null,
  addFilter: false,
};

export const reportsDataArray = (usersDropdown: any) => [
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
          getOptionLabel={(option: usersDropdownOptionsI) =>
            `${option?.firstName} ${option?.lastName}`
          }
          placeholder="Select Option"
          externalParams={{
            meta: false,
          }}
        />
        <RHFRadioGroup
          name="specificUsersConditionTwo"
          size="small"
          row={false}
          options={sharedWithOptionsArray}
        />
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
      <RHFAutocomplete
        name="addToExistingCondition"
        label="Select Dashboard"
        size="small"
        type="text"
        options={addToDashboardOptionsArray}
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
          getOptionLabel={(option: usersDropdownOptionsI) =>
            `${option?.firstName} ${option?.lastName}`
          }
          placeholder="Select Option"
          externalParams={{
            meta: false,
          }}
        />
        <RHFRadioGroup
          name="newDashboardSpecificUsersConditionTwo"
          size="small"
          row={false}
          options={sharedWithOptionsArray}
        />
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
