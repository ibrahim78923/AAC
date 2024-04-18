import * as Yup from 'yup';
export const salesSchema: any = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
  schedule: Yup?.string()?.when('type', {
    is: (type: any) => type === workflowTypes?.scheduled,
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
          fieldName: Yup?.mixed()?.required('Required'),
          condition: Yup?.string()?.required('Required'),
          fieldValue: Yup?.mixed()?.when('condition', {
            is: (type: string) =>
              type === workflowTypes?.isEmpty ||
              workflowTypes?.isNotEmpty ||
              workflowTypes?.isBlank,
            then: (schema: any) => schema?.notRequired(),
            otherwise: (schema: any) => schema?.required('Required'),
          }),
        }),
      ),
    }),
  ),
  actions: Yup?.array()?.of(
    Yup?.object()?.shape({
      fieldName: Yup?.mixed()?.required('Required'),
      fieldValue: Yup?.mixed()?.required('Required'),
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
      conditions: [{ fieldName: null, condition: '', fieldValue: null }],
    },
  ],
  actions: [{ fieldName: null, fieldValue: null }],
};

export const workflowTypes = {
  eventBase: 'EVENT_BASE',
  scheduled: 'SCHEDULED',
  isEmpty: 'is empty',
  isNotEmpty: 'is not empty',
  isBlank: 'is blank',
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
  users: 'users',
  isIn: 'is in',
  isNotIn: 'is not in',
  dealPipeline: 'Deal Pipeline',
  dealpipelines: 'dealpipelines',
  dealStage: 'Deal Stage',
  lifecycleStages: 'lifecycleStages',
};
