import { useState } from 'react';

export default function useFilters({ methods, setFilterByTypeState }: any) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const { handleSubmit, reset } = methods;

  const onSubmitModuleTypeFiler = (data: any) => {
    setFilterByTypeState(data?.filterModuleType);
  };

  return {
    id,
    handleClick,
    open,
    anchorEl,
    handleClose,
    handleSubmit,
    onSubmitModuleTypeFiler,
    reset,
  };
}
