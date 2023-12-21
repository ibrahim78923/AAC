import * as React from 'react';
import { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import { FormProvider, RHFAutocomplete } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import useMoveToCategory from './useMoveToCategory';
import { moveToCategoryOption } from './MoveToCategory.data';

export const MoveToCategory = (prop: any) => {
  const { methodAdd, handleSubmit, onSubmit, open, setOpen } =
    useMoveToCategory(prop);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Dialog
        onClose={handleClose}
        onSubmit={onSubmit}
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
            <RHFAutocomplete
              name="category"
              label="Category"
              select={true}
              md={12}
              options={moveToCategoryOption}
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
