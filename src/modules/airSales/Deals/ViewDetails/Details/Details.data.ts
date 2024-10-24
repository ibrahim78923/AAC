import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';
import useDealTab from '@/modules/airSales/Deals/DealTab/useDealTab';
import useDetails from './useDetails';
import { getActiveProductSession } from '@/utils';
import { indexNumbers } from '@/constants';
import { useLazyGetAllUsersDropdownQuery } from '@/services/common-APIs';

export const detailsValidationSchema = Yup?.object()?.shape({
  name: Yup?.string(),
});

export const detailsDefaultValues = {
  name: '',
  amount: '',
  ownerId: '',
  type: '',
  priority: '',
  dealStageId: '',
  dealPipelineId: '',
  contactedPersonId: '',
  contactMode: '',
  lastActivity: '',
  createdDate: null,
  closeDate: new Date(),
  updatedAt: null,
};

export const detailsDataArray = (dealPipelineId: any) => {
  const { getDealOwnerContacts } = useDetails({});
  const { pipelineListDropdown }: any = useDealTab();
  const ownerData = useLazyGetAllUsersDropdownQuery();
  const ActiveProduct = getActiveProductSession();

  const filteredStages: any = pipelineListDropdown
    ? pipelineListDropdown[indexNumbers?.ONE]?.data?.find(
        (pipeline: any) => pipeline?._id === dealPipelineId?._id,
      )?.stages
    : [];

  return [
    {
      componentProps: {
        name: 'name',
        label: 'Deal Name',
        placeholder: 'Name',
      },
      component: RHFTextField,
      md: 4,
    },
    {
      componentProps: {
        name: 'amount',
        label: 'Amount',
        placeholder: '£',
        type: 'number',
      },
      component: RHFTextField,
      md: 4,
    },
    {
      componentProps: {
        placeholder: 'Select deal owner',
        name: 'ownerId',
        label: 'Deal Owner',
        apiQuery: ownerData,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: { productId: ActiveProduct?._id },
      },
      component: RHFAutocompleteAsync,
      md: 4,
    },
    {
      componentProps: {
        placeholder: 'Select type',
        name: 'type',
        label: 'Deal Type',
        options: ['New Business', 'Existing Business'],
      },

      component: RHFAutocomplete,
      md: 4,
    },
    {
      componentProps: {
        name: 'priority',
        label: 'Priority',
        options: ['Low', 'Medium', 'High'],
      },

      component: RHFAutocomplete,
      md: 4,
    },
    {
      componentProps: {
        name: 'dealPipelineId',
        label: 'Deal Pipeline',
        placeholder: 'Select Pipeline',
        apiQuery: pipelineListDropdown,
        getOptionLabel: (option: any) => option?.name,
        externalParams: { meta: false },
        required: true,
        clearIcon: false,
      },
      component: RHFAutocompleteAsync,
      md: 4,
    },
    {
      componentProps: {
        name: 'dealStageId',
        label: 'Stage',
        select: true,
      },
      options: filteredStages?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
      component: RHFSelect,
      md: 4,
    },
    {
      componentProps: {
        name: 'contactedPersonId',
        label: 'Last Contacted Person',
        select: true,
      },
      options: getDealOwnerContacts?.data?.contacts?.map((item: any) => ({
        key: item?._id,
        value: item?._id,
        label: `${item?.firstName} ${item?.lastName}`,
      })) ?? [{ label: '', value: '' }],
      component: RHFSelect,
      md: 4,
    },
    {
      componentProps: {
        placeholder: 'Select mode',
        name: 'contactMode',
        label: 'Contacted Mode',
        options: ['Email', 'Call', 'Meeting'],
      },
      component: RHFAutocomplete,
      md: 4,
    },
    {
      componentProps: {
        name: 'lastActivity',
        label: 'Last Activity',
        placeholder: 'Last Activity',
      },
      component: RHFTextField,
      md: 4,
    },
    {
      componentProps: {
        name: 'createdAt',
        label: 'Created Date',
        fullWidth: true,
      },
      component: RHFDatePicker,
      md: 4,
    },
    {
      componentProps: {
        name: 'closeDate',
        label: 'Closed Date',
        fullWidth: true,
        minDate: new Date(),
      },
      component: RHFDatePicker,
      md: 4,
    },
    {
      componentProps: {
        name: 'updatedAt',
        label: 'Last Activity Date',
        fullWidth: true,
      },
      component: RHFDatePicker,
      md: 4,
    },
  ];
};
