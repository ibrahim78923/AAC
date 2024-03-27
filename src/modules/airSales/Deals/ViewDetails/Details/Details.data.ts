import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';
import useDealTab from '@/modules/airSales/Deals/DealTab/useDealTab';
import { useGetUsersListQuery } from '@/services/airSales/deals';
import useDetails from './useDetails';
import { ROLES } from '@/constants/strings';

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
  dealPiplineId: '',
  contactedPersonId: '',
  contactMode: '',
  lastActivity: '',
  createdDate: '',
  closeDate: '',
};

export const detailsDataArray = (dealPiplineId: any) => {
  const userRole = ROLES?.ORG_EMPLOYEE;
  const { getDealOwnerContacts } = useDetails({});
  const { pipelineData } = useDealTab();
  const { data: UserListData } = useGetUsersListQuery({ role: userRole });

  const filteredStages =
    pipelineData?.data?.dealpipelines?.find(
      (pipeline: any) => pipeline?._id === dealPiplineId,
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
        name: 'ownerId',
        label: 'Deal Owner',
        select: true,
      },
      options: UserListData?.data?.users?.map((item: any) => ({
        value: item?._id,
        label: `${item?.firstName} ${item?.lastName}`,
      })) ?? [{ label: '', value: '' }],
      component: RHFSelect,
      md: 4,
    },
    {
      componentProps: {
        name: 'type',
        label: 'Deal Type',
        select: true,
      },
      options: [
        { value: 'new business', label: 'New Business' },
        { value: 'existing business', label: 'Existing Business' },
      ],
      component: RHFSelect,
      md: 4,
    },
    {
      componentProps: {
        name: 'priority',
        label: 'Priority',
        select: true,
      },
      options: [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' },
      ],
      component: RHFSelect,
      md: 4,
    },
    {
      componentProps: {
        name: 'dealPiplineId',
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
        name: 'contactMode',
        label: 'Contacted Mode',
        select: true,
      },
      options: [
        { value: 'Email', label: 'Email' },
        { value: 'Call', label: 'Call' },
        { value: 'Meeting', label: 'Meeting' },
      ],
      component: RHFSelect,
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
