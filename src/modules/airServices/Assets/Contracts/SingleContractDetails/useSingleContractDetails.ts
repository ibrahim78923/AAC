import { useState } from 'react';
import { singleContractDetailsActionDropdownFunction } from './SingleContractDetails.data';
import { useRouter } from 'next/router';

export const useSingleContractDetails = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [terminateModalOpen, setTerminateModalOpen] = useState(false);
  const router = useRouter();

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
  };
};
