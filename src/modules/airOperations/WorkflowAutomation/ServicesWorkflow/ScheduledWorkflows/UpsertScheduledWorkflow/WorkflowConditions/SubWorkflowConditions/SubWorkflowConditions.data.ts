import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { SCHEMA_KEYS } from '@/constants/strings';

export const assetsFieldsOption = [
  'name',
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
  'title',
  'description',
  'assignTo',
  'status',
  'notifyBefore',
  'plannedStartDate',
  'plannedEndDate',
  'plannedEffort',
  'department',
];

export const ticketsFields = [
  'department',
  'ticketType',
  'addRequester',
  'subject',
  'source',
  'impacts',
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
export const priority = ['HIGH', 'MEDIUM', 'LOW', 'URGENT'];
export const impactOptions = ['HIGH', 'MEDIUM', 'LOW'];
export const status = ['OPEN', 'CLOSED', 'RESOLVED', 'PENDING', 'SPAMS'];

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
export const assetsOptions = [
  'Inventory',
  'Contracts',
  'Purchase Orders',
  'Software',
];
export const typeOptions = ['INC', 'SR'];
export const sourcesOptions = ['PHONE', 'EMAIL', 'PORTAL', 'CHAT'];

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

const constantApiOptions = {
  agent: 'agent',
  requester: 'addRequester',
  department: 'selectDepartment',
  location: 'location',
};

const optionsConstants = {
  priority: 'priority',
  impacts: 'impacts',
  assetType: 'assetType',
  source: 'source',
  type: 'ticketType',
  plannedStartDate: 'plannedStartDate',
  plannedEndDate: 'plannedEndDate',
  dateOfJoining: 'dateOfJoining',
  endOFLife: 'endOFLife',
  assignedOn: 'assignedOn',
  subject: 'subject',
  description: 'description',
  title: 'title',
  plannedEffort: 'plannedEffort',
  name: 'name',
  email: 'email',
  phoneNumber: 'phoneNumber',
  jobTitle: 'jobTitle',
  fullName: 'fullName',
};

export const subWorkflowData = ({
  index,
  subIndex,
  watch,
  agentApiQuery,
  departmentApiQuery,
  requestersApiQuery,
  apiQueryLocations,
}: any) => {
  const useApiQuery = (operatorsOption: string) => {
    if (operatorsOption === constantApiOptions?.agent) {
      return agentApiQuery;
    } else if (operatorsOption === constantApiOptions?.requester) {
      return requestersApiQuery;
    } else if (operatorsOption === constantApiOptions?.department) {
      return departmentApiQuery;
    } else if (operatorsOption === constantApiOptions?.location) {
      return apiQueryLocations;
    }
    return null;
  };
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

  let singleOperatorsOptions = [];
  const apiQuery = useApiQuery(operatorsOption);
  const valuesOptions =
    operatorsOption === optionsConstants?.priority
      ? priority
      : operatorsOption === optionsConstants?.assetType
        ? assetsOptions
        : operatorsOption === optionsConstants?.source
          ? sourcesOptions
          : operatorsOption === optionsConstants?.type
            ? typeOptions
            : operatorsOption === optionsConstants?.impacts
              ? impactOptions
              : status;
  if (
    [
      optionsConstants?.plannedStartDate,
      optionsConstants?.plannedEndDate,
      optionsConstants?.dateOfJoining,
      optionsConstants?.endOFLife,
      optionsConstants?.assignedOn,
    ]?.includes(operatorsOption)
  ) {
    singleOperatorsOptions = dateOperators;
  } else if (
    [
      optionsConstants?.subject,
      optionsConstants?.description,
      optionsConstants?.title,
      optionsConstants?.plannedEffort,
      optionsConstants?.name,
      optionsConstants?.email,
      optionsConstants?.phoneNumber,
      optionsConstants?.jobTitle,
      optionsConstants?.fullName,
    ]?.includes(operatorsOption)
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
      optionsConstants?.email,
      optionsConstants?.phoneNumber,
      optionsConstants?.jobTitle,
      optionsConstants?.fullName,
    ]?.includes(operatorsOption)
  ) {
    valueComponent = {
      _id: 5,
      gridLength: 3,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.fieldValue`,
        size: 'small',
        placeholder: 'Enter Text',
      },
      component: RHFTextField,
    };
  } else if (
    operatorsOption === constantApiOptions?.agent ||
    operatorsOption === constantApiOptions?.requester ||
    operatorsOption === constantApiOptions?.location
  ) {
    valueComponent = {
      _id: 6,
      gridLength: 3,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.fieldValue`,
        size: 'small',
        placeholder: 'Select',
        apiQuery: apiQuery,
        getOptionLabel:
          operatorsOption === constantApiOptions?.location
            ? (option: any) => option?.locationName
            : (option: any) => `${option?.firstName} ${option?.lastName}`,
      },
      component: RHFAutocompleteAsync,
    };
  } else if (operatorsOption === constantApiOptions?.department) {
    valueComponent = {
      _id: 6,
      gridLength: 3,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.fieldValue`,
        size: 'small',
        placeholder: 'Select',
        apiQuery: apiQuery,
      },
      component: RHFAutocompleteAsync,
    };
  } else if (
    [
      optionsConstants?.plannedStartDate,
      optionsConstants?.plannedEndDate,
      optionsConstants?.dateOfJoining,
      optionsConstants?.endOFLife,
      optionsConstants?.assignedOn,
    ]?.includes(operatorsOption)
  ) {
    valueComponent = {
      _id: 4,
      componentProps: {
        fullWidth: true,
        name: `groups.${index}.conditions.${subIndex}.fieldValue`,
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
