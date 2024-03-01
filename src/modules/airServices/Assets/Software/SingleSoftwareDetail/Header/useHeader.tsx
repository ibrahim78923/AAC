import { AIR_SERVICES } from '@/constants';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useDeleteSoftwareMutation,
  useEditSoftwareMutation,
  useLazyGetUserDropdownQuery,
  useLazyGetSoftwareByIdQuery,
} from '@/services/airServices/assets/software';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { MouseEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  upsertSoftwareFormDefaultValues,
  upsertSoftwareFormValidationSchema,
} from '../../UpsertSoftware/UpsertSoftware.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export function useHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const softwareId: any = searchParams.get('softwareId');
  const [deleteSoftwareTrigger, { isLoading }] = useDeleteSoftwareMutation();
  const deleteSoftware = async () => {
    try {
      const response: any = await deleteSoftwareTrigger(softwareId)?.unwrap();
      enqueueSnackbar(response?.message ?? 'Software deleted successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setDeleteModalOpen(false);
      router?.push(AIR_SERVICES?.ASSETS_SOFTWARE);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.error ?? 'Software not deleted', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const moveBackArrow = () => {
    router?.push({
      pathname: AIR_SERVICES?.ASSETS_SOFTWARE,
    });
  };
  const [getSoftwareByIdTrigger, { data }] = useLazyGetSoftwareByIdQuery();
  const softwareByIdParams = { id: softwareId };
  const softwareData = data?.data?.find((item: any) => item);
  const [editSoftwareTrigger, { isLoading: editLoading }] =
    useEditSoftwareMutation();
  const methods = useForm({
    resolver: yupResolver(upsertSoftwareFormValidationSchema),
    defaultValues: upsertSoftwareFormDefaultValues(softwareData),
  });
  const { handleSubmit, reset } = methods;
  useEffect(() => {
    const handleSoftware = async () => {
      await getSoftwareByIdTrigger(softwareByIdParams);
      reset(upsertSoftwareFormDefaultValues(softwareData));
    };
    handleSoftware();
  }, [anchorEl, softwareId]);
  const submitUpsertSoftware = async (formData: any) => {
    const editSoftwareParams = {
      id: softwareId,
      body: {
        name: formData?.name,
        status: formData?.status,
        type: formData?.type,
        details: {
          description: formData?.description,
          category: formData?.category,
          publisher: formData?.publisher,
          managedBy: formData?.managedBy?._id,
        },
      },
    };
    try {
      const response: any = await editSoftwareTrigger(editSoftwareParams);
      successSnackbar(
        response?.data?.message && 'Software Updated Successfully',
      );
      setIsDrawerOpen(false);
      reset(upsertSoftwareFormDefaultValues(softwareData));
    } catch (error: any) {
      errorSnackbar(error?.data?.error ?? 'An error');
    }
  };
  const submitHandler = handleSubmit(submitUpsertSoftware);
  const onClose = () => {
    setIsDrawerOpen(false);
    reset();
  };
  const userQuery = useLazyGetUserDropdownQuery();
  return {
    isDrawerOpen,
    setIsDrawerOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    handleClick,
    handleClose,
    open,
    anchorEl,
    isLoading,
    deleteSoftware,
    moveBackArrow,
    submitHandler,
    userQuery,
    onClose,
    methods,
    editLoading,
  };
}
