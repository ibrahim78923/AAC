import React, { useState } from 'react';

export default function useHeaderCreateContract() {
  const [openModalShareContract, setOpenModalShareContract] =
    useState<boolean>(false);
  const [anchorElMoreMenu, setAnchorElMoreMenu] = useState<null | HTMLElement>(
    null,
  );
  const openMoreMenu = Boolean(anchorElMoreMenu);
  const handleClickMoreMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMoreMenu(event.currentTarget);
  };
  const handleCloseMoreMenu = () => {
    setAnchorElMoreMenu(null);
  };

  return {
    anchorElMoreMenu,
    openMoreMenu,
    handleClickMoreMenu,
    handleCloseMoreMenu,

    openModalShareContract,
    setOpenModalShareContract,
  };
}
