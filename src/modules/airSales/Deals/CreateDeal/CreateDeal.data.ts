import {
  RHFMultiCheckbox,
  RHFSelect,
  RHFSwitchableDatepicker,
  RHFTextField,
} from '@/components/ReactHookForm';

import { useGetUsersListQuery } from '@/services/airSales/deals';
import useDealTab from '../DealTab/useDealTab';
import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
  dealPipelineId: Yup?.string()?.required('Field is Required'),
  dealStageId: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  name: '',
  dealPipelineId: '',
  ownerId: '',
  dealStageId: '',
  products: [],
};
export const createDealData = ({ dealPipelineId }: any) => {
  const userRole = 'ORG_EMPLOYEE';
  const { pipelineData, salesProduct } = useDealTab();
  const { data: UserListData } = useGetUsersListQuery({ role: userRole });
  const filteredStages =
    pipelineData?.data?.dealpipelines?.find(
      (pipeline: any) => pipeline?._id === dealPipelineId,
    )?.stages || [];

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
        name: 'dealPipelineId',
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
      options: filteredStages?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
      component: RHFSelect,
    },
    {
      title: 'Amount',
      componentProps: {
        name: 'amount',
        label: 'Amount',
        placeholder: 'Enter Amount',
        type: 'number',
        InputProps: { inputProps: { min: 0 } },
      },
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'closeDate',
        label: 'Close Date',
        placeholder: 'MM/DD/YYYY',
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
        name: 'products',
        GridView: 6,
        isCheckBox: true,
        label: 'Add Line Item',
        required: true,
        options: salesProduct?.data?.salesproducts?.map((item: any) => ({
          value: item?._id,
          label: item?.name,
        })),
        fullWidth: true,
      },
      component: RHFMultiCheckbox,
      md: 12,
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
