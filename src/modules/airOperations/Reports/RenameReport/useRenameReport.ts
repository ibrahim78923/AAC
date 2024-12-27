import { useRenameOperationsReportsMutation } from '@/services/airOperations/reports';
import { ARRAY_INDEX } from '@/constants/strings';
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

const { CURRENT_PAGE } = PAGINATION ?? {};
const { ZERO } = ARRAY_INDEX ?? {};

export const useRenameReport = () => {
  const [renameReportsTrigger, renameReportsStatus] =
    useRenameOperationsReportsMutation();

  const { getReportsList, page } = useGetReportLists();
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.operationsReportsLists?.isPortalOpen,
  );

  const selectedReportsList = useAppSelector(
    (state) => state?.operationsReportsLists?.selectedReportsList,
  );

  const totalRecords = useAppSelector(
    (state) => state?.operationsReportsLists?.totalRecords,
  );

  const refetchApi = async () => {
    const newPage =
      selectedReportsList?.length === totalRecords ? CURRENT_PAGE : page;
    dispatch(setPage<any>(newPage));
    await getReportsList?.(newPage);
  };

  const formLibProps = {
    validationSchema: renameReportFormValidationSchemaDynamic,
    defaultValues: renameReportFormDefaultValuesDynamic?.(),
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const onSubmit = async (formData: RenameReportFormFieldsI) => {
    const apiDataParameter = {
      queryParams: {
        id: selectedReportsList?.[ZERO]?._id,
      },
      body: {
        name: formData?.name,
      },
    };
    try {
      await renameReportsTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Report renamed Successfully');
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
