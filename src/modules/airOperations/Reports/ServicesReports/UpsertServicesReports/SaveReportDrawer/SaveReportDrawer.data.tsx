import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { REPORT_TYPE } from '@/constants/strings';
import * as Yup from 'yup';

export const reportsValidationSchema = (reportValidation: any) =>
  Yup?.object()?.shape({
    reportName: Yup?.string()?.required('Report Name is Required'),
    sharedWith: Yup?.string()?.required('Shared with is Required'),
    addToDashboard: Yup?.string()?.required('Add to dashboard is Required'),
    everyoneCondition: Yup?.string()?.when(() =>
      reportValidation?.selectSharedWith === REPORT_TYPE?.EVERYONE
        ? Yup?.string()?.required('Shared with everyone conditions is required')
        : Yup?.string()?.notRequired(),
    ),
    specificUsersConditionOne: Yup?.string()?.when(() =>
      reportValidation?.selectSharedWith === REPORT_TYPE?.SPECIFIC_USERS
        ? Yup?.string()?.required('Specific user is required')
        : Yup?.string()?.notRequired(),
    ),
    specificUsersConditionTwo: Yup?.string()?.when(() =>
      reportValidation?.selectSharedWith === REPORT_TYPE?.SPECIFIC_USERS
        ? Yup?.string()?.required('Shared with Specific user is required')
        : Yup?.string()?.notRequired(),
    ),
    addToExistingCondition: Yup?.string()?.when(() =>
      reportValidation?.selectAddToDashboard === REPORT_TYPE?.ADD_TO_EXISTING
        ? Yup?.string()?.required('Add to existing dashboard is required')
        : Yup?.string()?.notRequired(),
    ),
    addToNewConditionOne: Yup?.string()?.when(() =>
      reportValidation?.selectAddToDashboard === REPORT_TYPE?.ADD_TO_NEW
        ? Yup?.string()?.required('Add to new dashboard is required')
        : Yup?.string()?.notRequired(),
    ),
    addToNewConditionTwo: Yup?.string()?.when(() =>
      reportValidation?.selectAddToDashboard === REPORT_TYPE?.ADD_TO_NEW
        ? Yup?.string()?.required('Add to new dashboard is required')
        : Yup?.string()?.notRequired(),
    ),
  });

export const reportsDefaultValues = {
  reportName: '',
  sharedWith: '',
  addToDashboard: '',
  addToExistingCondition: '',
  everyoneCondition: '',
  specificUsersConditionOne: '',
  specificUsersConditionTwo: '',
  addFilter: false,
};

export const reportsDataArray = [
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
      options: [
        { value: 'private', label: 'Private' },
        { value: 'everyone', label: 'Everyone' },
        { value: 'specificUsers', label: 'Specific Users' },
      ],
    },
    component: RHFRadioGroup,
    conditionalComponentOne: (
      <RHFRadioGroup
        name="everyoneCondition"
        size="small"
        row={false}
        options={[
          { value: 'viewEdit', label: 'View and Edit' },
          { value: 'viewOnly', label: 'View Only' },
        ]}
      />
    ),
    conditionalComponentTwo: (
      <>
        <RHFAutocomplete
          name="specificUsersConditionOne"
          label="Select user"
          size="small"
          type="text"
          options={[
            'njones@outlook.com',
            'htaylor@gmail.com',
            'emitchell@outlook.com',
            'jwilson@yahoo.com',
          ]}
        />
        <RHFRadioGroup
          name="specificUsersConditionTwo"
          size="small"
          row={false}
          options={[
            { value: 'viewEdit', label: 'View and Edit' },
            { value: 'viewOnly', label: 'View Only' },
          ]}
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
      options: [
        { value: 'doNotAdd', label: 'Do not add to a dashboard' },
        { value: 'addToNew', label: 'Add to new dashboard' },
        { value: 'addToExisting', label: 'Add to existing dashboard' },
      ],
    },
    component: RHFRadioGroup,
    conditionalComponentTree: (
      <RHFAutocomplete
        name="addToExistingCondition"
        label="Select Dashboard"
        size="small"
        type="text"
        options={['Test1', 'Test2', 'Test3']}
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
          options={['Test1', 'Test2', 'Test3']}
        />
        <RHFRadioGroup
          name="addToNewConditionTwo"
          size="small"
          row={false}
          options={[
            { value: 'privateToOwner', label: 'Private To Owner' },
            { value: 'SpecificUser', label: 'Only specific User and teams' },
            { value: 'everyone', label: 'Everyone' },
          ]}
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
