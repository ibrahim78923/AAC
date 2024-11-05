import * as Yup from 'yup';
import {
  RHFAutocomplete,
  RHFDesktopDateTimePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ARRAY_INDEX } from '@/constants/strings';
import { TASK_STATUS } from '@/constants/strings';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { DepartmentFieldDropdown } from '../../../ServiceTicketFormFields/DepartmentFieldDropdown';
import { AgentFieldDropdown } from '../../../ServiceTicketFormFields/AgentFieldDropdown';
import { TICKET_TASKS_ACTIONS_CONSTANT } from '../Tasks.data';
import { CHARACTERS_LIMIT, REGEX } from '@/constants/validation';
import { localeDateTime } from '@/lib/date-time';
import { formatDurationHourMinute } from '@/utils/dateTime';

const { SERVICES_TICKETS_TASKS_TITLE_MAX_CHARACTERS } = CHARACTERS_LIMIT ?? {};

const { DONE, IN_PROGRESS, TO_DO } = TASK_STATUS;
const statusOptions = [TO_DO, IN_PROGRESS, DONE];

const { CREATE_TICKET_TASKS, EDIT_TICKET_TASKS } =
  TICKET_TASKS_ACTIONS_CONSTANT;

export const TITLE_FORM_USER: any = {
  [CREATE_TICKET_TASKS]: 'Add New Task',
  [EDIT_TICKET_TASKS]: 'Edit Tasks',
};

export const BUTTON_TITLE_FORM_USER: any = {
  [CREATE_TICKET_TASKS]: 'Add Task',
  [EDIT_TICKET_TASKS]: 'Update',
};

const notifyBeforeOption = [
  { _id: 5, label: '5 Minutes' },
  { _id: 10, label: '10 Minutes' },
  { _id: 15, label: '15 Minutes' },
  { _id: 30, label: '30 Minutes' },
];

export const upsertTicketTaskFormValidationSchema: any = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    title: Yup?.string()
      ?.trim()
      ?.required('Title is required')
      ?.max(
        SERVICES_TICKETS_TASKS_TITLE_MAX_CHARACTERS,
        `Maximum characters limit is ${SERVICES_TICKETS_TASKS_TITLE_MAX_CHARACTERS}`,
      ),
    description: Yup?.string()
      ?.trim()
      ?.required('Description is required')
      ?.test('is-not-empty', 'Description is required', (value) => {
        const strippedContent = value
          ?.replace(REGEX?.GLOBAL_HTML_TAG, '')
          ?.trim();
        return strippedContent !== '';
      }),
    department: Yup?.mixed()?.required('Department is required'),
    agent: Yup?.mixed()?.nullable(),
    notifyBefore: Yup?.mixed()?.nullable(),
    status: Yup?.mixed()?.required('Status is required'),
    startDate: Yup?.date()
      ?.nullable()
      ?.when('endDate', {
        is: (value: any) => value !== null,
        then: () =>
          Yup?.date()?.nullable()?.required('Planned start date is required'),
        otherwise: () => Yup?.date()?.nullable(),
      }),
    endDate: Yup?.date()
      ?.nullable()
      .min(
        Yup?.ref('startDate'),
        'Planned End date is after planned start date',
      ),
    plannedEffort: Yup?.string()?.trim(),
    ...formSchema,
  });
};

export const upsertTicketTaskFormDefaultValues = (data?: any, form?: any) => {
  const taskData = data?.[ARRAY_INDEX?.ZERO];
  const initialValues: any = dynamicFormInitialValue(taskData, form);

  return {
    title: taskData?.title ?? '',
    description: taskData?.description ?? '',
    department: taskData?.departmentData ?? null,
    agent: taskData?.assignedUser ?? null,
    status: taskData?.status ?? null,
    notifyBefore: !!taskData?.notifyBefore
      ? notifyBeforeOption?.find(
          (item: any) => item?._id === +taskData?.notifyBefore,
        )
      : null,
    startDate: taskData?.startDate ? localeDateTime(taskData?.startDate) : null,
    endDate: taskData?.endDate ? localeDateTime(taskData?.endDate) : null,
    plannedEffort: taskData?.plannedEffort ?? '',
    ...initialValues,
  };
};

export const upsertTicketTaskFormFormFieldsDynamic = (
  getValues?: any,
  setValue?: any,
  watch?: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'title',
      label: 'Title',
      placeholder: 'Enter title',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Enter the description',
      fullWidth: true,
      required: true,
      style: {
        height: 200,
      },
    },
    component: RHFEditor,
    md: 12,
  },
  {
    id: 3,
    componentProps: { required: true },
    component: DepartmentFieldDropdown,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      label: 'Assign To',
    },
    component: AgentFieldDropdown,
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: 'status',
      label: 'Status',
      placeholder: 'Select status',
      fullWidth: true,
      required: true,
      options: statusOptions,
      isOptionEqualToValue: (option: any, newValue: any) => option === newValue,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 6,
    componentProps: {
      name: 'notifyBefore',
      label: 'Notify Before',
      placeholder: 'Select notify before',
      fullWidth: true,
      options: notifyBeforeOption,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'startDate',
      label: 'Planned Start Date',
      fullWidth: true,
      ampm: false,
      textFieldProps: { readOnly: true },
    },
    component: RHFDesktopDateTimePicker,
    md: 12,
  },
  {
    id: 9,
    componentProps: {
      name: 'endDate',
      label: 'Planned End Date',
      fullWidth: true,
      ampm: false,
      textFieldProps: { readOnly: true },
      minDateTime: watch('startDate'),
    },
    component: RHFDesktopDateTimePicker,
    md: 12,
  },
  {
    id: 11,
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      placeholder: 'Eg: 1h10m',
      onBlurHandler: () => {
        const value = getValues('plannedEffort');
        setValue('plannedEffort', formatDurationHourMinute(value));
      },
    },
    component: RHFTextField,
    md: 12,
  },
];
