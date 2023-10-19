import { useState } from 'react';

export function useRelatedTickets() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isActive, setActive] = useState<any>([]);
  const handleCheckboxChange = (event: any) => {
    setActive(event.target.checked);
  };
  const [actionPop, setActionPop] = useState<HTMLButtonElement | null>(null);
  const [actionExportPop, setActionExportPop] =
    useState<HTMLButtonElement | null>(null);
  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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

  const openActionExport = Boolean(actionExportPop);

  return {
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
  };
}
