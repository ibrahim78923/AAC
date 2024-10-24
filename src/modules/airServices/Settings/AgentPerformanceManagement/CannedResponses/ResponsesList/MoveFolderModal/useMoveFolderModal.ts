import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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

export const useMoveFolderModal = (props: any) => {
  const {
    openMoveFolderModal,
    closeMoveFolderModal,
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

  const method = useForm({
    defaultValues: moveFolderDefaultValues,
    resolver: yupResolver(moveFolderSchema),
  });
  const { reset } = method;

  const [moveResponsesTrigger, { isLoading }] =
    usePatchAirServicesSettingsCannedAddMoveResponsesMutation();

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
      closeMoveFolderModal();
      setSelectedData([]);
      reset();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  return {
    method,
    onSubmit,
    openMoveFolderModal,
    closeMoveFolderModal,
    apiQueryFolders,
    isLoading,
  };
};
