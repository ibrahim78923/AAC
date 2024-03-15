import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const eventBasedWorkflowSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
  type: Yup?.string(),
  description: Yup?.string(),
  // assetsType: Yup?.string(),
  runType: Yup?.string()?.required('Required'),
  module: Yup?.string(),
  events: Yup?.string()?.required('Required'),
  // trigger: Yup?.string(),
  // andRun: Yup?.string(),
  groups: Yup?.array()?.of(
    Yup?.object()?.shape({
      name: Yup?.string()?.required('Required'),
      conditionType: Yup?.string(),
      // logicGate: Yup?.string(),
      conditions: Yup?.array()?.of(
        Yup?.object()?.shape({
          // condition1: Yup?.string(),
          key: Yup?.string(),
          condition: Yup?.string(),
          value: Yup?.string(),
        }),
      ),
    }),
  ),
});

export const eventBasedWorkflowValues: any = {
  title: '',
  type: 'EVENT_BASE',
  description: '',
  events: [],
  // assetsType: '',
  runType: '',
  module: '',
  // trigger: '',
  // andRun: '',
  groups: [
    {
      name: '',
      conditionType: '',
      // logicGate: 'and',
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
