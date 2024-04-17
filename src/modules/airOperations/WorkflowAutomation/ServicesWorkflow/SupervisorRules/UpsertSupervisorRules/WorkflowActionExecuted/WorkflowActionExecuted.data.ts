import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { actionsOptions } from '../UpsertRulesWorkflow.data';

const statusOptions = ['OPEN', 'CLOSED', 'RESOLVED', 'PENDING', 'SPAMS'];
const impactOptions = ['HIGH', 'MEDIUM', 'LOW'];
const priority = ['HIGH', 'MEDIUM', 'LOW', 'URGENT'];
const typeOptions = ['INC', 'SR'];
const sourcesOptions = ['PHONE', 'EMAIL', 'PORTAL', 'CHAT'];

const optionsConstant = {
  agent: 'Assign to Agent',
  department: 'Set Department as',
  category: 'Set Category as',
  priority: 'Set Category as',
  impacts: 'Set Impact as',
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
  const selectedLabel = selectedOptionsKey?.label;
  const useApiQuery = (selectedLabel: string) => {
    if (selectedLabel === optionsConstant?.agent) {
      return agentApiQuery;
    } else if (selectedLabel === optionsConstant?.department) {
      return departmentApiQuery;
    } else if (selectedLabel === optionsConstant?.category) {
      return apiQueryCategories;
    }
    return null;
  };

  const valuesOptions =
    selectedLabel === optionsConstant?.priority
      ? priority
      : selectedLabel === optionsConstant?.source
        ? sourcesOptions
        : selectedLabel === optionsConstant?.type
          ? typeOptions
          : selectedLabel === optionsConstant?.impacts
            ? impactOptions
            : statusOptions;
  let valueComponent;
  const apiQuery = useApiQuery(selectedLabel);
  if (
    [
      optionsConstant?.task,
      optionsConstant?.tag,
      optionsConstant?.agentEmail,
      optionsConstant?.requesterEmail,
    ]?.includes(selectedLabel)
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
    selectedLabel === optionsConstant?.agent ||
    selectedLabel === optionsConstant?.category
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
          selectedLabel === optionsConstant?.agent
            ? (option: any) => `${option?.firstName} ${option?.lastName}`
            : (option: any) => option?.categoryName,
      },
      component: RHFAutocompleteAsync,
    };
  } else if (selectedLabel === optionsConstant?.department) {
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
  } else if ([optionsConstant?.date]?.includes(selectedLabel)) {
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
        getOptionLabel: ({ label }: { label: string }) => label,
      },
      component: RHFAutocomplete,
    },
    valueComponent,
  ];
};
