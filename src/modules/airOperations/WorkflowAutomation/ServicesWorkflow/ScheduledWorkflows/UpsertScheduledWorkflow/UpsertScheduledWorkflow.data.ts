import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import { MODULES, SCHEMA_KEYS } from '@/constants/strings';
import * as Yup from 'yup';

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
  { value: 'type', label: 'Set Type as' },
  { value: 'status', label: 'Set Status as' },
  { value: 'dueDate', label: 'Set Due Date as' },
  { value: 'category', label: 'Set Category as' },
  { value: 'status', label: 'Set Status as' },
  { value: 'source', label: 'Set Source as' },
  { value: 'department', label: 'Set Department as' },
  { value: 'addTask', label: 'Add Task' },
  { value: 'addTag', label: 'Add Tag' },
  { value: 'sendEmailAgent', label: 'Send Email to Agent' },
  { value: 'sendEmailRequester', label: 'Send Email to Requester' },
  { value: 'assignAgent', label: 'Assign to Agent' },
];

export const scheduledWorkflowSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
  schedule: Yup?.string(),
  scheduleMonth: Yup?.date(),
  scheduleDay: Yup?.string(),
  scheduleDate: Yup?.date(),
  time: Yup?.date(),
  custom: Yup?.object(),
  type: Yup.string(),
  description: Yup.string(),
  runType: Yup.mixed().nullable().required('Required'),
  module: Yup.string().required('Required'),
  groups: Yup?.array()?.of(
    Yup?.object()?.shape({
      name: Yup?.string()?.required('Required'),
      conditionType: Yup?.mixed()?.nullable()?.required('Required'),
      groupCondition: Yup?.string(),
      conditions: Yup?.array()?.of(
        Yup?.lazy((value: any) => {
          if (value?.key === 'email') {
            return Yup?.object()?.shape({
              fieldName: Yup?.string()?.required('Required'),
              condition: Yup?.string()?.required('Required'),
              fieldValue: Yup?.string()
                ?.email('Invalid email')
                ?.nullable()
                ?.required('Required'),
            });
          } else if (value?.key === 'number') {
            return Yup?.object()?.shape({
              fieldName: Yup?.string()?.required('Required'),
              condition: Yup?.string()?.required('Required'),
              fieldValue: Yup?.number()?.nullable()?.required('Required'),
            });
          } else {
            return Yup?.object()?.shape({
              fieldName: Yup?.string()?.required('Required'),
              condition: Yup?.string()?.required('Required'),
              fieldValue: Yup?.mixed()?.nullable()?.required('Required'),
            });
          }
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
  return {
    title: singleWorkflowData?.title ?? '',
    type: MODULES.SCHEDULED,
    description: singleWorkflowData?.description ?? '',
    schedule: singleWorkflowData?.schedule?.type ?? 'DAILY',
    scheduleMonth: new Date(),
    scheduleDay: 'Monday',
    scheduleDate: new Date(),
    time: singleWorkflowData?.schedule?.daily?.time ?? new Date(),
    custom: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
    runType: singleWorkflowData?.runType
      ? andRunOptions?.find(
          (item: any) => item?.value === singleWorkflowData?.runType,
        )
      : null,
    module: singleWorkflowData?.module
      ? moduleOptions?.find(
          (item: any) => item?.value === singleWorkflowData?.module,
        )
      : SCHEMA_KEYS?.TICKETS,
    groupCondition: singleWorkflowData?.groupCondition ?? '',
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
            fieldName: condition?.fieldName ?? '',
            condition: condition?.condition ?? '',
            fieldValue:
              condition?.fieldType === 'objectId'
                ? singleWorkflowData[
                    `${condition?.fieldName}${gIndex}${cIndex}`
                  ]
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
            fieldName: '',
            condition: '',
            fieldValue: null,
          },
        ],
      },
      {
        name: '',
        conditionType: null,
        conditions: [
          {
            fieldName: '',
            condition: '',
            fieldValue: null,
          },
        ],
      },
    ],
    actions: singleWorkflowData?.actionValues
      ? Object?.entries(singleWorkflowData?.actionValues)?.map(
          ([actionName, actionData]: any) => ({
            fieldName: actionName
              ? actionsOptions?.find((item: any) => item?.value)
              : null,
            fieldValue: actionData,
          }),
        )
      : [{ fieldName: null, fieldValue: null }],
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
