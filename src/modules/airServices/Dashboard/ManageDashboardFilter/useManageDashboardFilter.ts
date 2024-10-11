import { useForm } from 'react-hook-form';
import {
  manageDashboardFilterFormDefaultValuesDynamic,
  manageDashboardsFilterFormFieldsDynamic,
} from './ManageDashboardFilter.data';
import { PAGINATION } from '@/config';
import { ManageDashboardPortalComponentPropsI } from '../ManageDashboard/ManageDashboard.interface';
import { filteredEmptyValues } from '@/utils/api';

const { CURRENT_PAGE } = PAGINATION ?? {};

export const useManageDashboardFilter = (
  props: ManageDashboardPortalComponentPropsI,
) => {
  const {
    setIsPortalOpen,
    setDashboardFilterLists,
    dashboardFilterLists,
    setPage,
  } = props;

  const methods = useForm({
    defaultValues:
      manageDashboardFilterFormDefaultValuesDynamic(dashboardFilterLists),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    const dashboardFilteredFields: any = filteredEmptyValues(data);

    if (!Object?.keys(dashboardFilteredFields || {})?.length) {
      setDashboardFilterLists?.(dashboardFilteredFields);
      closeDashboardFilterForm();
      return;
    }

    setPage?.(CURRENT_PAGE);
    setDashboardFilterLists?.(dashboardFilteredFields);
    closeDashboardFilterForm();
  };

  const closeDashboardFilterForm = () => {
    reset();
    closePortal?.();
  };

  const resetDashboardFilterForm = async () => {
    if (!!Object?.keys(dashboardFilterLists ?? {})?.length) {
      setDashboardFilterLists?.({});
    }
    setPage?.(CURRENT_PAGE);
    reset();
    closePortal?.();
  };

  const closePortal = () => {
    setIsPortalOpen?.({});
  };

  const dashboardFilterFormFields = manageDashboardsFilterFormFieldsDynamic();

  return {
    methods,
    handleSubmit,
    onSubmit,
    resetDashboardFilterForm,
    dashboardFilterFormFields,
    closePortal,
  };
};
