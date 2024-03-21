import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { SCHEMA_KEYS } from '@/constants/strings';

export const assetsFieldsOption = [
  'Name',
  'assetType',
  'location',
  'usedBy',
  'department',
  'managedBy',
  'impact',
  'endOFLife',
  'createdBy',
  'assignedOn',
  'description',
];

export const taskFieldsOption = [
  'Title',
  'description',
  'departments',
  'assignTo',
  'status',
  'notifyBefore',
  'plannedStartDate',
  'plannedEndDate',
  'plannedEffort',
  'Select Department',
];

export const ticketsFields = [
  'selectDepartment',
  'type',
  'subject',
  'source',
  'status',
  'priority',
  'agent',
  'plannedStartDate',
  'plannedEndDate',
  'plannedEffort',
];

export const requesterFieldOptions = [
  'email',
  'jobTitle',
  'phoneNumber',
  'dateOfJoining',
];

export const requestedForFieldOptions = [
  'email',
  'fullName',
  'jobTitle',
  'phoneNumber',
  'dateOfJoining',
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
    moduleSelectedOption === SCHEMA_KEYS?.ASSETS
      ? assetsModule || []
      : moduleSelectedOption === SCHEMA_KEYS?.TICKETS
        ? ticketsModule || []
        : taskModule || [];
  const selectedOption = watch('options');
  const dropdownOptions = modulesOptions[selectedOption] || [];
  const operatorsOption = watch(`groups.${index}.conditions.${subIndex}.key`);
  let singleOperatorsOptions = [];

  if (
    [
      'plannedStartDate',
      'plannedEndDate',
      'dateOfJoining',
      'endOFLife',
      'assignedOn',
    ].includes(operatorsOption)
  ) {
    singleOperatorsOptions = dateOperators;
  } else if (
    ['subject', 'description', 'title', 'plannedEffort', 'Name'].includes(
      operatorsOption,
    )
  ) {
    singleOperatorsOptions = fieldOptions;
  } else {
    singleOperatorsOptions = commonOperators;
  }
  let valueComponent;
  if (
    ['subject', 'description', 'title', 'plannedEffort', 'Name'].includes(
      operatorsOption,
    )
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
  } else if (
    [
      'plannedStartDate',
      'plannedEndDate',
      'dateOfJoining',
      'endOFLife',
      'assignedOn',
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
