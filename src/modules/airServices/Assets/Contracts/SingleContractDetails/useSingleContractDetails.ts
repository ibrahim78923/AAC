import { useState } from 'react';
import { singleContractDetailsActionDropdownFunction } from './SingleContractDetails.data';
import { useRouter } from 'next/router';
import {
  useDeleteContractMutation,
  useGetSingleContractByIdQuery,
  usePatchContractTerminatedMutation,
} from '@/services/airServices/assets/contracts';
import { CONTRACT_STATUS } from '@/constants/strings';
import { AIR_SERVICES } from '@/constants/routes';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useSingleContractDetails = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [terminateModalOpen, setTerminateModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const { contractId } = router?.query;
  const [deleteContract] = useDeleteContractMutation();
  const [patchContractTerminateTrigger] = usePatchContractTerminatedMutation();
  const getSingleContractParameter = {
    pathParam: {
      contractId,
    },
  };

  const { data, isLoading, isFetching }: any = useGetSingleContractByIdQuery(
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
      errorSnackbar?.(error?.data?.message);
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
    data,
    isLoading,
    isFetching,
  };
};
