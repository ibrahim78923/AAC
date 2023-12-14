import * as Yup from 'yup';
export const salesSchema = Yup?.object()?.shape({
  schedule: Yup?.mixed(),
  scheduleMonth: Yup?.date(),
  scheduleDay: Yup?.mixed(),
  scheduleDate: Yup?.date(),
  scheduleTime: Yup?.date(),
  scheduleDateRange: Yup?.array(),
  scheduleWorkflow: Yup?.string(),
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

export const salesValues = {
  scheduleWorkflow: 'Enable Now',
  schedule: '',
  scheduleMonth: new Date(),
  scheduleDay: '',
  scheduleDate: new Date(),
  scheduleTime: new Date(),
  scheduleDateRange: [],
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
