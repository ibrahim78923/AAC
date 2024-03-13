import * as Yup from 'yup';
export const salesSchema: any = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
  schedule: Yup?.string(),
  scheduleMonth: Yup?.date(),
  scheduleDay: Yup?.string(),
  scheduleDate: Yup?.date(),
  scheduleTime: Yup?.date(),
  scheduleDateRange: Yup?.object(),
  scheduleWorkflow: Yup?.string(),
  moduleType: Yup?.string(),
  trigger: Yup?.string()?.required('Required'),
  andRun: Yup?.string()?.required('Required'),
  workflowConditions: Yup?.array()?.of(
    Yup?.object()?.shape({
      name: Yup?.string()?.required('Required'),
      conditionType: Yup?.string(),
      logicGate: Yup?.string(),
      conditions: Yup?.array()?.of(
        Yup?.object()?.shape({
          condition1: Yup?.string()?.required('Required'),
          condition2: Yup?.string()?.required('Required'),
          condition3: Yup?.string()?.required('Required'),
          condition4: Yup?.string()?.required('Required'),
        }),
      ),
    }),
  ),
  actionsExecuted: Yup?.array()?.of(
    Yup?.object()?.shape({
      action1: Yup?.string()?.required('Required'),
      action2: Yup?.string()?.required('Required'),
      action3: Yup?.string()?.required('Required'),
      action4: Yup?.string()?.required('Required'),
    }),
  ),
});

export const salesValues = {
  title: '',
  scheduleWorkflow: 'Enable Now',
  schedule: '',
  scheduleMonth: new Date(),
  scheduleDay: '',
  scheduleDate: new Date(),
  scheduleTime: new Date(),
  scheduleDateRange: {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  },
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
