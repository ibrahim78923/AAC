import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const reportsValidationSchema: any = Yup?.object()?.shape({
  reportName: Yup?.string()?.required('Report Name is Required'),
  sharedWith: Yup?.string()?.required('shared with is Required'),
  addToDashboard: Yup?.string()?.required('Add to dashboard is Required'),
});
export const reportsDefaultValues = {
  reportName: '',
  addFilter: false,
};

export const reportsDataArray = () => {
  return [
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
        <RHFAutocomplete
          name="specificUsersCondition"
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
      ),
    },
    {
      id: 7657,
      componentProps: {
        name: 'addToDashboard',
        label: 'Add this report to a dashboard',
        row: false,
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
    },
    {
      id: 4785,
      componentProps: {
        name: 'addFilter',
        label: 'Add Date Range Filter in Complete Report',
        size: 'large',
      },
      component: RHFCheckbox,
    },
  ];
};
