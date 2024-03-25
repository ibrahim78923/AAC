import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  useLazyGetCategoriesDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
} from '@/services/airServices/tickets';
import { useLazyGetAgentsQuery } from '@/services/dropdowns';
import { useEffect } from 'react';

const actionsOptions = [
  'Set Priority as',
  'Set Impact as',
  'Set Type as',
  'Set Status as',
  'Set Due Date as',
  'Set Category as',
  'Set Status as',
  'Set Source as',
  'Set Department as',
  'Add Task',
  'Add Tag',
  'Send Email to Agent',
  'Send Email to Requester',
  'Assign to Agent',
];
const statusOptions = ['Open', 'Pending', 'Resolved', 'Closed'];
const priority = ['HIGH', 'MEDIUM', 'LOW', 'URGENT'];
const typeOptions = ['INC', 'SR'];
const sourcesOptions = ['PHONE', 'EMAIL', 'PORTAL', 'CHAT'];

export const actionsData = ({ index, setValue, watch }: any) => {
  const agentApiQuery = useLazyGetAgentsQuery();
  const departmentApiQuery = useLazyGetDepartmentDropdownQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownQuery();

  const selectedOptionsKey = watch(`actions.${index}.key`);
  useEffect(() => {
    setValue(`actions.${index}.value`, null);
  }, [setValue, selectedOptionsKey]);
  const useApiQuery = (selectedOptionsKey: string) => {
    if (selectedOptionsKey === 'Assign to Agent') {
      return agentApiQuery;
    } else if (selectedOptionsKey === 'Set Department as') {
      return departmentApiQuery;
    } else if (selectedOptionsKey === 'Set Category as') {
      return apiQueryCategories;
    }
    return null;
  };
  const apiQuery = useApiQuery(selectedOptionsKey);

  const valuesOptions =
    selectedOptionsKey === 'Set Priority as' ||
    selectedOptionsKey === 'Set Impact as'
      ? priority
      : selectedOptionsKey === 'Set Source as'
        ? sourcesOptions
        : selectedOptionsKey === 'Set Type as'
          ? typeOptions
          : statusOptions;
  let valueComponent;
  if (
    [
      'Add Task',
      'Add Tag',
      'Send Email to Agent',
      'Send Email to Requester',
    ].includes(selectedOptionsKey)
  ) {
    valueComponent = {
      _id: 5,
      gridLength: 3,
      componentProps: {
        name: `actions.${index}.value`,
        size: 'small',
        placeholder: 'Enter Text',
      },
      component: RHFTextField,
    };
  } else if (
    selectedOptionsKey === 'Assign to Agent' ||
    selectedOptionsKey === 'Set Category as'
  ) {
    valueComponent = {
      _id: 6,
      gridLength: 3,
      componentProps: {
        name: `actions.${index}.value`,
        size: 'small',
        placeholder: 'Select',
        apiQuery: apiQuery,
        getOptionLabel:
          selectedOptionsKey === 'Assign to Agent'
            ? (option: any) => `${option?.firstName} ${option?.lastName}`
            : (option: any) => option?.categoryName,
      },
      component: RHFAutocompleteAsync,
    };
  } else if (selectedOptionsKey === 'Set Department as') {
    valueComponent = {
      _id: 6,
      gridLength: 3,
      componentProps: {
        name: `actions.${index}.value`,
        size: 'small',
        placeholder: 'Select',
        apiQuery: apiQuery,
      },
      component: RHFAutocompleteAsync,
    };
  } else if (['Set Due Date as'].includes(selectedOptionsKey)) {
    valueComponent = {
      _id: 4,
      componentProps: {
        fullWidth: true,
        name: `actions.${index}.value`,
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
        name: `actions.${index}.value`,
        size: 'small',
        placeholder: 'Select',
        options: valuesOptions,
      },
      component: RHFAutocomplete,
    };
  }
  return [
    {
      _id: 565,
      gridLength: 3,
      componentProps: {
        name: `actions.${index}.key`,
        size: 'small',
        placeholder: 'Select',
        options: actionsOptions,
      },
      component: RHFAutocomplete,
    },
    valueComponent,
  ];
};
