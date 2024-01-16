import { MouseEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useLazyGetSoftwareByIdQuery,
  usePutSoftwareMutation,
} from '@/services/airServices/assets/software';
import {
  upsertSoftwareFormDefaultValues,
  upsertSoftwareFormValidationSchema,
} from '../../UpsertSoftware/UpsertSoftware.data';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

export function useHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const softwareId: any = searchParams?.get('softwareId');
  const detailParams = new URLSearchParams();
  detailParams?.append('id', softwareId + '');
  const [getSoftwareDetail, { data }] = useLazyGetSoftwareByIdQuery();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getSoftwareDetail(detailParams);
      } catch (error: any) {
        enqueueSnackbar(error?.error ?? 'An error occurred');
      }
    };
    fetchData();
  }, [anchorEl, softwareId, isDrawerOpen]);
  const softwareData = data?.data?.[0];
  const defaultValues = upsertSoftwareFormDefaultValues(softwareData) || {};
  const methods = useForm({
    resolver: yupResolver(upsertSoftwareFormValidationSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;
  useEffect(() => {
    reset(upsertSoftwareFormDefaultValues(softwareData));
  }, [isDrawerOpen]);
  const handleCloseDrawer = () => {
    reset(upsertSoftwareFormDefaultValues(softwareData));
    setIsDrawerOpen(false);
  };
  const [editSoftware] = usePutSoftwareMutation();
  const submitEditSoftwareForm = async (formData: any) => {
    const queryParams = {
      body: {
        name: formData?.name,
        details: {
          description: formData?.description,
          publisher: formData?.publisher,
          category: formData?.category,
          managedBy: formData?.managedBy?._id,
        },
        status: formData?.status,
        type: formData?.type,
      },
      id: softwareId,
    };
    try {
      const response: any = await editSoftware(queryParams);
      enqueueSnackbar(
        response?.data?.status && 'Software Updated Successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
          autoHideDuration: 1000,
        },
      );
      handleCloseDrawer();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.error ?? 'An error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const submitForm = handleSubmit(submitEditSoftwareForm);
  const handleMoveBack = () => {
    router?.push(AIR_SERVICES?.ASSETS_SOFTWARE);
  };
  return {
    isDrawerOpen,
    setIsDrawerOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    handleClick,
    handleClose,
    open,
    anchorEl,
    methods,
    submitForm,
    handleCloseDrawer,
    handleMoveBack,
  };
}
