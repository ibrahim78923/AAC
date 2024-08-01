import { ARRAY_INDEX } from '@/constants/strings';
import {
  useChangeReportOwnerMutation,
  useLazyGetReportsOwnersDropdownListForReportsQuery,
} from '@/services/airOperations/reports';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { ReportsListsComponentPropsI } from '../Reports.interface';

export const useChangeReportOwner = (props: ReportsListsComponentPropsI) => {
  const {
    setIsPortalOpen,
    setSelectedReportLists,
    page,
    getReportListData,
    selectedReportLists,
  } = props;

  const [changeReportOwnerTrigger, changeReportOwnerStatus] =
    useChangeReportOwnerMutation();

  const methods = useForm<any>({
    defaultValues: {
      owner: null,
    },
    resolver: yupResolver(
      Yup?.object()?.shape({
        owner: Yup?.mixed()?.nullable()?.required('Owner name is Required'),
      }),
    ),
  });

  const { handleSubmit, reset } = methods;

  const submitChangeOwner = async (formData: any) => {
    const apiDataParameter = {
      queryParams: {
        id: selectedReportLists?.[ARRAY_INDEX?.ZERO]?._id,
      },
      body: {
        owner: formData?.owner?._id,
      },
    };

    try {
      await changeReportOwnerTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Report Owner changed Successfully');
      closeModal?.();
      await getReportListData?.(page);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeModal = () => {
    reset();
    setSelectedReportLists([]);
    setIsPortalOpen?.({});
  };

  const reportOwnerApiQuery =
    useLazyGetReportsOwnersDropdownListForReportsQuery?.();

  return {
    methods,
    handleSubmit,
    submitChangeOwner,
    closeModal,
    reportOwnerApiQuery,
    changeReportOwnerStatus,
  };
};
