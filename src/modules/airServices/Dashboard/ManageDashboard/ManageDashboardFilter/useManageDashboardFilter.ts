import { useForm } from 'react-hook-form';
import {
  manageDashboardFilterFormDefaultValuesDynamic,
  manageDashboardsFilterFormFieldsDynamic,
} from './ManageDashboardFilter.data';
import { PAGINATION } from '@/config';
import {
  useLazyGetDashboardNameListDropdownListForDashboardQuery,
  useLazyGetDashboardOwnersDropdownListForDashboardQuery,
} from '@/services/airServices/dashboard';
import useAuth from '@/hooks/useAuth';
import { PortalComponentPropsI } from '../ManageDashboard.interface';

export const useManageDashboardFilter = (props: PortalComponentPropsI) => {
  const {
    setIsPortalOpen,
    setDashboardFilterLists,
    dashboardFilterLists,
    setPage,
  } = props;

  const auth = useAuth();

  const { _id: productId } = auth?.product;

  const methods = useForm({
    defaultValues:
      manageDashboardFilterFormDefaultValuesDynamic(dashboardFilterLists),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    const dashboardFilteredFields: any = Object?.entries(data || {})
      ?.filter(
        ([, value]: any) =>
          value !== undefined &&
          value != '' &&
          value != null &&
          value?._id !== 'All',
      )
      ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});

    if (!Object?.keys(dashboardFilteredFields || {})?.length) {
      setDashboardFilterLists?.(dashboardFilteredFields);
      closeDashboardFilterForm();
      return;
    }

    setPage?.(PAGINATION?.CURRENT_PAGE);
    setDashboardFilterLists?.(dashboardFilteredFields);
    closeDashboardFilterForm();
  };

  const closeDashboardFilterForm = () => {
    reset();
    setIsPortalOpen?.(false);
  };

  const resetDashboardFilterForm = async () => {
    if (!!Object?.keys(dashboardFilterLists ?? {})?.length) {
      setDashboardFilterLists?.({});
    }
    reset();
    setIsPortalOpen?.(false);
  };

  const apiQueryOwner =
    useLazyGetDashboardOwnersDropdownListForDashboardQuery();
  const apiQueryDashboardName =
    useLazyGetDashboardNameListDropdownListForDashboardQuery();

  const dashboardFilterFormFields = manageDashboardsFilterFormFieldsDynamic(
    apiQueryDashboardName,
    apiQueryOwner,
    productId,
  );

  return {
    methods,
    handleSubmit,
    onSubmit,
    resetDashboardFilterForm,
    dashboardFilterFormFields,
  };
};
