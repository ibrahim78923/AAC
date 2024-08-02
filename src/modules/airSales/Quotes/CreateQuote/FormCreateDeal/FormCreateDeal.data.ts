import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFMultiCheckbox,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { useLazyGetUsersListDropdownQuery } from '@/services/airSales/deals';
import * as Yup from 'yup';
import { getSession } from '@/utils';
import { ROLES } from '@/constants/strings';
import { capitalizeFirstLetter } from '@/utils/api';
import useDealTab from '@/modules/airSales/Deals/DealTab/useDealTab';

export const validationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
  dealPipelineId: Yup?.object()?.required('Field is Required'),
  dealStageId: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  name: '',
  dealPipelineId: null,
  ownerId: null,
  dealStageId: '',
  products: [],
  closeDate: null,
};
export const createDealData = ({ dealPipelineId }: any) => {
  const { user }: any = getSession();
  const organizationId: any = user?.organization?._id;

  const { salesProduct, pipelineListDropdown }: any = useDealTab();

  const UserListData = useLazyGetUsersListDropdownQuery();

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
        required: true,
        placeholder: 'Enter Name',
      },
      component: RHFTextField,
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
    },
    {
      componentProps: {
        name: 'dealStageId',
        label: 'Deal Stage',
        disabled: !dealPipelineId,
        required: true,
        select: true,
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
        minDate: new Date(),
        fullWidth: true,
        require: false,
      },
      md: 12,
      component: RHFDatePicker,
    },
    {
      title: 'Deal Owner',
      componentProps: {
        name: 'ownerId',
        label: 'Deal Owner',
        placeholder: 'Select Owner',
        apiQuery: UserListData,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: {
          role: ROLES?.ORG_EMPLOYEE,
          organization: organizationId,
        },
      },
      component: RHFAutocompleteAsync,
    },
    {
      componentProps: {
        name: 'priority',
        label: 'Priority',
        placeholder: 'Select Priority',
        options: ['Low', 'Medium', 'High'],
      },
      component: RHFAutocomplete,
    },
    {
      componentProps: {
        name: 'products',
        GridView: 6,
        isCheckBox: true,
        label: 'Add Line Item',
        options: salesProduct?.data?.salesproducts?.map((item: any) => ({
          value: item?._id,
          label: capitalizeFirstLetter(item?.name),
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
        placeholder: 'Select Frequency',
        select: true,
        options: ['monthly', 'quarterly'],
      },
      component: RHFAutocomplete,
    },
  ];
};
