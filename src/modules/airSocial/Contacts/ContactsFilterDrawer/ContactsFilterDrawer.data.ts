import {
  RHFAutocompleteAsync,
  RHFDatePicker,
} from '@/components/ReactHookForm';

export const FilterData = (
  orgId: any,
  contactOwners: any,
  lifeCycleStages: any,
  contactStatuses: any,
) => {
  return [
    {
      id: 'contactOwnerId',
      component: RHFAutocompleteAsync,
      md: 12,
      componentProps: {
        name: 'contactOwnerId',
        label: 'Contact Owner',
        placeholder: 'Select Owner',
        apiQuery: contactOwners,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: { id: orgId, meta: false },
      },
    },
    {
      id: 'lifeCycleStageId',
      component: RHFAutocompleteAsync,
      md: 12,
      componentProps: {
        name: 'lifeCycleStageId',
        label: 'Lifecycle Stage',
        placeholder: 'Select Lifecycle Stage',
        apiQuery: lifeCycleStages,
        getOptionLabel: (option: any) => option?.name,
        externalParams: {
          meta: false,
        },
      },
    },
    {
      id: 'statusId',
      component: RHFAutocompleteAsync,
      md: 12,
      componentProps: {
        name: 'statusId',
        label: 'Status',
        placeholder: 'Select Status',
        apiQuery: contactStatuses,
        getOptionLabel: (option: any) => option?.name,
        externalParams: {},
      },
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
      component: RHFAutocompleteAsync,
      md: 12,
      componentProps: {
        name: 'createdBy',
        label: 'Created By',
        placeholder: 'Select create by',
        apiQuery: contactOwners,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: { id: orgId, meta: false },
      },
    },
    {
      id: 'lastActivityDate',
      componentProps: {
        name: 'lastActivityDate',
        label: 'Last Activity Date',
      },
      component: RHFDatePicker,
    },
  ];
};
