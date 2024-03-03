import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ROLES } from '@/constants/strings';
import useDealTab from '@/modules/airSales/Deals/DealTab/useDealTab';
import { useGetUsersListQuery } from '@/services/airSales/deals';
import { useGetSalesProductQuery } from '@/services/airSales/deals/settings/sales-product';
import * as Yup from 'yup';
export const productsValidationSchema = Yup?.object()?.shape({
  dealStatus: Yup?.string(),
  name: Yup?.string()?.trim()?.required('Field is Required'),
  dealPiplineId: Yup?.string()?.trim()?.required('Field is Required'),
  dealStageId: Yup?.string()?.trim()?.required('Field is Required'),
  amount: Yup?.string(),
  closeDate: Yup?.string(),
  ownerId: Yup?.string(),
  priority: Yup?.string(),
  addLineItemId: Yup?.string(),
});

export const productsDefaultValues = {
  dealStatus: 'New Deal',
  name: '',
  dealPiplineId: '',
  dealStageId: '',
  amount: '',
  closeDate: '',
  ownerId: '',
  priority: '',
  addLineItemId: '',
};

export const productsDataArray = (openDrawer: any) => {
  const userRole = ROLES?.ORG_EMPLOYEE;
  const { pipelineData, DealsLifecycleStageData } = useDealTab();
  const { data: UserListData } = useGetUsersListQuery({ role: userRole });
  const query = '&';
  const { data: addLineItem } = useGetSalesProductQuery({
    page: 1,
    pageLimit: 10,
    query,
  });

  return [
    {
      componentProps: {
        name: 'name',
        label: 'Deal Name',
        fullWidth: true,
        required: true,
        placeholder: 'Enter Name',
        disabled: openDrawer === 'View',
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'dealPiplineId',
        label: 'Deal Pipeline',
        select: true,
        required: true,
        disabled: openDrawer === 'View',
      },
      options: pipelineData?.data?.dealpipelines?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })) ?? [{ label: '', value: '' }],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'dealStageId',
        label: 'Deal Stage',
        select: true,
        required: true,
        disabled: openDrawer === 'View',
      },
      options: DealsLifecycleStageData?.data?.lifecycleStages?.map(
        (item: any) => ({
          value: item?._id,
          label: item?.name,
        }),
      ),
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'amount',
        label: 'Amount',
        fullWidth: true,
        placeholder: 'Enter Amount',
        type: 'number',
        disabled: openDrawer === 'View',
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'closeDate',
        label: 'Close Date',
        fullWidth: true,
        disabled: openDrawer === 'View',
      },
      component: RHFDatePicker,
      md: 12,
    },
    {
      componentProps: {
        name: 'ownerId',
        label: 'Deal Owner',
        select: true,
        disabled: openDrawer === 'View',
      },
      options: UserListData?.data?.users?.map((item: any) => ({
        value: item?._id,
        label: `${item?.firstName} ${item?.lastName}`,
      })) ?? [{ label: '', value: '' }],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'priority',
        label: 'Priority',
        select: true,
        disabled: openDrawer === 'View',
      },
      options: [
        { value: '-', label: '-' },
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'addLineItemId',
        label: 'Add Line Item',
        select: true,
        disabled: openDrawer === 'View',
      },
      options: addLineItem?.data?.salesproducts?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
      component: RHFSelect,
      md: 12,
    },
  ];
};
export const drawerTitle: any = {
  Add: 'Add Deal',
  Edit: 'Edit Deal',
  View: 'View Deal',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
