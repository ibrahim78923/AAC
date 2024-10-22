import { useDeleteRequesterMutation } from '@/services/airServices/settings/user-management/requesters';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { IRequestersProps } from '../Requesters.interface';

export const useDeleteRequester = (props: IRequestersProps) => {
  const {
    selectedRequesterList,
    setSelectedRequesterList,
    getRequestersListData,
    page,
    setDeleteModalOpen,
    setPage,
    totalRecords,
  } = props;

  const [deleteRequesterTrigger, deleteRequesterStatus] =
    useDeleteRequesterMutation();

  const deleteRequester = async () => {
    const deleteArticlesParameter = {
      body: {
        ids: selectedRequesterList?.map((requester: any) => requester?._id),
      },
    };

    try {
      await deleteRequesterTrigger(deleteArticlesParameter)?.unwrap();
      successSnackbar('Requester deleted successfully');
      setSelectedRequesterList?.([]);
      const newPage = selectedRequesterList?.length === totalRecords ? 1 : page;
      setPage?.(newPage);
      await getRequestersListData?.(newPage);
      closeRequesterDeleteModal?.();
    } catch (error: any) {
      errorSnackbar?.();
    }
  };
  const closeRequesterDeleteModal = () => {
    setDeleteModalOpen?.(false);
    setSelectedRequesterList?.([]);
  };

  return {
    deleteRequester,
    closeRequesterDeleteModal,
    deleteRequesterStatus,
  };
};
