import { useState } from 'react';
import { useSnackbar } from 'notistack';

export function useRelatedTickets() {
  const { enqueueSnackbar } = useSnackbar();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isActive, setActive] = useState<any>([]);
  const [receivedItemsEnabled, setReceivedItemsEnabled] =
    useState<boolean>(false);
  const handleCheckboxChange = (event: any) => {
    setActive(event.target.checked);
  };
  const [actionPop, setActionPop] = useState<HTMLButtonElement | null>(null);
  const [actionExportPop, setActionExportPop] =
    useState<HTMLButtonElement | null>(null);
  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(event.currentTarget);
    setActionPop(event.currentTarget);
  };

  const handleActionClose = () => {
    setActionPop(null);
  };
  const openAction = Boolean(actionPop);

  const handleActionExportClick = (event: any) => {
    setActionExportPop(event.currentTarget);
  };
  const handleActionExportClose = () => {
    setActionExportPop(null);
  };

  const handleOrderItem = () => {
    setReceivedItemsEnabled(true);
  };

  const handleCancelItem = () => {
    setReceivedItemsEnabled(false);
  };
  const openActionExport = Boolean(actionExportPop);

  return {
    enqueueSnackbar,
    setIsDrawerOpen,
    isDrawerOpen,
    handleCheckboxChange,
    setActive,
    isActive,
    handleActionClick,
    actionExportPop,
    actionPop,
    setActionPop,
    handleActionExportClose,
    openAction,
    handleActionExportClick,
    handleActionClose,
    openActionExport,
    receivedItemsEnabled,
    setReceivedItemsEnabled,
    handleOrderItem,
    handleCancelItem,
  };
}
