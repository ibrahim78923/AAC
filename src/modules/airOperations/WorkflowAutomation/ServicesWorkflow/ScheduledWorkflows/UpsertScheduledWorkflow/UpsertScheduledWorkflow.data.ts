import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import { MODULES, SCHEMA_KEYS } from '@/constants/strings';
import * as Yup from 'yup';
import {
  assetsFieldsOption,
  optionsConstants,
  taskFieldsOption,
  ticketsFields,
} from './WorkflowConditions/SubWorkflowConditions/SubWorkflowConditions.data';
import { monthFormatter, timeFormatter } from '@/utils/api';

export const moduleOptions = [
  { value: 'TICKETS', label: 'Tickets' },
  { value: 'ASSETS', label: 'Assets' },
  { value: 'TICKETS_TASKS', label: 'Tasks' },
];

export const andRunOptions = [
  { value: 'ONCE', label: 'Once, for each record' },
  { value: 'RECURRENT', label: 'Recurring, for the same record' },
];

export const conditionTypeOptions = [
  { value: 'AND', label: 'Match ALL condition in this group' },
  { value: 'OR', label: 'Match ANY condition in this group' },
];

export const actionsOptions = [
  { value: 'status', label: 'Set Priority as' },
  { value: 'impact', label: 'Set Impact as' },
  { value: 'ticketType', label: 'Set Type as' },
  { value: 'status', label: 'Set Status as' },
  { value: 'dueDate', label: 'Set Due Date as' },
  { value: 'category', label: 'Set Category as' },
  { value: 'source', label: 'Set Source as' },
  { value: 'department', label: 'Set Department as' },
  { value: 'agent', label: 'Assign to Agent' },
];
export const scheduledSaveWorkflowSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
});
export const scheduledWorkflowSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
  description: Yup?.string(),
  runType: Yup?.mixed()?.nullable()?.required('Required'),
  groups: Yup?.array()?.of(
    Yup?.object()?.shape({
      name: Yup?.string()?.required('Required'),
      conditionType: Yup?.mixed()?.nullable()?.required('Required'),
      groupCondition: Yup?.string(),
      conditions: Yup?.array()?.of(
        Yup?.object()?.shape({
          fieldName: Yup?.mixed()?.nullable()?.required('Required'),
          condition: Yup?.string()?.required('Required'),
          fieldValue: Yup?.mixed()?.when('condition', {
            is: (condition: string) =>
              condition === optionsConstants?.isEmpty ||
              condition === optionsConstants?.isNotEmpty,
            then: (schema: any) => schema?.notRequired(),
            otherwise: (schema: any) => schema?.required('Required'),
          }),
        }),
      ),
    }),
  ),
  actions: Yup?.array()?.of(
    Yup.lazy((value: any) => {
      if (
        value?.fieldName === 'Send Email to Requester' ||
        value?.fieldName === 'Send Email to Agent'
      ) {
        return Yup?.object()?.shape({
          fieldName: Yup?.mixed()?.nullable()?.required('Required'),
          fieldValue: Yup?.string()
            ?.email('Invalid email')
            ?.nullable()
            ?.required('Required'),
        });
      } else if (
        value?.fieldName === 'Add Task' ||
        value?.fieldName === 'Add Tag'
      ) {
        return Yup?.object()?.shape({
          fieldName: Yup?.mixed()?.nullable()?.required('Required'),
          fieldValue: Yup?.string()?.nullable()?.required('Required'),
        });
      } else {
        return Yup?.object()?.shape({
          fieldName: Yup?.mixed()?.nullable()?.required('Required'),
          fieldValue: Yup?.mixed()?.nullable()?.required('Required'),
        });
      }
    }),
  ),
});

export const scheduledWorkflowValues: any = (singleWorkflowData: any) => {
  const ticketData: any = {
    ticketFields: 'Ticket Fields',
    assetsFields: 'Assets Fields',
    taskFields: 'Task Fields',
  };

  let optionsData: any;

  if (singleWorkflowData?.module === SCHEMA_KEYS?.TICKETS) {
    optionsData = ticketData?.ticketFields;
  } else if (singleWorkflowData?.module === SCHEMA_KEYS?.ASSETS) {
    optionsData = ticketData?.assetsFields;
  } else if (singleWorkflowData?.module === SCHEMA_KEYS?.TICKETS_TASKS)
    ticketData?.taskFields;
  else {
    optionsData = ticketData?.ticketFields;
  }

  const allFields = [
    ...ticketsFields,
    ...taskFieldsOption,
    ...assetsFieldsOption,
  ];
  const type: any = {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    ANNUALLY: 'annually',
    CUSTOM: 'custom',
  };

  const time =
    singleWorkflowData?.schedule?.[type[singleWorkflowData?.schedule?.type]]
      ?.time;
  const startDate = singleWorkflowData?.schedule?.custom?.startDate;
  const endDate = singleWorkflowData?.schedule?.custom?.endDate;
  return {
    title: singleWorkflowData?.title ?? '',
    type: MODULES?.SCHEDULED,
    description: singleWorkflowData?.description ?? '',
    schedule: singleWorkflowData?.schedule?.type?.toLowerCase() ?? 'daily',
    scheduleMonth: singleWorkflowData?.schedule?.annually?.month
      ? monthFormatter(singleWorkflowData?.schedule?.annually?.month)
      : new Date(),
    scheduleDay:
      singleWorkflowData?.schedule?.weekly?.days?.[0]?.toLowerCase() ??
      'monday',
    scheduleDate: singleWorkflowData?.schedule?.monthly?.day ?? 1,
    time: time ? new Date(timeFormatter(time)) : new Date(),
    custom: {
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : new Date(),
      key: 'selection',
    },
    runType: singleWorkflowData?.runType
      ? andRunOptions?.find(
          (item: any) => item?.value === singleWorkflowData?.runType,
        )
      : null,
    module: singleWorkflowData?.module ?? SCHEMA_KEYS?.TICKETS,
    groupCondition: singleWorkflowData?.groupCondition ?? 'AND',
    groups: singleWorkflowData?.groups?.map((group: any, gIndex: any) => {
      return {
        name: group?.name ?? '',
        conditionType: group?.conditionType
          ? conditionTypeOptions?.find(
              (item: any) => item?.value === group?.conditionType,
            )
          : null,
        conditions: group?.conditions?.map((condition: any, cIndex: number) => {
          return {
            options: optionsData,
            fieldName: condition?.fieldName
              ? allFields?.find(
                  (item: any) => item?.value === condition?.fieldName,
                )
              : null,
            condition: condition?.condition ?? '',
            fieldValue:
              condition?.fieldType === 'objectId'
                ? singleWorkflowData[
                    `group_${condition?.fieldName}${gIndex}${cIndex}_lookup`
                  ]
                : condition?.fieldType === 'date'
                ? new Date(condition?.fieldValue)
                : condition?.fieldValue,
          };
        }),
      };
    }) ?? [
      {
        name: '',
        conditionType: null,
        conditions: [
          {
            fieldName: null,
            condition: '',
            fieldValue: null,
          },
        ],
      },
    ],
    actions: singleWorkflowData?.actions?.map(
      (action: any, aIndex: number) => ({
        fieldName: action?.fieldName
          ? actionsOptions?.find(
              (item: any) => item?.value === action?.fieldName,
            )
          : null,
        fieldValue:
          action?.fieldType === 'objectId'
            ? singleWorkflowData[`action_${action?.fieldName}${aIndex}_lookup`]
            : action?.fieldType === 'date'
            ? new Date(action?.fieldValue)
            : action?.fieldValue,
      }),
    ) ?? [{ fieldName: null, fieldValue: null }],
  };
};
export const scheduledWorkflowDataArray = [
  {
    componentProps: {
      name: 'title',
      label: 'Title',
      fullWidth: true,
      placeholder: 'Title',
      required: true,
    },

    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      placeholder: 'Description....',
      style: { height: 150 },
    },
    component: RHFEditor,
    md: 12,
  },
];
