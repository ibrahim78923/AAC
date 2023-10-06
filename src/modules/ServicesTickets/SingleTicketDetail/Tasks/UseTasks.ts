import { useState } from 'react';
import { useTasksI } from './Tasks.interface';

export const useTasks = (): useTasksI => {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState<number>(0);
  const [activeCheck, setActiveCheck] = useState<any>([]);
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
    isAddDrawerOpen,
    setIsAddDrawerOpen,
    isDetailDrawerOpen,
    setIsDetailDrawerOpen,
    activeCheck,
    setActiveCheck,
    isEditDrawerOpen,
    setIsEditDrawerOpen,
    actionPop,
    setActionPop,
    handleActionClick,
    handleActionClose,
    openAction,
    actionExportPop,
    setActionExportPop,
    handleActionExportClick,
    handleActionExportClose,
    openActionExport,
  };
};
