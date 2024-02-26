import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  groupValidationSchema,
  groupDefaultValues,
} from './UpsertSingleGroup.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useUpsertSingleGroup = (props: any) => {
  const {
    setIsDrawerOpen,
    setIsAddDrawerOpen,
    setIsEditOpen,
    selectedSendData,
  } = props;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDrawerDeleteBtn = () => {
    setIsDrawerOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handelDefaultDrawer = () => {
    setIsEditOpen(false);
    setIsDrawerOpen(false);
    setIsAddDrawerOpen(false);
  };

  const groupMethods: any = useForm<any>({
    resolver: yupResolver(groupValidationSchema),
    defaultValues: groupDefaultValues(),
  });
  const { handleSubmit, reset } = groupMethods;

  const isSubmit = async () => {
    enqueueSnackbar('Group Added Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setIsEditOpen(false);
    setIsDrawerOpen(false);
    setIsAddDrawerOpen(false);
    reset(groupDefaultValues());
  };

  const editSubmit = async () => {
    enqueueSnackbar('Group Edit Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setIsEditOpen(false);
    setIsDrawerOpen(false);
    setIsAddDrawerOpen(false);
    reset(groupDefaultValues());
  };

  const handleOnsubmit = handleSubmit(isSubmit);
  const handleEditSubmit = handleSubmit(editSubmit);

  useEffect(() => {
    reset(() => groupDefaultValues(selectedSendData));
  }, [selectedSendData, reset]);

  return {
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDelete,
    handleDrawerDeleteBtn,
    handelDefaultDrawer,
    groupMethods,
    handleOnsubmit,
    handleEditSubmit,
  };
};
