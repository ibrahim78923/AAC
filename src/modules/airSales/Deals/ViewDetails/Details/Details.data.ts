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
import { ROLES } from '@/constants/strings';
import { useLazyGetDealOwnersListQuery } from '@/services/common-APIs';

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
  createdDate: '',
  closeDate: '',
};

export const detailsDataArray = (dealPipelineId: string) => {
  const { getDealOwnerContacts } = useDetails({});
  const { pipelineData } = useDealTab();
  const userListData = useLazyGetDealOwnersListQuery();

  const filteredStages =
    pipelineData?.data?.dealpipelines?.find(
      (pipeline: any) => pipeline?._id === dealPipelineId,
    )?.stages || [];

  return [
    {
      componentProps: {
        name: 'name',
        label: 'Deal Name',
        placeholder: 'Name',
        fullWidth: true,
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
        fullWidth: true,
      },
      component: RHFTextField,
      md: 4,
    },
    {
      componentProps: {
        placeholder: 'Select deal owner',
        name: 'ownerId',
        label: 'Deal Owner',
        apiQuery: userListData,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: { role: ROLES?.ORG_EMPLOYEE },
        queryKey: 'role',
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
        label: 'Pipeline',
        select: true,
      },
      options: pipelineData?.data?.dealpipelines?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })) ?? [{ label: '', value: '' }],
      component: RHFSelect,
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

        fullWidth: true,
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
