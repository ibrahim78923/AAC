import * as Yup from 'yup';
export const salesSchema: any = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
  schedule: Yup?.string()?.when('type', {
    is: (type: any) => type === 'SCHEDULED',
    then: (schema: any) => schema?.required('Required'),
    otherwise: (schema: any) => schema?.notRequired(),
  }),
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
          fieldName: Yup?.string()?.required('Required'),
          condition: Yup?.string()?.required('Required'),
          fieldValue: Yup?.mixed()?.nullable()?.required('Required'),
        }),
      ),
    }),
  ),
  actions: Yup?.array()?.of(
    Yup?.object()?.shape({
      fieldName: Yup?.string()?.required('Required'),
      fieldValue: Yup?.mixed()?.nullable()?.required('Required'),
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
      conditions: [{ fieldName: '', condition: '', fieldValue: null }],
    },
    {
      name: '',
      conditionType: null,
      conditions: [{ fieldName: '', condition: '', fieldValue: null }],
    },
  ],
  actions: [{ fieldName: '', fieldValue: null }],
};

export const workflowTypes = {
  eventBase: 'EVENT_BASE',
  scheduled: 'SCHEDULED',
};
export const workflowFields = {
  object: 'object',
  objectId: 'objectId',
  date: 'date',
  number: 'number',
  string: 'string',
  name: 'Name',
  lostReason: 'Lost Reason',
  updateQuoteName: 'Update Quote Name',
  title: 'Title',
  salesOwner: 'Sales Owner',
  createdBy: 'Created By',
  updatedBy: 'Updated By',
  setDealPipeline: 'Set Deal Pipeline',
  selectDeal: 'Select deal',
  setDealOwner: 'Set Deal Owner',
  addLineItem: 'Add line item',
  setAssignedTo: 'Set Assigned to',
  isEmpty: 'is empty',
  isNotEmpty: 'is not empty',
  deal: 'deal',
  contact: 'contact',
  product: 'product',
  user: 'user',
};
