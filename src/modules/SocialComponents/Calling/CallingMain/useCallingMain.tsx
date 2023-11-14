import { useState } from 'react';

const useCallingMain = () => {
  const [callingSearch, setCallingSearch] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<any>();

  const [anchorElCallNow, setAnchorElCallNow] = useState<null | HTMLElement>(
    null,
  );
  const handleClickCallNow = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElCallNow(event?.currentTarget);
  };
  const handleCloseCallNow = () => {
    setAnchorElCallNow(null);
  };

  const [anchorElScheduleCall, setAnchorElScheduleCall] =
    useState<null | HTMLElement>(null);
  const handleClickScheduleCall = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorElScheduleCall(event?.currentTarget);
  };
  const handleCloseScheduleCall = () => {
    setAnchorElScheduleCall(null);
  };

  const [anchorElAction, setAnchorElAction] = useState<null | HTMLElement>(
    null,
  );
  const actionMenuOpenAction = Boolean(anchorElAction);
  const handleClickAction = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAction(event?.currentTarget);
  };
  const handleCloseAction = () => {
    setAnchorElAction(null);
  };

  return {
    callingSearch,
    setCallingSearch,
    openDrawer,
    setOpenDrawer,
    anchorElCallNow,

    handleClickCallNow,
    handleCloseCallNow,

    anchorElScheduleCall,
    handleClickScheduleCall,
    handleCloseScheduleCall,
    setAnchorElScheduleCall,

    anchorElAction,
    setAnchorElAction,
    actionMenuOpenAction,
    handleClickAction,
    handleCloseAction,

    setIsDeleteModalOpen,
    isDeleteModalOpen,
  };
};

export default useCallingMain;
