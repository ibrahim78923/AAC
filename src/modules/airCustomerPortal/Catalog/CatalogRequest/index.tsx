import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import useCatalogRequest from './useCatalogRequest';
import CatalogItemRequest from '../CatalogItemRequest';
import { Fragment } from 'react';
import { DialogTitle } from '@mui/material';

export const CatalogRequest = ({ open, setOpen }: any) => {
  const handleClose = () => {
    setOpen(false);
  };
  const { onSubmitRequest } = useCatalogRequest();
  return (
    <Fragment>
      <Dialog
        onClose={handleClose}
        onSubmit={onSubmitRequest}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h4">Item Requested</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme?.palette?.grey?.[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <CatalogItemRequest />
      </Dialog>
    </Fragment>
  );
};
