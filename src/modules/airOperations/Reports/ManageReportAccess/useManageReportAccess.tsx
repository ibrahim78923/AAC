import { PAGINATION } from '@/config';
import { useLazyGetAgentDropdownQuery } from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import {
  manageReportAccessDefaultValues,
  manageReportAccessFromFieldsDynamic,
  manageReportAccessValidationSchema,
} from './ManageReportAccess.data';
import { useEffect } from 'react';
import { useManageReportAccessMutation } from '@/services/airOperations/reports';

export const useManageReportAccess = (props: any) => {
  const {
    setIsPortalOpen,
    setSelectedReportLists,
    setPage,
    getReportListData,
    setReportFilter,
    selectedReportLists,
  } = props;

  const [manageReportAccessTrigger, manageReportAccessStatus] =
    useManageReportAccessMutation();

  const methods = useForm<any>({
    defaultValues: manageReportAccessDefaultValues?.(),
    resolver: yupResolver(manageReportAccessValidationSchema),
  });

  const { handleSubmit, reset, control, clearErrors } = methods;

  const watchForAccessType = useWatch({
    control,
    name: 'accessType',
    defaultValue: '',
  });

  useEffect(() => {
    clearErrors();
  }, [watchForAccessType]);

  const submitAssignedTicketsForm = async (formData: any) => {
    const apiSearchParams = new URLSearchParams();

    selectedReportLists?.forEach(
      (reportId: any) => apiSearchParams?.append('ids', reportId),
    );

    const apiDataParameter = {
      queryParams: apiSearchParams,
      body: {
        ...formData,
      },
    };

    try {
      await manageReportAccessTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Ticket assigned Successfully');
      reset();
      await getReportListData?.(PAGINATION?.CURRENT_PAGE, {});
      setReportFilter?.({});
      setPage?.(PAGINATION?.CURRENT_PAGE);
      closeModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeModal = () => {
    reset();
    setSelectedReportLists([]);
    setIsPortalOpen?.({});
  };

  const apiQueryAgent = useLazyGetAgentDropdownQuery();
  const manageReportAccessFromFields =
    manageReportAccessFromFieldsDynamic?.(apiQueryAgent);

  return {
    methods,
    handleSubmit,
    submitAssignedTicketsForm,
    closeModal,
    manageReportAccessFromFields,
    manageReportAccessStatus,
  };
};
