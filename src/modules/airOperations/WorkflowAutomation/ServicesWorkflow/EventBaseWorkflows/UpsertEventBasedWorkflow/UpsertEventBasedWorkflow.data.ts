import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
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

export const eventOptions = [
  { value: 'created', label: 'When a record is created' },
  { value: 'updated', label: 'When a record is updated' },
  { value: 'deleted', label: 'When a record is deleted' },
];

export const conditionTypeOptions = [
  { value: 'AND', label: 'Match ALL condition in this group' },
  { value: 'OR', label: 'Match ANY condition in this group' },
];

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
        Yup?.lazy((value: any) => {
          if (value?.key === 'email') {
            return Yup?.object()?.shape({
              key: Yup?.string()?.required('Required'),
              condition: Yup?.string()?.required('Required'),
              value: Yup?.string()
                ?.email('Invalid email')
                ?.nullable()
                ?.required('Required'),
            });
          } else if (value?.key === 'number') {
            return Yup?.object()?.shape({
              key: Yup?.string()?.required('Required'),
              condition: Yup?.string()?.required('Required'),
              value: Yup?.number()?.nullable()?.required('Required'),
            });
          } else {
            return Yup?.object()?.shape({
              key: Yup?.string()?.required('Required'),
              condition: Yup?.string()?.required('Required'),
              value: Yup?.mixed()?.nullable()?.required('Required'),
            });
          }
        }),
      ),
    }),
  ),
  actions: Yup?.array()?.of(
    Yup.lazy((value: any) => {
      if (
        value?.key === 'Send Email to Requester' ||
        value?.key === 'Send Email to Agent'
      ) {
        return Yup?.object()?.shape({
          key: Yup?.string()?.required('Required'),
          value: Yup?.string()
            ?.email('Invalid email')
            ?.nullable()
            ?.required('Required'),
        });
      } else if (value?.key === 'Add Task' || value?.key === 'Add Tag') {
        return Yup?.object()?.shape({
          key: Yup?.string()?.required('Required'),
          value: Yup?.string()?.nullable()?.required('Required'),
        });
      } else {
        return Yup?.object()?.shape({
          key: Yup?.string()?.required('Required'),
          value: Yup?.mixed()?.nullable()?.required('Required'),
        });
      }
    }),
  ),
});

export const eventBasedWorkflowValues: any = (singleWorkflowData: any) => {
  return {
    title: singleWorkflowData?.title ?? '',
    type: 'EVENT_BASE',
    description: singleWorkflowData?.description ?? '',
    events: singleWorkflowData?.events?.[0]
      ? eventOptions?.find(
          (item: any) => item?.value === singleWorkflowData?.events?.[0],
        )
      : null,
    runType: singleWorkflowData?.runType
      ? andRunOptions?.find(
          (item: any) => item?.value === singleWorkflowData?.runType,
        )
      : null,
    module: singleWorkflowData?.module
      ? moduleOptions?.find(
          (item: any) => item?.value === singleWorkflowData?.module,
        )
      : 'TICKETS',
    groupCondition: singleWorkflowData?.groupCondition ?? '',
    groups: singleWorkflowData?.groups?.map((group: any) => {
      return {
        name: group?.name ?? '',
        conditionType: group?.conditionType
          ? conditionTypeOptions?.find(
              (item: any) => item?.value === group?.conditionType,
            )
          : null,
        conditions: group?.conditions?.map((condition: any) => {
          return {
            key: condition?.key ?? '',
            condition: condition?.condition ?? '',
            value: condition?.value ?? null,
          };
        }),
      };
    }) ?? [
      {
        name: '',
        conditionType: null,
        conditions: [
          {
            key: '',
            condition: '',
            value: null,
          },
        ],
      },
      {
        name: '',
        conditionType: null,
        conditions: [
          {
            key: '',
            condition: '',
            value: null,
          },
        ],
      },
    ],
    actions: singleWorkflowData?.actionValues?.map((action: any) => {
      const [actionName, actionData] = Object.entries(action)[0];
      return {
        key: actionName ?? '',
        value: actionData ?? null,
      };
    }) ?? [{ key: '', value: null }],
  };
};
export const EventBasedWorkflowDataArray = [
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
