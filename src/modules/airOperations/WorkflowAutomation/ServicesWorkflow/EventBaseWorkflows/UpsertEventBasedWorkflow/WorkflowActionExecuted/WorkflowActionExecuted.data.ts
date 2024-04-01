import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';

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

const optionsConstant = {
  agent: 'Assign to Agent',
  department: 'Set Department as',
  category: 'Set Category as',
  priority: 'Set Category as',
  impact: 'Set Impact as',
  source: 'Set Source as',
  type: 'Set Type as',
  task: 'Add Task',
  tag: 'Add Tag',
  agentEmail: 'Send Email to Agent',
  requesterEmail: 'Send Email to Requester',
  date: 'Set Due Date as',
};
export const actionsData = ({
  index,
  watch,
  agentApiQuery,
  departmentApiQuery,
  apiQueryCategories,
}: any) => {
  const selectedOptionsKey = watch(`actions.${index}.fieldName`);
  const useApiQuery = (selectedOptionsKey: string) => {
    if (selectedOptionsKey === optionsConstant?.agent) {
      return agentApiQuery;
    } else if (selectedOptionsKey === optionsConstant?.department) {
      return departmentApiQuery;
    } else if (selectedOptionsKey === optionsConstant?.category) {
      return apiQueryCategories;
    }
    return null;
  };

  const valuesOptions =
    selectedOptionsKey === optionsConstant?.priority ||
    selectedOptionsKey === optionsConstant?.impact
      ? priority
      : selectedOptionsKey === optionsConstant?.source
        ? sourcesOptions
        : selectedOptionsKey === optionsConstant?.type
          ? typeOptions
          : statusOptions;
  let valueComponent;
  const apiQuery = useApiQuery(selectedOptionsKey);
  if (
    [
      optionsConstant?.task,
      optionsConstant?.tag,
      optionsConstant?.agentEmail,
      optionsConstant?.requesterEmail,
    ]?.includes(selectedOptionsKey)
  ) {
    valueComponent = {
      _id: 5,
      gridLength: 3,
      componentProps: {
        name: `actions.${index}.fieldValue`,
        size: 'small',
        placeholder: 'Enter Text',
      },
      component: RHFTextField,
    };
  } else if (
    selectedOptionsKey === optionsConstant?.agent ||
    selectedOptionsKey === optionsConstant?.category
  ) {
    valueComponent = {
      _id: 6,
      gridLength: 3,
      componentProps: {
        name: `actions.${index}.fieldValue`,
        size: 'small',
        placeholder: 'Select',
        apiQuery: apiQuery,
        getOptionLabel:
          selectedOptionsKey === optionsConstant?.agent
            ? (option: any) => `${option?.firstName} ${option?.lastName}`
            : (option: any) => option?.categoryName,
      },
      component: RHFAutocompleteAsync,
    };
  } else if (selectedOptionsKey === optionsConstant?.department) {
    valueComponent = {
      _id: 6,
      gridLength: 3,
      componentProps: {
        name: `actions.${index}.fieldValue`,
        size: 'small',
        placeholder: 'Select',
        apiQuery: apiQuery,
      },
      component: RHFAutocompleteAsync,
    };
  } else if ([optionsConstant?.date]?.includes(selectedOptionsKey)) {
    valueComponent = {
      _id: 4,
      componentProps: {
        fullWidth: true,
        name: `actions.${index}.fieldValue`,
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
        name: `actions.${index}.fieldValue`,
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
        name: `actions.${index}.fieldName`,
        size: 'small',
        placeholder: 'Select',
        options: actionsOptions,
      },
      component: RHFAutocomplete,
    },
    valueComponent,
  ];
};
