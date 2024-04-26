import { MouseEvent, useState } from 'react';

export const useFolderMenu = (props: any) => {
  const { response, setOpenCreateNewFolderModal } = props;
  const [actionPop, setActionPop] = useState<HTMLElement | null>(null);
  const handleActionClick = (event: MouseEvent<HTMLElement>) => {
    setActionPop(event?.currentTarget);
  };

  const handleActionClose = () => {
    setActionPop(null);
  };
  const openAction = Boolean(actionPop);
  return {
    response,
    setOpenCreateNewFolderModal,
    handleActionClick,
    openAction,
    handleActionClose,
    actionPop,
  };
};
