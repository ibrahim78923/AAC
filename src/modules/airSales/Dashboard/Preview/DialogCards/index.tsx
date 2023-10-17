import React, { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';

const DialogCards = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="lg"
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '8px',
          },
        }}
      >
        <DialogContent sx={{ p: '12px 24px 24px' }}></DialogContent>
      </Dialog>
    </>
  );
};

export default DialogCards;
