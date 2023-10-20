import { useState } from 'react';
import { useSnackbar } from 'notistack';

export function useHeader() {
  const { enqueueSnackbar } = useSnackbar();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isActive, setActive] = useState<any>([]);
  const [receivedItemsEnabled, setReceivedItemsEnabled] =
    useState<boolean>(false);
  const [selectedMenuItemText, setSelectedMenuItemText] =
    useState<string>('Open');
  const [receivedInventoryEnabled, setReceivedInventoryEnabled] =
    useState<boolean>(true);

  const [actionPop, setActionPop] = useState<HTMLButtonElement | null>(null);
  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionPop(event.currentTarget);
  };
  const handleActionClose = () => {
    setActionPop(null);
  };
  const openAction = Boolean(actionPop);
  const handleCheckboxChange = (event: any) => {
    setActive(event.target.checked);
  };

  const [actionExportPop, setActionExportPop] =
    useState<HTMLButtonElement | null>(null);

  const handleActionExportClick = (event: any) => {
    setActionExportPop(event.currentTarget);
  };
  const handleActionExportClose = () => {
    setActionExportPop(null);
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
    receivedInventoryEnabled,
    setReceivedInventoryEnabled,
    selectedMenuItemText,
    setSelectedMenuItemText,
  };
}
