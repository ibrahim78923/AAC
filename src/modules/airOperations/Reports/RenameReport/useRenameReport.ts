import { useRenameOperationsReportsMutation } from '@/services/airOperations/reports';
import { ARRAY_INDEX, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { RenameReportFormFieldsI } from './RenameReport.interface';
import {
  emptySelectedReportsList,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airOperations/reports/slice';
import { useGetReportLists } from '../ReportHooks/useGetReportLists';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  renameReportFormDefaultValuesDynamic,
  renameReportFormValidationSchemaDynamic,
} from './RenameReport.data';
import { useFormLib } from '@/hooks/useFormLib';

export const useRenameReport = () => {
  const [renameReportsTrigger, renameReportsStatus] =
    useRenameOperationsReportsMutation();

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

  const singleSelectedReportName =
    selectedReportsList?.length === SELECTED_ARRAY_LENGTH?.ONE
      ? selectedReportsList?.[ARRAY_INDEX?.ZERO]?.name
      : undefined;

  const formLibProps = {
    validationSchema: renameReportFormValidationSchemaDynamic,
    defaultValues: renameReportFormDefaultValuesDynamic?.(
      singleSelectedReportName,
    ),
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const onSubmit = async (formData: RenameReportFormFieldsI) => {
    const apiDataParameter = {
      queryParams: {
        id: selectedReportsList?.[ARRAY_INDEX?.ZERO]?._id,
      },
      body: {
        name: formData?.name,
      },
    };
    try {
      await renameReportsTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Report renamed successfully');
      handleClose?.();
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    reset();
    dispatch(emptySelectedReportsList());
    dispatch(setIsPortalClose());
  };

  return {
    onSubmit,
    handleSubmit,
    methods,
    handleClose,
    renameReportsStatus,
    isPortalOpen,
  };
};
