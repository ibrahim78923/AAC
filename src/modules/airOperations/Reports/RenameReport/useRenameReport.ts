import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import * as Yup from 'yup';
import { useRenameReportsMutation } from '@/services/airOperations/reports';

export const useRenameReport = (props: any) => {
  const { setIsPortalOpen, setSelectedReportList, selectedReportLists } = props;

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
      body: {
        reportIds: selectedReportLists,
        name: formData?.name,
      },
    };

    try {
      await renameReportsTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Report renamed Successfully');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    reset();
    setIsPortalOpen?.({});
    setSelectedReportList?.([]);
  };

  return {
    onSubmit,
    handleSubmit,
    methods,
    handleClose,
    renameReportsStatus,
  };
};
