import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const eventBasedWorkflowSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
  description: Yup?.string(),
  assetsType: Yup?.string()?.required('Required'),
  moduleType: Yup?.string(),
  trigger: Yup?.string(),
  andRun: Yup?.string(),
  workflowConditions: Yup?.array()?.of(
    Yup?.object()?.shape({
      name: Yup?.string()?.required('Required'),
      conditionType: Yup?.string(),
      logicGate: Yup?.string(),
      conditions: Yup?.array()?.of(
        Yup?.object()?.shape({
          condition1: Yup?.string(),
          condition2: Yup?.string(),
          condition3: Yup?.string(),
          condition4: Yup?.string(),
        }),
      ),
    }),
  ),
  actionsExecuted: Yup?.array()?.of(
    Yup?.object()?.shape({
      action1: Yup?.string(),
      action2: Yup?.string(),
      action3: Yup?.string(),
      action4: Yup?.string(),
    }),
  ),
});

export const eventBasedWorkflowValues = {
  title: '',
  description: '',
  assetsType: '',
  moduleType: 'Deals',
  trigger: '',
  andRun: '',
  workflowConditions: [
    {
      name: '',
      conditionType: 'Match ALL condition in this group',
      logicGate: 'and',
      conditions: [
        { condition1: '', condition2: '', condition3: '', condition4: '' },
      ],
    },
    {
      name: '',
      conditionType: 'Match ALL condition in this group',
      logicGate: 'and',
      conditions: [
        { condition1: '', condition2: '', condition3: '', condition4: '' },
      ],
    },
  ],
  actionsExecuted: [{ action1: '', action2: '', action3: '', action4: '' }],
};
export const EventBasedWorkflowDataArray = [
  {
    componentProps: {
      name: 'title',
      label: 'Title',
      fullWidth: true,
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
      style: { height: 150 },
    },
    component: RHFEditor,
    md: 12,
  },
];
