import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ROLES, SCHEMA_KEYS } from '@/constants/strings';

export const assetsFieldsOption = [
  { value: 'displayName', label: 'Name' },
  { value: 'assetType', label: 'Asset Type' },
  { value: 'location', label: 'Location' },
  { value: 'usedBy', label: 'Used By' },
  { value: 'departmentId', label: 'Department' },
  { value: 'impact', label: 'Impact' },
  { value: 'assignedOn', label: 'Assigned On' },
  { value: 'createdBy', label: 'Created By' },
  { value: 'description', label: 'Description' },
];

export const taskFieldsOption = [
  { value: 'title', label: 'Title' },
  { value: 'description', label: 'Description' },
  { value: 'assignTo', label: 'Assign To' },
  { value: 'status', label: 'Status' },
  { value: 'notifyBefore', label: 'Notify Before' },
  { value: 'startDate', label: 'Planned Start Date' },
  { value: 'endDate', label: 'Planned End Date' },
  { value: 'plannedEffort', label: 'Planned Effort' },
  { value: 'departmentId', label: 'Department' },
];

export const ticketsFields = [
  { value: 'department', label: 'Select Department' },
  { value: 'ticketType', label: 'Type' },
  { value: 'requester', label: 'Add Requester' },
  { value: 'subject', label: 'Subject' },
  { value: 'source', label: 'Source' },
  { value: 'impact', label: 'Impact' },
  { value: 'status', label: 'Status' },
  { value: 'pirority', label: 'Priority' },
  { value: 'description', label: 'Description' },
  { value: 'agent', label: 'Agent' },
  { value: 'plannedStartDate', label: 'Planned Start Date' },
  { value: 'plannedEndDate', label: 'Planned End Date' },
  { value: 'plannedEffort', label: 'Planned Effort' },
];

export const priority = ['HIGH', 'MEDIUM', 'LOW', 'URGENT'];
export const impactOptions = ['HIGH', 'MEDIUM', 'LOW'];
export const status = ['OPEN', 'CLOSED', 'RESOLVED', 'PENDING', 'SPAMS'];

export const fieldOptions = [
  'is',
  'is not',
  'equals',
  'not equals',
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
export const assetsOptions = [
  'Inventory',
  'Contracts',
  'Purchase Orders',
  'Software',
];
export const typeOptions = ['INC', 'SR'];
export const sourcesOptions = ['PHONE', 'EMAIL', 'PORTAL', 'CHAT'];

export const commonOperators = [
  'is',
  'is not',
  'included',
  'not include',
  'is empty',
  'is not empty',
];
export const dateOperators = [
  'is',
  'is not',
  'is empty',
  'is not empty',
  'greater than',
  'less than',
  'greater than or equal to',
  'less than or equal to',
];

const constantApiOptions = {
  agent: 'Agent',
  requester: 'Add Requester',
  department: 'Select Department',
  assetDepartment: 'Department',
  location: 'Location',
  assetType: 'Asset Type',
  createdBy: 'Created By',
  assignTo: 'Assign To',
  usedBy: 'Used By',
};

export const optionsConstants = {
  priority: 'Priority',
  impacts: 'Impact',
  source: 'Source',
  description: 'Description',
  type: 'Type',
  plannedStartDate: 'Planned Start Date',
  plannedEndDate: 'Planned End Date',
  plannedEffort: 'Planned Effort',
  subject: 'Subject',
  title: 'Title',
  assignedOn: 'Assigned On',
  name: 'Name',
  isEmpty: 'is empty',
  isNotEmpty: 'is not empty',
};

export const subWorkflowData = ({
  index,
  subIndex,
  watch,
  agentApiQuery,
  departmentApiQuery,
  requestersApiQuery,
  apiQueryLocations,
  apiAssetType,
  apiUsersListDropdown,
}: any) => {
  const fieldValueDisable = watch(
    `groups.${index}.conditions.${subIndex}.condition`,
  );
  const disableField =
    fieldValueDisable === optionsConstants?.isEmpty ||
    fieldValueDisable === optionsConstants?.isNotEmpty;
  const useApiQuery = (operatorsOption: string) => {
    if (operatorsOption === constantApiOptions?.agent) {
      return agentApiQuery;
    } else if (operatorsOption === constantApiOptions?.requester) {
      return requestersApiQuery;
    } else if (
      operatorsOption === constantApiOptions?.department ||
      operatorsOption === constantApiOptions?.assetDepartment
    ) {
      return departmentApiQuery;
    } else if (operatorsOption === constantApiOptions?.location) {
      return apiQueryLocations;
    } else if (operatorsOption === constantApiOptions?.assetType) {
      return apiAssetType;
    } else if (
      operatorsOption === constantApiOptions?.assignTo ||
      operatorsOption === constantApiOptions?.usedBy ||
      operatorsOption === constantApiOptions?.createdBy
    ) {
      return apiUsersListDropdown;
    }
    return null;
  };
  const moduleSelectedOption = watch('module');
  const taskModule: any = {
    'Task Fields': taskFieldsOption,
  };
  const assetsModule: any = {
    'Assets Fields': assetsFieldsOption,
  };
  const ticketsModule: any = {
    'Ticket Fields': ticketsFields,
  };
  const modulesOptions =
    moduleSelectedOption === SCHEMA_KEYS?.ASSETS
      ? assetsModule || []
      : moduleSelectedOption === SCHEMA_KEYS?.TICKETS
        ? ticketsModule || []
        : taskModule || [];
  const selectedOption = watch(
    `groups.${index}.conditions.${subIndex}.options`,
  );
  const moduleListOptions = modulesOptions[selectedOption] || [];
  const operatorsOption = watch(
    `groups.${index}.conditions.${subIndex}.fieldName`,
  );
  const selectedOperatorsOptions = operatorsOption?.label;

  let singleOperatorsOptions = [];
  const apiQuery = useApiQuery(selectedOperatorsOptions);
  const valuesOptions =
    selectedOperatorsOptions === optionsConstants?.priority
      ? priority
      : selectedOperatorsOptions === optionsConstants?.source
        ? sourcesOptions
        : selectedOperatorsOptions === optionsConstants?.type
          ? typeOptions
          : selectedOperatorsOptions === optionsConstants?.impacts
            ? impactOptions
            : status;
  if (
    [
      optionsConstants?.plannedStartDate,
      optionsConstants?.plannedEndDate,
      optionsConstants?.assignedOn,
    ]?.includes(selectedOperatorsOptions)
  ) {
    singleOperatorsOptions = dateOperators;
  } else if (
    [
      optionsConstants?.subject,
      optionsConstants?.description,
      optionsConstants?.title,
      optionsConstants?.plannedEffort,
      optionsConstants?.name,
    ]?.includes(selectedOperatorsOptions)
  ) {
    singleOperatorsOptions = fieldOptions;
  } else {
    singleOperatorsOptions = commonOperators;
  }
  let valueComponent;
  if (
    [
      optionsConstants?.subject,
      optionsConstants?.description,
      optionsConstants?.title,
      optionsConstants?.plannedEffort,
      optionsConstants?.name,
    ]?.includes(selectedOperatorsOptions)
  ) {
    valueComponent = {
      _id: 5,
      gridLength: 3,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.fieldValue`,
        size: 'small',
        disabled: disableField,
        placeholder: 'Enter Text',
      },
      component: RHFTextField,
    };
  } else if (
    selectedOperatorsOptions === constantApiOptions?.agent ||
    selectedOperatorsOptions === constantApiOptions?.location ||
    selectedOperatorsOptions === constantApiOptions?.assignTo ||
    selectedOperatorsOptions === constantApiOptions?.usedBy ||
    selectedOperatorsOptions === constantApiOptions?.createdBy
  ) {
    valueComponent = {
      _id: 6,
      gridLength: 3,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.fieldValue`,
        size: 'small',
        placeholder: 'Select',
        apiQuery: apiQuery,
        disabled: disableField,
        getOptionLabel:
          selectedOperatorsOptions === constantApiOptions?.location
            ? (option: any) => option?.locationName
            : (option: any) => `${option?.firstName} ${option?.lastName}`,
      },
      component: RHFAutocompleteAsync,
    };
  } else if (selectedOperatorsOptions === constantApiOptions?.department) {
    valueComponent = {
      _id: 10,
      gridLength: 3,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.fieldValue`,
        size: 'small',
        placeholder: 'Select',
        disabled: disableField,
        apiQuery: apiQuery,
      },
      component: RHFAutocompleteAsync,
    };
  } else if (selectedOperatorsOptions === constantApiOptions?.assetType) {
    valueComponent = {
      _id: 7,
      gridLength: 3,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.fieldValue`,
        size: 'small',
        placeholder: 'Select',
        apiQuery: apiQuery,
        disabled: disableField,
        externalParams: { meta: false, limit: 50 },
      },
      component: RHFAutocompleteAsync,
    };
  } else if (selectedOperatorsOptions === constantApiOptions?.requester) {
    valueComponent = {
      _id: 8,
      gridLength: 3,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.fieldValue`,
        size: 'small',
        placeholder: 'Select',
        apiQuery: apiQuery,
        disabled: disableField,
        externalParams: { limit: 50, role: ROLES?.ORG_REQUESTER },
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
      },
      component: RHFAutocompleteAsync,
    };
  } else if (
    [
      optionsConstants?.plannedStartDate,
      optionsConstants?.plannedEndDate,
      optionsConstants?.assignedOn,
    ]?.includes(selectedOperatorsOptions)
  ) {
    valueComponent = {
      _id: 4,
      componentProps: {
        fullWidth: true,
        name: `groups.${index}.conditions.${subIndex}.fieldValue`,
        disabled: disableField,
        size: 'small',
      },
      gridLength: 3,
      component: RHFDatePicker,
    };
  } else {
    valueComponent = {
      _id: 9,
      gridLength: 3,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.fieldValue`,
        size: 'small',
        placeholder: 'Select',
        disabled: disableField,
        options: valuesOptions,
      },
      component: RHFAutocomplete,
    };
  }
  return [
    {
      _id: 1,
      gridLength: 3,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.options`,
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
        name: `groups.${index}.conditions.${subIndex}.fieldName`,
        size: 'small',
        placeholder: 'Select',
        options: moduleListOptions,
        getOptionLabel: ({ label }: { label: string }) => label,
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
