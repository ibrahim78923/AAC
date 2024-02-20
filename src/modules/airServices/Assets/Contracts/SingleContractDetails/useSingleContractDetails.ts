import { useState } from 'react';
import { singleContractDetailsActionDropdownFunction } from './SingleContractDetails.data';
import { useRouter } from 'next/router';
import { useDeleteContractMutation } from '@/services/airServices/assets/contracts';
import { AIR_SERVICES } from '@/constants';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';

export const useSingleContractDetails = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [terminateModalOpen, setTerminateModalOpen] = useState(false);
  const router = useRouter();

  const { contractId } = router?.query;
  const [deleteContract] = useDeleteContractMutation();
  const handleDeleteBtn = async () => {
    const updatedData = { queryParams: { ids: [contractId] } };

    try {
      const res = await deleteContract(updatedData)?.unwrap();
      setDeleteModalOpen?.(false);
      router?.push(AIR_SERVICES?.VENDOR_SETTINGS);
      enqueueSnackbar(res?.data?.message ?? 'Contract Deleted Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
      setDeleteModalOpen?.(false);
    }
  };
  const singleContractDetailsActionDropdown =
    singleContractDetailsActionDropdownFunction(
      setDeleteModalOpen,
      setTerminateModalOpen,
      router,
    );

  return {
    singleContractDetailsActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
    terminateModalOpen,
    setTerminateModalOpen,
    handleDeleteBtn,
  };
};
