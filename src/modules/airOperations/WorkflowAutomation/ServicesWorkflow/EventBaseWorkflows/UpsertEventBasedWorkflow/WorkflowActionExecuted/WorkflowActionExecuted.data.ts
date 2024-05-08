import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  actionsAssetOptions,
  actionsTaskOptions,
  actionsTicketOptions,
} from '../UpsertEventBasedWorkflow.data';
import { SCHEMA_KEYS } from '@/constants/strings';

const statusOptions = ['OPEN', 'CLOSED', 'RESOLVED', 'PENDING', 'SPAMS'];
const impactOptions = ['HIGH', 'MEDIUM', 'LOW'];
const priority = ['HIGH', 'MEDIUM', 'LOW', 'URGENT'];
const typeOptions = ['INC', 'SR'];
const sourcesOptions = ['PHONE', 'EMAIL', 'PORTAL', 'CHAT'];
const statusTasksOptions = ['Todo', 'In-Progress', 'Done'];

export const optionsConstant = {
  agent: 'Assign to Agent',
  department: 'Set Department as',
  category: 'Set Category as',
  priority: 'Set Priority as',
  impacts: 'Set Impact as',
  source: 'Set Source as',
  type: 'Set Type as',
  task: 'Add Task',
  tag: 'Add Tag',
  agentEmail: 'Send Email to Agent',
  requesterEmail: 'Send Email to Requester',
  date: 'Set Due Date as',
  endOfLife: 'Set end of life as',
  startDate: 'Set planned Start dates as',
  endDate: 'Set planned end dates as',
  plannedEffort: 'Set planned Efforts as',
  setLocationAs: 'Set location as',
  status: 'Set Status as',
};
export const actionsData = ({
  index,
  watch,
  agentApiQuery,
  departmentApiQuery,
  apiQueryCategories,
  apiQueryLocations,
}: any) => {
  const moduleTypeOptions = watch('module');

  const modulesOptions =
    moduleTypeOptions === SCHEMA_KEYS?.ASSETS
      ? actionsAssetOptions || []
      : moduleTypeOptions === SCHEMA_KEYS?.TICKETS
        ? actionsTicketOptions || []
        : actionsTaskOptions || [];

  const selectedOptionsKey = watch(`actions.${index}.fieldName`);
  const selectedLabel = selectedOptionsKey?.label;
  const useApiQuery = (selectedLabel: string) => {
    if (selectedLabel === optionsConstant?.agent) {
      return agentApiQuery;
    } else if (selectedLabel === optionsConstant?.department) {
      return departmentApiQuery;
    } else if (selectedLabel === optionsConstant?.category) {
      return apiQueryCategories;
    } else if (selectedLabel === optionsConstant?.setLocationAs) {
      return apiQueryLocations;
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
            : selectedLabel === optionsConstant?.status &&
                moduleTypeOptions === SCHEMA_KEYS?.TICKETS_TASKS
              ? statusTasksOptions
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
    selectedLabel === optionsConstant?.setLocationAs ||
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
            : selectedLabel === optionsConstant?.setLocationAs
              ? (option: any) => option?.locationName
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
  } else if (
    selectedLabel === optionsConstant?.date ||
    selectedLabel === optionsConstant?.endOfLife ||
    selectedLabel === optionsConstant?.startDate ||
    selectedLabel === optionsConstant?.endDate ||
    selectedLabel === optionsConstant?.plannedEffort
  ) {
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
        options: modulesOptions,
        getOptionLabel: ({ label }: { label: string }) => label,
      },
      component: RHFAutocomplete,
    },
    valueComponent,
  ];
};
