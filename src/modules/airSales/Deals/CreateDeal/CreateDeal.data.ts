import { RHFDatePicker, RHFTextField } from '@/components/ReactHookForm';

import useDealSaleSite from '../useDealSaleSite';
import { useGetUsersListQuery } from '@/services/airSales/deals';

export const createDealData = () => {
  const { pipelineData, DealsLifecycleStageData } = useDealSaleSite();
  const { data: UserListData } = useGetUsersListQuery({ role: 'ORG_EMPLOYEE' });

  return [
    {
      componentProps: {
        name: 'name',
        label: 'Deal Name',
        required: true,
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
      component: RHFTextField,
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
      ) ?? [{ label: '', value: '' }],
      component: RHFTextField,
    },
    {
      title: 'Amount',
      componentProps: {
        name: 'amount',
        label: 'Amount',
        type: 'number',
      },
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'closeDate',
        label: 'Close Date',
      },
      component: RHFDatePicker,
    },
    {
      title: 'Deal Owner',
      componentProps: {
        name: 'dealOwnerId',
        label: 'Deal Owner',
        select: true,
      },
      options: UserListData?.data?.users?.map((item: any) => ({
        value: item?._id,
        label: `${item?.firstName} ${item?.lastName}`,
      })) ?? [{ label: '', value: '' }],
      component: RHFTextField,
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
      component: RHFTextField,
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
      component: RHFTextField,
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
      component: RHFTextField,
    },
  ];
};
