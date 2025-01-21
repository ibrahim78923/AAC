import { ARRAY_INDEX, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { useChangeOperationsReportOwnerMutation } from '@/services/airOperations/reports';
import { ChangeReportOwnerFormFieldsI } from './ChangeReportOwner.interface';
import { useGetReportLists } from '../ReportHooks/useGetReportLists';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedReportsList,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airOperations/reports/slice';
import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  changeReportOwnerFormDefaultValuesDynamic,
  changeReportOwnerFormValidationSchemaDynamic,
} from './ChangeReportOwner.data';
import { useFormLib } from '@/hooks/useFormLib';

export const useChangeReportOwner = () => {
  const [changeReportOwnerTrigger, changeReportOwnerStatus] =
    useChangeOperationsReportOwnerMutation();

  const { getReportsList, page } = useGetReportLists();

  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.operationsReportsLists?.isPortalOpen,
  );

  const selectedReportsList: any = useAppSelector(
    (state) => state?.operationsReportsLists?.selectedReportsList,
  );

  const totalRecords = useAppSelector(
    (state) => state?.operationsReportsLists?.totalRecords,
  );

  const refetchApi = async () => {
    const newPage =
      selectedReportsList?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage<any>(newPage));
    await getReportsList?.(newPage);
  };

  const singleSelectedOwner =
    selectedReportsList?.length === SELECTED_ARRAY_LENGTH?.ONE
      ? selectedReportsList?.[ARRAY_INDEX?.ZERO]?.owner
      : undefined;

  const formLibProps = {
    validationSchema: changeReportOwnerFormValidationSchemaDynamic,
    defaultValues:
      changeReportOwnerFormDefaultValuesDynamic?.(singleSelectedOwner),
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const submitChangeOwner = async (formData: ChangeReportOwnerFormFieldsI) => {
    const apiDataParameter = {
      queryParams: {
        id: selectedReportsList?.[ARRAY_INDEX?.ZERO]?._id,
      },
      body: {
        owner: formData?.owner?._id,
      },
    };

    try {
      await changeReportOwnerTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Report owner changed successfully');
      closeModal?.();
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeModal = () => {
    reset();
    dispatch(emptySelectedReportsList());
    dispatch(setIsPortalClose());
  };

  return {
    methods,
    handleSubmit,
    submitChangeOwner,
    closeModal,
    changeReportOwnerStatus,
    isPortalOpen,
  };
};
