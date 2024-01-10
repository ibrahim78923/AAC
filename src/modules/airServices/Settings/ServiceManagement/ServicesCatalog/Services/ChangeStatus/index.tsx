import * as React from 'react';
import { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import CloseIcon from '@mui/icons-material/Close';

import { Divider, Grid, Typography } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { changeStatusData } from './ChangeStatus.data';
import useChangeStatus from './useChangeStatus';

export const ChangeStatus = (prop: any) => {
  const {
    methodChangeStatus,
    handleSubmit,
    onSubmit,
    openStatus,
    setOpenStatus,
  } = useChangeStatus(prop);

  const handleClose = () => {
    setOpenStatus(false);
  };
  return (
    <Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openStatus}
        fullWidth
      >
        <DialogTitle
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant="h4">Change Status</Typography>

          <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleClose} />
        </DialogTitle>

        <FormProvider
          methods={methodChangeStatus}
          onSubmit={handleSubmit(onSubmit)}
        >
          {' '}
          <DialogContent dividers>
            <Grid container spacing={4}>
              {changeStatusData?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <LoadingButton
              color="secondary"
              variant="outlined"
              onClick={handleClose}
            >
              cancel
            </LoadingButton>
            <LoadingButton variant="contained" type="submit">
              Save
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </Fragment>
  );
};
