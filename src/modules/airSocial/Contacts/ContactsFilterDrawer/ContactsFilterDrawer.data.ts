import {
  RHFDatePicker,
  RHFSelect,
  RHFSwitchableDatepicker,
} from '@/components/ReactHookForm';

export const FilterData = (
  contactOwners: any,
  lifeCycleStages: any,
  contactStatuses: any,
) => {
  return [
    {
      id: 'contactOwnerId',
      componentProps: {
        name: 'contactOwnerId',
        label: 'Contact Owner',
        select: true,
        placeholder: 'Select Owner',
      },

      options: contactOwners,
      component: RHFSelect,
    },
    {
      id: 'lifeCycleStageId',
      componentProps: {
        name: 'lifeCycleStageId',
        label: 'Lifecycle Stage',
        select: true,
      },
      options: lifeCycleStages,
      component: RHFSelect,
    },
    {
      id: 'statusId',
      componentProps: {
        name: 'statusId',
        label: 'Status',
        select: true,
      },
      options: contactStatuses,
      component: RHFSelect,
    },
    {
      id: 'createdAt',
      componentProps: {
        name: 'createdAt',
        label: 'Created Date',
      },
      component: RHFDatePicker,
    },
    {
      id: 'createdBy',
      componentProps: {
        name: 'createdBy',
        label: 'Created By',
        placeholder: 'Select create by',
        select: true,
      },
      options: contactOwners,
      component: RHFSelect,
    },
    {
      id: 'lastActivityDate',
      componentProps: {
        name: 'lastActivityDate',
        label: 'Last Activity Date',
      },
      component: RHFSwitchableDatepicker,
    },
    {
      id: 'nextActivityDate',
      componentProps: {
        name: 'nextActivityDate',
        label: 'Next Activity Date',
      },
      component: RHFSwitchableDatepicker,
    },
  ];
};
