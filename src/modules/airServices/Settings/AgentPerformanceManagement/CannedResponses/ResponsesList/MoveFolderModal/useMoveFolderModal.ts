import {
  moveFolderDefaultValues,
  moveFolderSchema,
} from './MoveFolderModal.data';
import {
  usePatchAirServicesSettingsCannedAddMoveResponsesMutation,
  useLazyGetAirServicesSettingsCannedFoldersQuery,
} from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { useRouter } from 'next/router';
import { useFormLib } from '@/hooks/useFormLib';
import { PAGINATION } from '@/config';

export const useMoveFolderModal = (props: any) => {
  const {
    selectedData,
    setSelectedData,
    setIsPortalOpen,
    totalRecords,
    getResponseList,
    page,
    setPage,
  } = props;

  const router = useRouter();

  const cannedResponseId = router?.query?.id;

  const refetchApi = async () => {
    const newPage =
      selectedData?.length === totalRecords ? PAGINATION?.CURRENT_PAGE : page;
    setPage?.(newPage);
    await getResponseList?.(newPage);
  };

  const apiQueryFolders = useLazyGetAirServicesSettingsCannedFoldersQuery();

  const formLibProps = {
    validationSchema: moveFolderSchema,
    defaultValues: moveFolderDefaultValues,
  };

  const { reset, methods, handleSubmit } = useFormLib(formLibProps);

  const [moveResponsesTrigger, { isLoading }] =
    usePatchAirServicesSettingsCannedAddMoveResponsesMutation();

  const closeModal = () => {
    setIsPortalOpen({ isOpen: false, action: '' });
    setSelectedData([]);
    reset();
  };

  const onSubmit = async (data: any) => {
    if (cannedResponseId === data?.folder?._id) {
      errorSnackbar('Cannot move to the same folder!');
      return;
    }
    const upsertCannedResponseFormData = new FormData();
    upsertCannedResponseFormData?.append('folderId', data?.folder?._id);
    selectedData?.forEach(
      (item: any) => upsertCannedResponseFormData?.append('ids', item?._id),
    );
    const moveResponsesParameter = {
      body: upsertCannedResponseFormData,
    };
    try {
      await moveResponsesTrigger(moveResponsesParameter)?.unwrap();
      successSnackbar('Moved successfully!');
      closeModal();
      await refetchApi();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  return {
    methods,
    onSubmit,
    closeModal,
    apiQueryFolders,
    isLoading,
    handleSubmit,
  };
};
