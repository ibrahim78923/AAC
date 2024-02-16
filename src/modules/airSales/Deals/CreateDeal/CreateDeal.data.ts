import {
  RHFSelect,
  RHFSwitchableDatepicker,
  RHFTextField,
} from '@/components/ReactHookForm';

import { useGetUsersListQuery } from '@/services/airSales/deals';
import useDealTab from '../DealTab/useDealTab';

export const createDealData = () => {
  const userRole = 'ORG_EMPLOYEE';
  const { pipelineData, DealsLifecycleStageData } = useDealTab();
  const { data: UserListData } = useGetUsersListQuery({ role: userRole });

  return [
    {
      componentProps: {
        name: 'name',
        label: 'Deal Name',
        required: true,
        placeholder: 'Enter Name',
      },
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'dealPiplineId',
        label: 'Deal Pipeline',
        select: true,
        required: true,
      },
      options: pipelineData?.data?.dealpipelines?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })) ?? [{ label: '', value: '' }],
      component: RHFSelect,
    },
    {
      componentProps: {
        name: 'dealStageId',
        label: 'Deal Stage',
        select: true,
        required: true,
      },
      options: DealsLifecycleStageData?.data?.lifecycleStages?.map(
        (item: any) => ({
          value: item?._id,
          label: item?.name,
        }),
      ),
      component: RHFSelect,
    },
    {
      title: 'Amount',
      componentProps: {
        name: 'amount',
        label: 'Amount',
        placeholder: 'Enter Amount',
        type: 'number',
      },
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'closeDate',
        label: 'Close Date',
        placeholder: 'Monday, January 30, 2023',
      },
      component: RHFSwitchableDatepicker,
    },
    {
      title: 'Deal Owner',
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
    },
    {
      componentProps: {
        name: 'addLineItemId',
        label: 'Add Line Item',
        select: true,
      },
      options: [
        { value: 'Sample Product: £20', label: 'Sample Product: £20' },
        {
          value: 'Orcalo Product: £5/month',
          label: 'Orcalo Product: £5/month',
        },
      ],
      component: RHFSelect,
    },
    {
      componentProps: {
        name: 'billingFrequency',
        label: 'Billing Frequency',
        select: true,
      },
      options: [
        { value: 'monthly', label: 'monthly' },
        { value: 'quarterly', label: 'quarterly' },
      ],
      component: RHFSelect,
    },
  ];
};
