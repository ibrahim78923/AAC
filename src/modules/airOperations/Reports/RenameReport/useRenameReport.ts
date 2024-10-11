import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import * as Yup from 'yup';
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

  const methods: UseFormReturn<RenameReportFormFieldsI> = useForm({
    resolver: yupResolver(
      Yup?.object()?.shape({
        name: Yup?.string()?.trim()?.required('Report name is required'),
      }),
    ),
    defaultValues: { name: '' },
  });

  const { handleSubmit, reset } = methods;

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
