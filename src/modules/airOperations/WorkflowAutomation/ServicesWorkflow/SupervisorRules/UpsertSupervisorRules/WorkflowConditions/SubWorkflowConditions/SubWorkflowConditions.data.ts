import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { SCHEMA_KEYS } from '@/constants/strings';

export const ticketsFields = [
  'selectDepartment',
  'type',
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

export const priority = ['HIGH', 'MEDIUM', 'LOW'];
export const status = ['ACTIVE', 'INACTIVE'];

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

export const subWorkflowData = ({
  index,
  subIndex,
  watch,
  agentApiQuery,
  departmentApiQuery,
}: any) => {
  const useApiQuery = (operatorsOption: string) => {
    if (operatorsOption === 'agent') {
      return agentApiQuery;
    } else if (operatorsOption === 'selectDepartment') {
      return departmentApiQuery;
    }
    return null;
  };
  const moduleSelectedOption = watch('module');
  const ticketsModule: any = {
    'Ticket Fields': ticketsFields,
  };
  const modulesOptions =
    moduleSelectedOption === SCHEMA_KEYS?.TICKETS ? ticketsModule || [] : [];
  const selectedOption = watch('options');
  const moduleListOptions = modulesOptions[selectedOption] || [];
  const operatorsOption = watch(`groups.${index}.conditions.${subIndex}.key`);
  // useEffect(() => {
  //   setValue(`groups.${index}.conditions.${subIndex}.condition`, ''),
  //     setValue(`groups.${index}.conditions.${subIndex}.value`, null);
  // }, [operatorsOption, setValue]);
  let singleOperatorsOptions = [];
  const apiQuery = useApiQuery(operatorsOption);
  const valuesOptions =
    operatorsOption === 'priority' || operatorsOption === 'impacts'
      ? priority
      : operatorsOption === 'assetType'
        ? assetsOptions
        : operatorsOption === 'source'
          ? sourcesOptions
          : operatorsOption === 'type'
            ? typeOptions
            : status;
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
    [
      'subject',
      'description',
      'title',
      'plannedEffort',
      'name',
      'email',
      'phoneNumber',
      'jobTitle',
      'fullName',
    ].includes(operatorsOption)
  ) {
    singleOperatorsOptions = fieldOptions;
  } else {
    singleOperatorsOptions = commonOperators;
  }
  let valueComponent;
  if (
    [
      'subject',
      'description',
      'title',
      'plannedEffort',
      'name',
      'email',
      'phoneNumber',
      'jobTitle',
      'fullName',
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
  } else if (
    operatorsOption === 'agent' ||
    operatorsOption === 'addRequester' ||
    operatorsOption === 'location'
  ) {
    valueComponent = {
      _id: 6,
      gridLength: 3,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.value`,
        size: 'small',
        placeholder: 'Select',
        apiQuery: apiQuery,
        getOptionLabel:
          operatorsOption === 'location'
            ? (option: any) => option?.locationName
            : (option: any) => `${option?.firstName} ${option?.lastName}`,
      },
      component: RHFAutocompleteAsync,
    };
  } else if (operatorsOption === 'selectDepartment') {
    valueComponent = {
      _id: 6,
      gridLength: 3,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.value`,
        size: 'small',
        placeholder: 'Select',
        apiQuery: apiQuery,
      },
      component: RHFAutocompleteAsync,
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
      _id: 9,
      gridLength: 3,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.value`,
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
