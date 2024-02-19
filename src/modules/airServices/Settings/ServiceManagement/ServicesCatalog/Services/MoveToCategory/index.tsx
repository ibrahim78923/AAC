import * as React from 'react';
import { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import useMoveToCategory from './useMoveToCategory';

export const MoveToCategory = (prop: any) => {
  const { methodAdd, handleSubmit, onSubmit, open, setOpen, apiQueryCategroy } =
    useMoveToCategory(prop);

  const handleClose = () => {
    setOpen(false);
  };
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
          <Typography variant="h4">Move to Category</Typography>

          <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleClose} />
        </DialogTitle>

        <FormProvider methods={methodAdd} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <RHFAutocompleteAsync
              name="category"
              label="Category"
              placeholder="Select"
              select={true}
              md={12}
              apiQuery={apiQueryCategroy}
              getOptionLabel={(option: any) => option?.categoryName}
            />
          </DialogContent>
          <DialogActions>
            <LoadingButton
              onClick={handleClose}
              variant="outlined"
              color="secondary"
            >
              cancel
            </LoadingButton>
            <LoadingButton variant="contained" type="submit">
              Move
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </Fragment>
  );
};
