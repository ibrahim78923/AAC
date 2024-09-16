import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import { ARRAY_INDEX, LOGICS, MODULES, SCHEMA_KEYS } from '@/constants/strings';
import * as Yup from 'yup';
import {
  assetsFieldsOption,
  notifyBeforeOptions,
  optionsConstants,
  taskFieldsOption,
  ticketsFields,
} from './WorkflowConditions/SubWorkflowConditions/SubWorkflowConditions.data';

export const moduleOptions = [
  { value: 'TICKETS', label: 'Tickets' },
  { value: 'ASSETS', label: 'Assets' },
  { value: 'TICKETS_TASKS', label: 'Tasks' },
];
export const andRunOptions = [
  { value: 'ONCE', label: 'Once, for each record' },
  { value: 'RECURRENT', label: 'Recurring, for the same record' },
];

export const eventOptions = [
  { value: 'created', label: 'When a record is created' },
  { value: 'updated', label: 'When a record is updated' },
  { value: 'deleted', label: 'When a record is deleted' },
];

export const conditionTypeOptions = [
  { value: 'AND', label: 'Match ALL condition in this group' },
  { value: 'OR', label: 'Match ANY condition in this group' },
];

export const actionsTicketOptions = [
  { value: 'pirority', label: 'Set Priority as' },
  { value: 'impact', label: 'Set Impact as' },
  { value: 'ticketType', label: 'Set Type as' },
  { value: 'status', label: 'Set Status as' },
  { value: 'plannedStartDate', label: 'Set planned Start dates as' },
  { value: 'plannedEndDate', label: 'Set planned end dates as' },
  { value: 'plannedEffort', label: 'Set planned Efforts as' },
  { value: 'dueDate', label: 'Set Due Date as' },
  { value: 'category', label: 'Set Category as' },
  { value: 'source', label: 'Set Source as' },
  { value: 'department', label: 'Set Department as' },
  { value: 'agent', label: 'Assign to Agent' },
];
export const actionsTaskOptions = [
  { value: 'status', label: 'Set Status as' },
  { value: 'startDate', label: 'Set planned Start dates as' },
  { value: 'endDate', label: 'Set planned end dates as' },
  { value: 'plannedEffort', label: 'Set planned Efforts as' },
  { value: 'assignTo', label: 'Assign to Agent' },
];
export const actionsAssetOptions = [
  { value: 'status', label: 'Set Status as' },
  { value: 'impact', label: 'Set Impact as' },
  { value: 'locationId', label: 'Set location as' },
  { value: 'assetLifeExpiry', label: 'Set end of life as' },
  { value: 'assetType', label: 'Set Category as' },
  { value: 'departmentId', label: 'Set Department as' },
  { value: 'usedBy', label: 'Set used by as' },
];

export const eventBasedSaveWorkflowSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
});

export const eventBasedWorkflowSchema = Yup.object().shape({
  title: Yup?.string()?.required('Required'),
  type: Yup?.string(),
  description: Yup?.string(),
  runType: Yup?.mixed()?.nullable()?.required('Required'),
  module: Yup?.string()?.required('Required'),
  events: Yup?.mixed()?.nullable()?.required('Required'),
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

export const eventBasedWorkflowValues: any = (singleWorkflowData: any) => {
  const ticketData: any = {
    ticketFields: 'Ticket Fields',
    assetsFields: 'Assets Fields',
    taskFields: 'Task Fields',
  };

  let optionsData: any = ticketData?.ticketFields;

  if (singleWorkflowData?.module === SCHEMA_KEYS?.TICKETS) {
    optionsData = ticketData?.ticketFields;
  } else if (singleWorkflowData?.module === SCHEMA_KEYS?.ASSETS) {
    optionsData = ticketData?.assetsFields;
  } else if (singleWorkflowData?.module === SCHEMA_KEYS?.TICKETS_TASKS) {
    optionsData = ticketData?.taskFields;
  }

  const allFields = [
    ...ticketsFields,
    ...taskFieldsOption,
    ...assetsFieldsOption,
  ];
  const allActionFields = [
    ...actionsTicketOptions,
    ...actionsTaskOptions,
    ...actionsAssetOptions,
  ];

  const constantsData = {
    date: 'date',
    object: 'objectId',
    notifyBefore: 'notifyBefore',
  };
  return {
    title: singleWorkflowData?.title ?? '',
    type: MODULES?.EVENT_BASE,
    description: singleWorkflowData?.description ?? '',
    events: singleWorkflowData?.events?.[ARRAY_INDEX?.ZERO]
      ? eventOptions?.find(
          (item: any) =>
            item?.value === singleWorkflowData?.events?.[ARRAY_INDEX?.ZERO],
        )
      : null,
    runType: singleWorkflowData?.runType
      ? andRunOptions?.find(
          (item: any) => item?.value === singleWorkflowData?.runType,
        )
      : null,
    module: singleWorkflowData?.module ?? SCHEMA_KEYS?.TICKETS,
    groupCondition: singleWorkflowData?.groupCondition ?? LOGICS?.AND,
    groups: singleWorkflowData?.groups?.map((group: any, gIndex: number) => ({
      name: group?.name ?? '',
      conditionType:
        conditionTypeOptions?.find(
          (type: any) => type?.value === group?.conditionType,
        ) ?? null,
      conditions: group?.conditions?.map((condition: any, cIndex: number) => ({
        options: optionsData,
        fieldName: condition?.fieldName
          ? allFields?.find((item: any) => item?.value === condition?.fieldName)
          : null,
        condition: condition?.condition ?? '',
        fieldValue:
          condition?.fieldType === constantsData?.object
            ? singleWorkflowData[
                `group_${condition?.fieldName}${gIndex}${cIndex}_lookup`
              ]
            : condition?.fieldType === constantsData?.date
              ? new Date(condition?.fieldValue)
              : condition?.fieldName === constantsData?.notifyBefore
                ? notifyBeforeOptions?.find(
                    (item: any) => item?.value === condition?.fieldValue,
                  )
                : condition?.fieldValue,
      })),
    })) ?? [
      {
        name: '',
        conditionType: null,
        conditions: [
          {
            options: '',
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
          ? allActionFields?.find(
              (item: any) => item?.value === action?.fieldName,
            )
          : null,
        fieldValue:
          action?.fieldType === constantsData?.object
            ? singleWorkflowData[`action_${action?.fieldName}${aIndex}_lookup`]
            : action?.fieldType === constantsData?.date
              ? new Date(action?.fieldValue)
              : action?.fieldValue,
      }),
    ) ?? [{ fieldName: null, fieldValue: null }],
  };
};

export const EventBasedWorkflowDataArray = [
  {
    id: 1,
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
    id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      placeholder: 'Description....',
      style: { minHeight: 150 },
    },
    component: RHFEditor,
    md: 12,
  },
];
