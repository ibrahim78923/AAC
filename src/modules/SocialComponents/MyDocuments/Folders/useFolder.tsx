import React, { useState } from 'react';

import { Theme, useTheme } from '@mui/material';
import { useGetDocumentFolderQuery } from '@/services/commonFeatures/documents';
import useAuth from '@/hooks/useAuth';

const useFolder: any = () => {
  const theme = useTheme<Theme>();
  const [value, setValue] = useState('search here');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenFolderDrawer, setIsOpenFolderDrawer] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditOpenModal, setIsEditOpenModal] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElSide, setAnchorElSide] = useState<null | HTMLElement>(null);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [isCreateLinkOpen, setIsCreateLinkOpen] = useState(false);
  const open = Boolean(anchorEl);
  const openSide = Boolean(anchorElSide);
  const { user }: any = useAuth();
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetDocumentFolderQuery({ organizationId: user?.organization?._id });

  const handlePdfOpen = () => setIsPdfOpen(true);
  const handlePdfClose = () => setIsPdfOpen(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickSide = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElSide(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseSide = () => {
    setAnchorElSide(null);
  };

  return {
    documentData: data?.data?.folders,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    open,
    openSide,
    handleCloseSide,
    handleClick,
    handleClickSide,
    handleClose,
    value,
    setValue,
    isOpenDrawer,
    setIsOpenDrawer,
    isOpenModal,
    setIsOpenModal,
    theme,
    isOpenFolderDrawer,
    setIsOpenFolderDrawer,
    isEditOpenModal,
    setIsEditOpenModal,
    isOpenDelete,
    setIsOpenDelete,
    anchorEl,
    setAnchorEl,
    anchorElSide,
    setAnchorElSide,
    isLinkOpen,
    setIsLinkOpen,
    isCreateLinkOpen,
    setIsCreateLinkOpen,
    isPdfOpen,
    setIsPdfOpen,
    handlePdfOpen,
    handlePdfClose,
  };
};

export default useFolder;
