import * as Yup from 'yup';
import {
  andRunOptions,
  triggerOptions,
} from './WorkflowRunAndTrigger/WorkflowRunAndTrigger.data';
import {
  conditionTypeOptions,
  workflowModuleOption,
} from './WorkflowConditions/WorkflowConditions.data';
import { actionKeys } from './WorkflowActionExecuted/WorkflowActionExecuted.data';
import {
  capitalizeFirstLetter,
  monthFormatter,
  timeFormatter,
} from '@/utils/api';
export const salesSaveSchema: any = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
});
export const salesSchema: any = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
  description: Yup?.string(),
  schedule: Yup?.string()?.when('type', {
    is: (type: any) => type === workflowTypes?.scheduled,
    then: (schema: any) => schema?.required('Required'),
    otherwise: (schema: any) => schema?.notRequired(),
  }),
  scheduleMonth: Yup?.date(),
  scheduleDay: Yup?.string(),
  scheduleDate: Yup?.mixed()?.nullable(),
  time: Yup?.date(),
  custom: Yup?.object(),
  type: Yup?.string(),
  module: Yup?.string()?.required('Required'),
  events: Yup?.mixed()?.when('type', {
    is: (type: string) => type === workflowTypes?.eventBase,
    then: (schema: any) => schema?.required('Required'),
    otherwise: (schema: any) => schema?.notRequired(),
  }),
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
            is: (condition: string) =>
              condition === workflowTypes?.isEmpty ||
              condition === workflowTypes?.isNotEmpty ||
              condition === workflowTypes?.isBlank,
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
      fieldValue: Yup?.mixed()?.nullable()?.required('Required'),
    }),
  ),
});
const type: any = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  ANNUALLY: 'annually',
  CUSTOM: 'custom',
};
export const salesValues = (data: any) => {
  const keyDropdown = workflowModuleOption[data?.module] || [];
  const actionKeyOptions = actionKeys[data?.module] || [];
  const time = data?.schedule?.[type[data?.schedule?.type]]?.time;
  const startDate = data?.schedule?.custom?.startDate;
  const endDate = data?.schedule?.custom?.endDate;
  return {
    title: data?.title ?? '',
    description: data?.description ?? '',
    type: data?.type ?? 'EVENT_BASE',
    schedule: capitalizeFirstLetter(data?.schedule?.type) ?? 'Daily',
    scheduleMonth: data?.schedule?.annually?.month
      ? monthFormatter(data?.schedule?.annually?.month)
      : new Date(),
    scheduleDay:
      capitalizeFirstLetter(
        data?.schedule?.weekly?.days?.find((item: string) => item),
      ) ?? 'Monday',
    scheduleDate: data?.schedule?.monthly?.day ?? 1,
    time: time ? new Date(timeFormatter(time)) : new Date(),
    custom: {
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : new Date(),
      key: 'selection',
    },
    module: data?.module ?? 'DEALS',
    events:
      triggerOptions?.find(
        (item: any) =>
          item?.value === data?.events?.find((event: any) => event),
      ) ?? null,
    runType:
      andRunOptions?.find((item: any) => item?.value === data?.runType) ?? null,
    groupCondition: data?.groupCondition ?? 'OR',
    groups: data?.groups?.map((group: any, groupIndex: number) => ({
      name: group?.name ?? '',
      conditionType:
        conditionTypeOptions?.find(
          (type: any) => type?.value === group?.conditionType,
        ) ?? null,
      conditions: group?.conditions?.map(
        (condition: any, conditionIndex: number) => ({
          fieldName:
            keyDropdown?.find(
              (fieldName: any) => fieldName?.value === condition?.fieldName,
            ) ?? null,
          condition: condition?.condition ?? '',
          fieldValue:
            condition?.fieldType === workflowFields?.objectId
              ? data?.[
                  `group_${condition?.fieldName}${groupIndex}${conditionIndex}_lookup`
                ]
              : condition?.fieldType === workflowFields?.date
              ? new Date(condition?.fieldValue)
              : condition?.fieldValue ?? null,
        }),
      ),
    })) ?? [
      {
        name: '',
        conditionType: null,
        conditions: [{ fieldName: null, condition: '', fieldValue: null }],
      },
    ],
    actions: data?.actions?.map((action: any, actionIndex: number) => ({
      fieldName:
        actionKeyOptions?.find(
          (fieldName: any) => fieldName?.value === action?.fieldName,
        ) ?? null,
      fieldValue:
        action?.fieldType === workflowFields?.objectId
          ? data?.[`action_${action?.fieldName}${actionIndex}_lookup`]
          : action?.fieldType === workflowFields?.date
          ? new Date(action?.fieldValue)
          : action?.fieldValue ?? null,
    })) ?? [{ fieldName: null, fieldValue: null }],
  };
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
  setDealStage: 'Set Deal Stage',
  save: 'save',
  upsert: 'upsert',
  test: 'test',
};
