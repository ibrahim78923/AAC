import { useState } from 'react';

const UseDealDrawer = (props: any) => {
  const { defaultOpen } = props;
  const [open, setOpen] = useState(defaultOpen ?? false);
  const handleTogle = () => setOpen(!open);
  return {
    open,
    setOpen,
    handleTogle,
  };
};

export default UseDealDrawer;
