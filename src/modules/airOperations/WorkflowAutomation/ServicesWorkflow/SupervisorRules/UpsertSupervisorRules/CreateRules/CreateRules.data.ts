import {
  RHFTextField,
  RHFEditor,
  RHFDatePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const CreateRulesValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
  basedOn: Yup?.date(),
  description: Yup?.string(),
});

export const defaultValues = {
  title: '',
  basedOn: new Date(),
  description: '',
  workflowConditions: [
    {
      name: '',
      conditionType: 'Match ALL condition in this group',
      logicGate: 'and',
      conditions: [
        { condition1: '', condition2: '', condition3: '', condition4: '' },
      ],
    },
  ],
};

export const CreateRulesDataArray = [
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
      name: 'basedOn',
      label: 'Based On',
      fullWidth: true,
    },
    component: RHFDatePicker,
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
