import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { placeRequest } from './CatalogRequest.data';
import useCatalogRequest from './useCatalogRequest';
import { v4 as uuidv4 } from 'uuid';
import { useWatch } from 'react-hook-form';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const CatalogRequest = ({ open, setOpen }: any) => {
  const handleClose = () => {
    setOpen(false);
  };
  const { onSubmitRequest } = useCatalogRequest();
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        onSubmit={onSubmitRequest}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <Typography variant="h4" sx={{ m: 0, p: 2 }}>
          Item Requested
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <ItemRequestDialog />
      </BootstrapDialog>
    </React.Fragment>
  );
};

function ItemRequestDialog() {
  const { methodRequest, onSubmitRequest, control, getValues } =
    useCatalogRequest();

  useWatch({ control, name: 'requestForSomeOneElse' });

  return (
    <DialogContent dividers>
      <FormProvider methods={methodRequest} onSubmit={onSubmitRequest}>
        <Grid container spacing={2}>
          {placeRequest?.map((item: any) => {
            const { shouldDisplay } = item;
            let display = true;
            if (shouldDisplay) display = shouldDisplay({ getValues });
            if (!display) return null;
            return (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            );
          })}
        </Grid>
        <DialogActions>
          <Button>cancel</Button>
          <Button variant="contained" type="submit">
            confirm
          </Button>
        </DialogActions>
      </FormProvider>
    </DialogContent>
  );
}
