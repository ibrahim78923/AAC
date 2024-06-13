import {
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const createViewValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Required Field'),
});

// Define your default values
export const createViewDefaultValues = {
  name: '',
  contactOwnerId: null,
  lifeCycleStageId: null,
  statusId: null,
  createdAtFilter: null,
  createdByFilter: null,
  sharedWith: 'EVERYONE',
};

export const createViewData = (
  orgId: any,
  contactOwnerData: any,
  lifeCycleStagesData: any,
  contactStatusData: any,
) => {
  return [
    {
      id: 'name',
      componentProps: {
        name: 'name',
        label: 'Name',
        placeholder: 'Enter Name',
        required: true,
      },
      md: 12,
      component: RHFTextField,
    },
    {
      id: 'contactOwnerId',
      component: RHFAutocompleteAsync,
      md: 12,
      componentProps: {
        name: 'contactOwnerId',
        label: 'Contact Owner',
        placeholder: 'Select Owner',
        apiQuery: contactOwnerData,
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
        apiQuery: lifeCycleStagesData,
        getOptionLabel: (option: any) => option?.name,
        externalParams: {},
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
        apiQuery: contactStatusData,
        getOptionLabel: (option: any) => option?.name,
        externalParams: {},
      },
    },
    {
      id: 'createdAtFilter',
      componentProps: {
        name: 'createdAtFilter',
        label: 'Created date',
        fullWidth: true,
      },
      md: 12,
      component: RHFDatePicker,
    },
    {
      id: 'createdByFilter',
      component: RHFAutocompleteAsync,
      md: 12,
      componentProps: {
        name: 'createdByFilter',
        label: 'Created By',
        placeholder: 'Select create by',
        apiQuery: contactOwnerData,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: { id: orgId, meta: false },
      },
    },
  ];
};
