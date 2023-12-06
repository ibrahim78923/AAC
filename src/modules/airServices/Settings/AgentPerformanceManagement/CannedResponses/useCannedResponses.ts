import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';

export const useCannedResponses = () => {
  const router = useRouter();
  const [actionPop, setActionPop] = useState<HTMLElement | null>(null);
  const [openCreateNewFolderModal, setOpenCreateNewFolderModal] = useState<any>(
    { open: false, editData: null },
  );
  const handleActionClick = (event: MouseEvent<HTMLElement>) => {
    setActionPop(event?.currentTarget);
  };
  const handleActionClose = () => {
    setActionPop(null);
  };
  const convertToHyphenCase = (str: string): string => {
    return str
      ?.split(' ')
      ?.map((word) => word?.toLowerCase())
      ?.join('-');
  };
  const openAction = Boolean(actionPop);
  return {
    router,
    convertToHyphenCase,
    handleActionClose,
    actionPop,
    openAction,
    handleActionClick,
    setOpenCreateNewFolderModal,
    openCreateNewFolderModal,
  };
};
