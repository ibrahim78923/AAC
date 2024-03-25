import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

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
  actions: Yup.array().of(
    Yup.lazy((value: any) => {
      if (
        value?.key === 'Send Email to Requester' ||
        value?.key === 'Send Email to Agent'
      ) {
        return Yup.object().shape({
          key: Yup.string().required('Required'),
          value: Yup.string()
            .email('Invalid email')
            .nullable()
            .required('Required'),
        });
      } else if (value?.key === 'Add Task' || value?.key === 'Add Tag') {
        return Yup.object().shape({
          key: Yup.string().required('Required'),
          value: Yup.string().nullable().required('Required'),
        });
      } else {
        return Yup.object().shape({
          key: Yup.string().required('Required'),
          value: Yup.mixed().nullable().required('Required'),
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
    events: singleWorkflowData?.events?.[0] ?? null,
    runType: singleWorkflowData?.runType ?? null,
    module: singleWorkflowData?.module ?? 'TICKETS',
    groupCondition: singleWorkflowData?.groupCondition ?? '',
    groups: [
      {
        name: singleWorkflowData?.groups[0]?.name ?? '',
        conditionType: singleWorkflowData?.groups[0]?.conditionType ?? null,
        conditions: [
          {
            key: singleWorkflowData?.groups[0]?.conditions[0]?.key ?? '',
            condition:
              singleWorkflowData?.groups[0]?.conditions[0]?.condition ?? '',
            value: singleWorkflowData?.groups[0]?.conditions[0]?.value ?? null,
          },
        ],
      },
      {
        name: singleWorkflowData?.groups[0]?.name ?? '',
        conditionType: singleWorkflowData?.groups[0]?.conditionType ?? null,
        conditions: [
          {
            key: singleWorkflowData?.groups[0]?.conditions[0]?.key ?? '',
            condition:
              singleWorkflowData?.groups[0]?.conditions[0]?.condition ?? '',
            value: singleWorkflowData?.groups[0]?.conditions[0]?.value ?? null,
          },
        ],
      },
    ],
    actions: [{ key: '', value: null }],
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
