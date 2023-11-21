import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { data, softwareListsColumnsFunction } from './Contracts.data';

export function useContracts() {
  const [contractsData, setContractsData] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [actionPop, setActionPop] = useState<HTMLButtonElement | null>(null);
  const router = useRouter();
  const handleAddNewContractClick = () => {
    router?.push({
      pathname: AIR_SERVICES?.CONTRACT_FORM,
    });
  };
  useEffect(() => {}, []);
  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionPop(event?.currentTarget);
  };
  const softwareListsColumns = softwareListsColumnsFunction(
    contractsData,
    setContractsData,
    data,
    router,
  );
  const handleActionClose = () => {
    setActionPop(null);
  };
  const openAction = Boolean(actionPop);
  const handleSubmitModel = () => {
    enqueueSnackbar('Delete successfully', {
      variant: 'error',
      autoHideDuration: 3000,
    });
    setOpenModel(false);
  };
  return {
    contractsData,
    setContractsData,
    isDrawerOpen,
    setIsDrawerOpen,
    openModel,
    setOpenModel,
    actionPop,
    setActionPop,
    handleAddNewContractClick,
    handleActionClick,
    handleActionClose,
    openAction,
    handleSubmitModel,
    router,
    softwareListsColumns,
  };
}
