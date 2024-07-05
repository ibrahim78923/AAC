import Dialog from '@mui/material/Dialog';
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
    postTicketStatus,
  } = useCatalogRequest(servicesDetails, setOpen);

  return (
    <Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={1}
            flexWrap={'wrap'}
            mb={1.5}
          >
            <Typography variant="h4" color="slateBlue.main">
              Item Requested
            </Typography>
            <CloseIcon
              sx={{ color: 'custom.darker', cursor: 'pointer' }}
              onClick={() => handleClose?.()}
            />
          </Box>
        </DialogTitle>

        <DialogContent>
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
            <br />
            <Box display={'flex'} justifyContent={'flex-end'} gap={1}>
              <LoadingButton
                variant="outlined"
                color="secondary"
                onClick={handleClose}
                disabled={postTicketStatus?.isLoading}
              >
                cancel
              </LoadingButton>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={postTicketStatus?.isLoading}
              >
                confirm
              </LoadingButton>
            </Box>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
