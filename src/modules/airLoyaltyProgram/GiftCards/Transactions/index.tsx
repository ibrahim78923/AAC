import { Button } from '@mui/material';
import { AddTransactionDrawer } from './AddTransactionDrawer';
import { useState } from 'react';

export const Transactions = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenDrawer(true)}>add</Button>
      <AddTransactionDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </>
  );
};
