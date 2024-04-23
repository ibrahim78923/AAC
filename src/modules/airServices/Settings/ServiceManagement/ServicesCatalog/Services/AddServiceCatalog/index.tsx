import * as React from 'react';
import { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import useAddServiceCatalog from './useAddServiceCatalog';
import { Grid, Typography } from '@mui/material';
import { addServiceCatalogData } from './AddServiceCatalog.data';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';

export const AddServiceCatalog = (prop: any) => {
  const {
    methodAdd,
    handleSubmit,
    onSubmit,
    open,
    handleClose,
    postServiceCatalogTriggerStatus,
  } = useAddServiceCatalog(prop);

  return (
    <Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <DialogTitle
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant={'h4'} component={'span'}>
            New Service Category
          </Typography>
          <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleClose} />
        </DialogTitle>
        <FormProvider methods={methodAdd} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              {addServiceCatalogData?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              color="secondary"
              variant="outlined"
              onClick={handleClose}
              disabled={postServiceCatalogTriggerStatus?.isLoading}
            >
              cancel
            </LoadingButton>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={postServiceCatalogTriggerStatus?.isLoading}
            >
              Create
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </Fragment>
  );
};
