import { useState } from 'react';
import { singleContractDetailsActionDropdownFunction } from './SingleContractDetails.data';
import { useRouter } from 'next/router';
import {
  useDeleteContractMutation,
  useGetSingleContractByIdQuery,
  usePatchContractTerminatedMutation,
} from '@/services/airServices/assets/contracts';
import { AIR_SERVICES } from '@/constants';

import { errorSnackbar, successSnackbar } from '@/utils/api';
import { CONTRACT_STATUS } from '@/constants/strings';

export const useSingleContractDetails = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [terminateModalOpen, setTerminateModalOpen] = useState(false);
  const router = useRouter();

  const { contractId } = router?.query;
  const [deleteContract] = useDeleteContractMutation();
  const [patchContractTerminateTrigger] = usePatchContractTerminatedMutation();
  const getSingleContractParameter = {
    pathParam: {
      contractId,
    },
  };

  const { data }: any = useGetSingleContractByIdQuery(
    getSingleContractParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!contractId,
    },
  );

  const handleSubmitForTerminated = async () => {
    try {
      await patchContractTerminateTrigger({
        contractId,
        statusApproval: CONTRACT_STATUS?.TERMINATED,
      })?.unwrap();
      setTerminateModalOpen?.(false);
      router?.push(AIR_SERVICES?.ASSETS_CONTRACTS);
      successSnackbar('Contract was Terminated Successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setTerminateModalOpen?.(false);
    }
  };
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
      data,
    );

  return {
    singleContractDetailsActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
    terminateModalOpen,
    setTerminateModalOpen,
    handleDeleteBtn,
    handleSubmitForTerminated,
  };
};
