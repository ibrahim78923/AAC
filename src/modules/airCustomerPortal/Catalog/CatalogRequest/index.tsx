import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import useCatalogRequest from './useCatalogRequest';
import { Fragment } from 'react';
import { Box, DialogContent, DialogTitle, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';

export const CatalogRequest = ({ open, setOpen, servicesDetails }: any) => {
  const {
    CatalogRequestFormField,
    onSubmitRequest,
    handleSubmit,
    methodRequest,
    getValues,
    handleClose,
    searchStringLowerCase,
  } = useCatalogRequest(servicesDetails, setOpen);

  return (
    <Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
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

        <DialogContent dividers>
          <FormProvider
            methods={methodRequest}
            onSubmit={handleSubmit(onSubmitRequest)}
          >
            <Grid container>
              {CatalogRequestFormField?.map((item: any) => {
                const { shouldDisplay } = item;
                let display = true;
                shouldDisplay &&
                  (display = shouldDisplay({
                    getValues,
                    other: { searchStringLowerCase },
                  }));
                if (!display) return <></>;
                return (
                  <Grid item xs={12} md={item?.md} key={item?.id}>
                    <item.component {...item?.componentProps} size={'small'} />
                  </Grid>
                );
              })}
            </Grid>
            <Box display={'flex'} justifyContent={'flex-end'} gap={1}>
              <LoadingButton
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                cancel
              </LoadingButton>
              <LoadingButton variant="contained" type="submit">
                confirm
              </LoadingButton>
            </Box>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
