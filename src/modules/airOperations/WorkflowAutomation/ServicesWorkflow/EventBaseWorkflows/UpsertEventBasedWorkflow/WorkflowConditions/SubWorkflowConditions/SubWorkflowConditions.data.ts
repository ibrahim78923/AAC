import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';

export const assetsFieldsOption = [
  'Name',
  'Asset Type',
  'Location',
  'Used By',
  'Department',
  'Managed By',
  'Impact',
  'End of Life',
  'Created By',
  'Assigned On',
  'Description',
];
export const taskFieldsOption = [
  'Title',
  'Description',
  'Departments',
  'Assign To',
  'Status',
  'Notify Before',
  'Planned Start Date and time',
  'Planned End Date and time',
  'Planned Effort',
  'Select Department',
];
export const ticketsFields = [
  'Select Department',
  'Type',
  'Add Requester',
  'Subject',
  'Source',
  'Status',
  'Priority',
  'Agent',
  'Description',
  'Planned Start Date and Time',
  'Planned End Date and Time',
  'Planned Effort',
];
export const requesterFieldOptions = [
  'Email',
  'Full Name',
  'Job Title',
  'Phone Number',
  'Date of Joining',
];
export const requestedForFieldOptions = [
  'Email',
  'Full Name',
  'Job Title',
  'Phone Number',
  'Date of Joining',
];
export const statusOptions = ['open', 'pending', 'resolved', 'close'];
export const fieldOptions = [
  'is',
  'is not',
  'equal',
  'not equal',
  'contains',
  'not contains',
  'contains words',
  'not contains words',
  'starts with',
  'ends with',
  'is empty',
  'is not empty',
  'included',
  'not include',
];

export const commonOperators = ['is', 'is not', 'included', 'not include'];
export const dateOperators = [
  'is',
  'is not',
  'is empty',
  'is not empty',
  'Greater than',
  'Less than',
  'Greater than or equal to',
  'Less than or equal to',
];

export const subWorkflowData = (index: any, subIndex: any, watch: any) => {
  const moduleSelectedOption = watch('module');
  const taskModule: any = {
    'Task Fields': taskFieldsOption,
    'Ticket Fields': ticketsFields,
  };
  const assetsModule: any = {
    'Assets Fields': assetsFieldsOption,
  };
  const ticketsModule: any = {
    'Ticket Fields': ticketsFields,
    'Requester Fields': requesterFieldOptions,
    'Requested for Fields': requestedForFieldOptions,
  };
  const modulesOptions =
    moduleSelectedOption === 'ASSETS'
      ? assetsModule || []
      : moduleSelectedOption === 'TICKETS'
        ? ticketsModule || []
        : taskModule || [];
  const selectedOption = watch('options');
  const dropdownOptions = modulesOptions[selectedOption] || [];

  const operatorsOption = watch(`groups.${index}.conditions.${subIndex}.key`);
  let singleOperatorsOptions = [];

  if (
    [
      'Planned Start Date and Time',
      'Planned End Date and Time',
      'Planned Effort',
      'Date of Joining',
      'End of life',
      'Assigned On',
    ].includes(operatorsOption)
  ) {
    singleOperatorsOptions = dateOperators;
  } else if (
    ['Subject', 'Description', 'Title', 'Planned Effort', 'Name'].includes(
      operatorsOption,
    )
  ) {
    singleOperatorsOptions = fieldOptions;
  } else {
    singleOperatorsOptions = commonOperators;
  }
  let valueComponent;
  if (
    [
      'Planned Start Date and Time',
      'Planned End Date and Time',
      'Date of Joining',
      'End of life',
      'Assigned On',
    ].includes(operatorsOption)
  ) {
    valueComponent = {
      _id: 4,
      componentProps: {
        fullWidth: true,
        name: `groups.${index}.conditions.${subIndex}.value`,
        size: 'small',
      },
      gridLength: 3,
      component: RHFDatePicker,
    };
  } else if (
    [
      'Subject',
      'Description',
      'Title',
      'Planned Effort',
      'Name',
      'Planned Effort',
    ].includes(operatorsOption)
  ) {
    valueComponent = {
      _id: 5,
      gridLength: 3,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.value`,
        size: 'small',
        placeholder: 'Enter Text',
      },
      component: RHFTextField,
    };
  } else {
    valueComponent = {
      _id: 6,
      gridLength: 3,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.value`,
        size: 'small',
        placeholder: 'Select',
        options: statusOptions,
      },
      component: RHFAutocomplete,
    };
  }

  return [
    {
      _id: 1,
      gridLength: 3,
      componentProps: {
        name: `options`,
        size: 'small',
        placeholder: 'Select',
        options: Object.keys(modulesOptions),
      },
      component: RHFAutocomplete,
    },
    {
      _id: 2,
      gridLength: 3,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.key`,
        size: 'small',
        placeholder: 'Select',
        options: dropdownOptions,
      },
      component: RHFAutocomplete,
    },
    {
      _id: 3,
      gridLength: 3,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.condition`,
        size: 'small',
        placeholder: 'Select',
        options: singleOperatorsOptions,
      },
      component: RHFAutocomplete,
    },
    valueComponent,
  ];
};
