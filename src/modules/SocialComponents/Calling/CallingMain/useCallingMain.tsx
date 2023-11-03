import { useState } from 'react';

const useCallingMain = () => {
  const [callingSearch, setCallingSearch] = useState();
  const [openDrawer, setOpenDrawer] = useState<any>();

  const [anchorElCallNow, setAnchorElCallNow] = useState<null | HTMLElement>(
    null,
  );
  const handleClickCallNow = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElCallNow(event.currentTarget);
  };
  const handleCloseCallNow = () => {
    setAnchorElCallNow(null);
  };

  const [anchorElScheduleCall, setAnchorElScheduleCall] =
    useState<null | HTMLElement>(null);
  const handleClickScheduleCall = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorElScheduleCall(event.currentTarget);
  };
  const handleCloseScheduleCall = () => {
    setAnchorElScheduleCall(null);
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
  };
};

export default useCallingMain;
