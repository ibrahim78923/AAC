import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const eventBasedWorkflowSchema = Yup?.object()?.shape({
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
          key: Yup?.string()?.required('Required'),
          condition: Yup?.string()?.required('Required'),
          value: Yup?.string()?.required('Required'),
        }),
      ),
    }),
  ),
});

export const eventBasedWorkflowValues: any = {
  title: '',
  type: 'EVENT_BASE',
  description: '',
  events: null,
  runType: null,
  module: '',
  groupCondition: '',
  groups: [
    {
      name: '',
      conditionType: null,
      conditions: [{ key: '', condition: '', value: '' }],
    },
    {
      name: '',
      conditionType: null,
      conditions: [{ key: '', condition: '', value: '' }],
    },
  ],
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
