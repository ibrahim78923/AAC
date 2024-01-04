import {
  RHFDatePicker,
  RHFSwitchableDatepicker,
  RHFTextField,
} from '@/components/ReactHookForm';

export const FilterData = (
  contactOwners: any,
  lifeCycleStages: any,
  contactStatuses: any,
) => {
  const ownerOptions = contactOwners.map(() => {
    // return {value: user?._id, label: user?.name}
    return [{ value: '65782dd6406dd444116e1bbd', label: 'mubashir' }];
  });
  const stages = lifeCycleStages?.map((stage: any) => {
    return { value: stage?._id, label: stage?.name };
  });
  const statuses = contactStatuses?.map((status: any) => {
    return { value: status?._id, label: status?.name };
  });
  return [
    {
      id: 'contactOwnerId',
      componentProps: {
        name: 'contactOwnerId',
        label: 'Contact Owner',
        select: true,
      },
      options: ownerOptions,
      component: RHFTextField,
    },
    {
      id: 'lifeCycleStageId',
      componentProps: {
        name: 'lifeCycleStageId',
        label: 'Lifecycle Stage',
        select: true,
      },
      options: stages,
      component: RHFTextField,
    },
    {
      id: 'statusId',
      componentProps: {
        name: 'statusId',
        label: 'Status',
        select: true,
      },
      options: statuses,
      component: RHFTextField,
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
      options: ownerOptions,
      component: RHFTextField,
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
