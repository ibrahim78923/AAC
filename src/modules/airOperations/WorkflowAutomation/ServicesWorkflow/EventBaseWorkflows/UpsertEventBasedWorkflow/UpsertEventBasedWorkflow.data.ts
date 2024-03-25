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

export const eventBasedWorkflowValues: any = {
  title: '',
  type: 'EVENT_BASE',
  description: '',
  events: null,
  runType: null,
  module: 'TICKETS',
  groupCondition: '',
  groups: [
    {
      name: '',
      conditionType: null,
      conditions: [{ key: '', condition: '', value: null }],
    },
    {
      name: '',
      conditionType: null,
      conditions: [{ key: '', condition: '', value: null }],
    },
  ],
  actions: [{ key: '', value: null }],
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
