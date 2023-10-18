import { useState } from 'react';

const useDealDrawer = (props: any) => {
  const { defaultOpen } = props;
  const [open, setOpen] = useState(defaultOpen ?? false);
  const handleTogle = () => setOpen(!open);
  return {
    open,
    setOpen,
    handleTogle,
  };
};

export default useDealDrawer;
