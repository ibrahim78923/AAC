import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import * as Yup from 'yup';
import { useRenameReportsMutation } from '@/services/airOperations/reports';
import { ARRAY_INDEX } from '@/constants/strings';

export const useRenameReport = (props: any) => {
  const {
    setIsPortalOpen,
    setSelectedReportLists,
    page,
    getReportListData,
    selectedReportLists,
  } = props;

  const [renameReportsTrigger, renameReportsStatus] =
    useRenameReportsMutation();

  const methods: any = useForm<any>({
    resolver: yupResolver(
      Yup?.object()?.shape({
        name: Yup?.string()?.trim()?.required('Report name is required'),
      }),
    ),
    defaultValues: { name: '' },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (formData: any) => {
    const apiDataParameter = {
      queryParams: {
        id: selectedReportLists?.[ARRAY_INDEX?.ZERO]?._id,
      },
      body: {
        name: formData?.name,
      },
    };
    try {
      await renameReportsTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Report renamed Successfully');
      handleClose?.();
      await getReportListData?.(page);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    reset();
    setIsPortalOpen?.({});
    setSelectedReportLists?.([]);
  };

  return {
    onSubmit,
    handleSubmit,
    methods,
    handleClose,
    renameReportsStatus,
  };
};
