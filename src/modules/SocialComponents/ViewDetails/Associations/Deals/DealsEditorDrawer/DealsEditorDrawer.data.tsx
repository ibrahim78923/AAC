import {
  RHFAutocompleteAsync,
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
  existingDeals: Yup?.string(),
  dealStatus: Yup?.string(),
  name: Yup?.string()?.trim()?.required('Field is Required'),
  dealPipelineId: Yup?.object()?.required('Field is Required'),
  dealStageId: Yup?.string()?.trim()?.required('Field is Required'),
  amount: Yup?.string(),
  closeDate: Yup?.string()?.nullable(),
  ownerId: Yup?.string(),
  priority: Yup?.string(),
  addLineItemId: Yup?.string()?.required('Field is Required'),
});

export const productsValidationSchemaOnExistingDeals = Yup?.object()?.shape({
  existingDeals: Yup?.string()?.required('Field is Required'),
  dealStatus: Yup?.string(),
  name: Yup?.string()?.trim(),
  dealPipelineId: Yup?.string()?.trim(),
  dealStageId: Yup?.string()?.trim(),
  amount: Yup?.string(),
  closeDate: Yup?.string()?.nullable(),
  ownerId: Yup?.string(),
  priority: Yup?.string(),
  addLineItemId: Yup?.string(),
});

export const productsDefaultValues = {
  existingDeals: '',
  dealStatus: 'New Deal',
  name: '',
  dealPipelineId: '',
  dealStageId: '',
  amount: '',
  closeDate: null,
  ownerId: '',
  priority: '',
  addLineItemId: '',
};

export const productsDataArray = (openDrawer: any, dealPipelineId: any) => {
  const userRole = ROLES?.ORG_EMPLOYEE;
  const { data: UserListData } = useGetUsersListQuery({ role: userRole });
  const query = '&';
  const { data: addLineItem } = useGetSalesProductQuery({
    page: 1,
    pageLimit: 10,
    query,
  });
  const { pipelineListDropdown }: any = useDealTab();

  const filteredStages: any = pipelineListDropdown
    ? pipelineListDropdown[1]?.data?.find(
        (pipeline: any) => pipeline?._id === dealPipelineId?._id,
      )?.stages
    : [];

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
        name: 'dealPipelineId',
        label: 'Deal Pipeline',
        placeholder: 'Select Pipeline',
        apiQuery: pipelineListDropdown,
        getOptionLabel: (option: any) => option?.name,
        externalParams: { meta: false },
        required: true,
        clearIcon: false,
        disabled: openDrawer === 'View',
      },
      component: RHFAutocompleteAsync,
    },
    {
      componentProps: {
        name: 'dealStageId',
        label: 'Deal Stage',
        disabled: !dealPipelineId || openDrawer === 'View',
        required: true,
        select: openDrawer === 'View' ? false : true,
      },
      options: filteredStages?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
      component: openDrawer === 'View' ? RHFTextField : RHFSelect,
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
        required: true,
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
