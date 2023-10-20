import { useState } from 'react';
import { useSnackbar } from 'notistack';

export function useHeader() {
  const { enqueueSnackbar } = useSnackbar();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isADrawerOpen, setIsADrawerOpen] = useState<boolean>(false);
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

  const handleActionClicAction = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setActionButtonPop(event.currentTarget);
  };
  const [selectedMenuItemAction, setSelectedMenuItemAction] =
    useState<string>('Action');
  const [actionButtonPop, setActionButtonPop] =
    useState<HTMLButtonElement | null>(null);

  const openActionButton = Boolean(actionButtonPop);

  const handleActionCloseButton = () => {
    setActionButtonPop(null);
  };
  const [receivedActionItemsEnabled, setReceivedActionItemsEnabled] =
    useState<boolean>(false);

  const [isPurchaseDeleteModal, setIsPurchaseDeleteModal] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
    handleActionClicAction,
    selectedMenuItemAction,
    setSelectedMenuItemAction,
    actionButtonPop,
    setActionButtonPop,
    openActionButton,
    handleActionCloseButton,
    receivedActionItemsEnabled,
    setReceivedActionItemsEnabled,
    isPurchaseDeleteModal,
    setIsPurchaseDeleteModal,
    isAddModalOpen,
    setIsAddModalOpen,
    isADrawerOpen,
    setIsADrawerOpen,
  };
}
