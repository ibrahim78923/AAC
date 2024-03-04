import { useGetWorkloadQuery } from '@/services/airServices/workload';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { workloadDefaultDateRange } from '../Workload.data';
import useAuth from '@/hooks/useAuth';

export default function useWorkloadDrawer({
  state,
  openDrawer,
  setModifiedRange,
  setDateRange,
}: any) {
  const theme: any = useTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [onClickEvent, setOnClickEvent] = useState<any>({
    open: null,
    data: null,
  });

  const { user }: any = useAuth();

  const { data } = useGetWorkloadQuery(
    { manage: state },
    {
      skip: !openDrawer,
      refetchOnMountOrArgChange: true,
    },
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // Popover open Create Date
  const [anchorElDate, setAnchorElDate] = useState<HTMLButtonElement | null>(
    null,
  );

  const handleClickDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElDate(event?.currentTarget);
    setModifiedRange(workloadDefaultDateRange);
  };

  const handleCloseDate = () => {
    setAnchorElDate(null);
  };

  const openDate = Boolean(anchorElDate);
  const idDate = openDate ? 'simple-popover' : undefined;

  // Popover open Modified Date
  const [anchorElModified, setAnchorElModified] =
    useState<HTMLButtonElement | null>(null);

  const handleClickModified = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElModified(event?.currentTarget);
    setDateRange(workloadDefaultDateRange);
  };

  const handleCloseModified = () => {
    setAnchorElModified(null);
  };

  const openModified = Boolean(anchorElModified);
  const idModified = openModified ? 'simple-popover' : undefined;

  return {
    user,
    data,
    handleClick,
    id,
    open,
    anchorEl,
    handleClose,
    handleClickDate,
    handleClickModified,
    idDate,
    openDate,
    anchorElDate,
    handleCloseDate,
    theme,
    idModified,
    openModified,
    anchorElModified,
    handleCloseModified,
    setOnClickEvent,
    onClickEvent,
  };
}
