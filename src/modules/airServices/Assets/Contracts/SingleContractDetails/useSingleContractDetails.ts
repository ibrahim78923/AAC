import { useState } from 'react';
import { singleContractDetailsActionDropdownFunction } from './SingleContractDetails.data';
import { useRouter } from 'next/router';
import { useDeleteContractMutation } from '@/services/airServices/assets/contracts';
import { AIR_SERVICES } from '@/constants';

import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useSingleContractDetails = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [terminateModalOpen, setTerminateModalOpen] = useState(false);
  const router = useRouter();

  const { contractId } = router?.query;
  const [deleteContract] = useDeleteContractMutation();
  const handleDeleteBtn = async () => {
    const updatedData = { queryParams: { ids: [contractId] } };

    try {
      await deleteContract(updatedData)?.unwrap();
      setDeleteModalOpen?.(false);
      router?.push(AIR_SERVICES?.ASSETS_CONTRACTS);
      successSnackbar('Contract Deleted Successfully!');
    } catch (error: any) {
      errorSnackbar?.();
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
