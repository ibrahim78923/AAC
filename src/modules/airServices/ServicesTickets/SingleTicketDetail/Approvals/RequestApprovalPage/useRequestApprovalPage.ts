import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';

export function useRequestApprovalPage() {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [openApprovalModal, setOpenApprovalModal] = useState<boolean>(false);
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApprovalModalOpen = () => {
    setOpenApprovalModal(true);
  };
  const handleApprovalModalClose = () => {
    setOpenApprovalModal(false);
  };
  const handleRejectModalOpen = () => {
    setOpenRejectModal(true);
  };
  const handleRejectModalClose = () => {
    setOpenRejectModal(false);
  };

  const theme = useTheme();
  const RECEIVED_CONDITION = 'Received';
  const REQUESTED_CONDITION = 'Requested';

  const textColor: any = {
    Request: theme?.palette?.info?.main,
    Receive: theme?.palette?.primary?.main,
    Approve: theme?.palette?.success?.main,
    Reject: theme?.palette?.error?.main,
    Cancel: theme?.palette?.grey?.[900],
  };

  const methods: any = useForm({
    defaultValues: {
      description: '',
    },
  });

  return {
    theme,
    open,
    handleClick,
    handleClose,
    textColor,
    anchorEl,
    setAnchorEl,
    openApprovalModal,
    handleApprovalModalClose,
    handleApprovalModalOpen,
    handleRejectModalClose,
    handleRejectModalOpen,
    openRejectModal,
    REQUESTED_CONDITION,
    RECEIVED_CONDITION: RECEIVED_CONDITION,
    methods,
  };
}
