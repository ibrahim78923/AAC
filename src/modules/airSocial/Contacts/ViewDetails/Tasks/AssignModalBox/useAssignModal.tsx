import { useEffect } from 'react';
import { useLazyGetAssignedUsersQuery } from '@/services/airSales/task';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { reAssignTaskDefaultValues } from './AssignModal.data';
import useAuth from '@/hooks/useAuth';
import { usePatchContactTaskMutation } from '@/services/commonFeatures/contacts';
import { enqueueSnackbar } from 'notistack';

const useAssignModal = (
  data: any,
  handleCloseModal: any,
  setSelectedRow: any,
) => {
  const theme = useTheme();
  const { user }: any = useAuth();
  const orgId = user?.organization?._id;
  const usersData = useLazyGetAssignedUsersQuery();
  const methods: any = useForm({
    defaultValues: reAssignTaskDefaultValues(data),
  });

  const { handleSubmit: handleMethodAssignee } = methods;

  useEffect(() => {
    if (data) {
      methods.reset(reAssignTaskDefaultValues(data));
    }
  }, [data]);

  const [reAssignTask, { isLoading: loadingReAssignTask }] =
    usePatchContactTaskMutation();
  const onSubmitReassign = async (values: any) => {
    try {
      await reAssignTask({
        id: data?._id,
        body: { assignTo: values?.assignTo?._id },
      })?.unwrap();
      handleCloseModal();
      setSelectedRow([]);
      enqueueSnackbar('New person has been assigned successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleSubmitReassign = handleMethodAssignee(onSubmitReassign);

  return {
    theme,
    orgId,
    methods,
    usersData,
    loadingReAssignTask,
    handleSubmitReassign,
  };
};

export default useAssignModal;
