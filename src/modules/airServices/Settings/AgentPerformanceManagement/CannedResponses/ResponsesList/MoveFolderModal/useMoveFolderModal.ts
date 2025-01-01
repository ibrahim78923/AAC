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
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormLib } from '@/hooks/useFormLib';

export const useMoveFolderModal = (props: any) => {
  const {
    openMoveFolderModal,
    setOpenMoveFolderModal,
    setSelectedData,
    selectedData,
  } = props;

  const router = useRouter();
  const searchParams = useSearchParams();

  const [cannedResponseId, setCannedResponseId] = useState<any>('');

  useEffect(() => {
    if (router?.isReady) {
      setCannedResponseId(searchParams?.get('id'));
    }
  }, [router?.isReady]);

  const apiQueryFolders = useLazyGetAirServicesSettingsCannedFoldersQuery();

  const formLibProps = {
    validationSchema: moveFolderSchema,
    defaultValues: moveFolderDefaultValues,
  };

  const { reset, methods, handleSubmit } = useFormLib(formLibProps);

  const [moveResponsesTrigger, { isLoading }] =
    usePatchAirServicesSettingsCannedAddMoveResponsesMutation();

  const closeModal = () => {
    setOpenMoveFolderModal?.(false);
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
      successSnackbar('Moved Successfully!');
      closeModal();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  return {
    methods,
    onSubmit,
    openMoveFolderModal,
    closeModal,
    apiQueryFolders,
    isLoading,
    reset,
    handleSubmit,
  };
};
