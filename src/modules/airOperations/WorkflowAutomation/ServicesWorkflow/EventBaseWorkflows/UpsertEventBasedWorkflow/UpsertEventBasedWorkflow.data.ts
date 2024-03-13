import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const eventBasedWorkflowSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
  description: Yup?.string(),
  assetsType: Yup?.string()?.required('Required'),
  moduleType: Yup?.string(),
  trigger: Yup?.string(),
  andRun: Yup?.string(),
  groups: Yup?.array()?.of(
    Yup?.object()?.shape({
      name: Yup?.string()?.required('Required'),
      conditionType: Yup?.string(),
      logicGate: Yup?.string(),
      conditions: Yup?.array()?.of(
        Yup?.object()?.shape({
          condition1: Yup?.string(),
          key: Yup?.string(),
          condition: Yup?.string(),
          value: Yup?.string(),
        }),
      ),
    }),
  ),
  // actions: Yup?.array()?.of(
  //   Yup?.object()?.shape({
  //     key: Yup?.string(),
  //     value: Yup?.string(),
  //   }),
  // ),
});

export const eventBasedWorkflowValues = {
  title: '',
  description: '',
  assetsType: '',
  moduleType: 'Deals',
  trigger: '',
  andRun: '',
  groups: [
    {
      name: '',
      conditionType: 'Match ALL condition in this group',
      logicGate: 'and',
      conditions: [{ condition1: '', key: '', condition: '', value: '' }],
    },
    // {
    //   name: '',
    //   conditionType: 'Match ALL condition in this group',
    //   logicGate: 'and',
    //   conditions: [
    //     { condition1: '', condition2: '', condition3: '', condition4: '' },
    //   ],
    // },
  ],
  // action: [{ key: '', value: '' }],
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
