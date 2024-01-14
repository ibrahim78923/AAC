import { MouseEvent, useState } from 'react';

export const useDepartmentMenu = (props: any) => {
  const { setOpenEdit, setOpenDelete, itemData } = props;
  const [actionPop, setActionPop] = useState<HTMLElement | null>(null);
  const handleActionClick = (event: MouseEvent<HTMLElement>) => {
    setActionPop(event?.currentTarget);
  };
  const handleActionClose = () => {
    setActionPop(null);
  };
  const openAction = Boolean(actionPop);
  const handleEditClick = () => {
    setOpenEdit({
      item: itemData,
      val: true,
    });
    setActionPop(null);
  };
  const handleDeleteClick = () => {
    setOpenDelete({
      item: itemData,
      val: true,
    });
    setActionPop(null);
  };
  return {
    handleActionClick,
    openAction,
    handleActionClose,
    actionPop,
    handleEditClick,
    handleDeleteClick,
  };
};
