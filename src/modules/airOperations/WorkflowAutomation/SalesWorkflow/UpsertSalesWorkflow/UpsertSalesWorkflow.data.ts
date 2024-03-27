import * as Yup from 'yup';
export const salesSchema: any = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
  schedule: Yup?.string(),
  scheduleMonth: Yup?.date(),
  scheduleDay: Yup?.string(),
  scheduleDate: Yup?.date(),
  time: Yup?.date(),
  custom: Yup?.object(),
  type: Yup?.string(),
  module: Yup?.string()?.required('Required'),
  events: Yup?.mixed()?.nullable()?.required('Required'),
  runType: Yup?.mixed()?.nullable()?.required('Required'),
  groupCondition: Yup?.string(),
  groups: Yup?.array()?.of(
    Yup?.object()?.shape({
      name: Yup?.string()?.required('Required'),
      conditionType: Yup?.mixed()?.required('Required'),
      conditions: Yup?.array()?.of(
        Yup?.object()?.shape({
          key: Yup?.string()?.required('Required'),
          condition: Yup?.string()?.required('Required'),
          value: Yup?.mixed()?.nullable()?.required('Required'),
        }),
      ),
    }),
  ),
  actions: Yup?.array()?.of(
    Yup?.object()?.shape({
      key: Yup?.string()?.required('Required'),
      value: Yup?.string()?.required('Required'),
    }),
  ),
});

export const salesValues = {
  title: '',
  type: 'EVENT_BASE',
  schedule: 'DAILY',
  scheduleMonth: new Date(),
  scheduleDay: 'Monday',
  scheduleDate: new Date(),
  time: new Date(),
  custom: {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  },
  module: 'DEALS',
  events: null,
  runType: null,
  groupCondition: 'OR',
  groups: [
    {
      name: '',
      conditionType: null,
      conditions: [{ key: '', condition: '', value: [] }],
    },
    {
      name: '',
      conditionType: null,
      conditions: [{ key: '', condition: '', value: [] }],
    },
  ],
  actions: [{ key: '', value: '' }],
};
