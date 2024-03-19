import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

const conditionOptions = ['BE 1', 'BE 2', 'BE 3', 'BE 4'];
export const conditionTypeOptions = [
  { label: 'Match ALL condition in this group', value: 'AND' },
  { label: 'Match ANY condition in this group', value: 'OR' },
];

export const workflowConditionsGroupDataArray = (index: any) => [
  {
    _id: 9080,
    gridLength: 6,
    componentProps: {
      name: `groups.${index}.name`,
      label: 'Add group name',
      size: 'small',
      required: true,
      placeholder: 'Name here',
    },
    component: RHFTextField,
  },
  {
    _id: 7865,
    gridLength: 6,
    componentProps: {
      name: `groups.${index}.conditionType`,
      label: 'Condition Type',
      size: 'small',
      placeholder: 'Select',
      options: conditionTypeOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
];

export const workflowConditionsDataArray = (
  moduleType: any,
  index: any,
  subIndex: any,
) => {
  const keyDropdown = workflowModuleOption[moduleType] || [];
  return [
    {
      _id: 5465,
      gridLength: 4,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.key`,
        size: 'small',
        placeholder: 'Select',
        options: keyDropdown,
      },
      component: RHFAutocomplete,
    },
    {
      _id: 3456,
      gridLength: 4,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.condition`,
        size: 'small',
        placeholder: 'Select',
        options: conditionOptions,
      },
      component: RHFAutocomplete,
    },
    {
      _id: 2545,
      gridLength: 4,
      componentProps: {
        name: `groups.${index}.conditions.${subIndex}.value`,
        size: 'small',
        placeholder: 'Select',
        options: conditionOptions,
      },
      component: RHFAutocomplete,
    },
  ];
};

const salesDropdown = [
  '_id',
  'name',
  'type',
  'priority',
  'status',
  'dealId',
  'associate',
  'contactsIds',
  'ticketsIds',
  'companiesIds',
  'dealsIds',
  'assignTo',
  'dueDate',
  'completedAt',
  'time',
  'recordId',
  'reminder',
  'note',
  'createdById',
  'updatedById',
  'deletedById',
  'deletedAt',
  'isDeleted',
];
const dealsDropdown = [
  '_id',
  'name',
  'dealPiplineId',
  'dealStageId',
  'amount',
  'closeDate',
  'ownerId',
  'priority',
  'addLineItemId',
  'billingFrequency',
  'type',
  'contactedPersonId',
  'contactMode',
  'probability',
  'activitiesIds',
  'contactsIds',
  'ticketsIds',
  'companiesIds',
  'products',
  'quotesIds',
  'attachmentsIds',
  'playbooksIds',
  'tasksIds',
  'callsIds',
  'emailsIds',
  'meetingsIds',
  'createdBy',
  'updatedBy',
  'deletedBy',
  'isDeleted',
  'recordIds',
  'deletedAt',
];
const quotesDropdown = [
  '_id',
  'buyerContactId',
  'buyerCompanyId',
  'sellerContactId',
  'sellerCompanyId',
  'name',
  'dealId',
  'template',
  'expiryDate',
  'notes',
  'termsAndConditions',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'createdBy',
  'updatedBy',
  'deletedBy',
  'isDeleted',
  'isSubmitted',
];
export const workflowModuleOption: any = {
  DEALS: dealsDropdown,
  QUOTES: quotesDropdown,
  SALES_TASKS: salesDropdown,
};
