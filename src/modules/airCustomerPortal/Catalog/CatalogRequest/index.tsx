import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import useCatalogRequest from './useCatalogRequest';
import {
  Box,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { CatalogRequestI } from './CatalogRequest.interface';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { Theme } from '@mui/material';

export const CatalogRequest = (props: CatalogRequestI) => {
  const { open } = props;
  const {
    catalogRequestFormField,
    onSubmitRequest,
    handleSubmit,
    methodRequest,
    handleClose,
    postTicketStatus,
    portalStyles,
  } = useCatalogRequest(props);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={'sm'} fullWidth>
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
            Item Request
          </Typography>
          <IconButton onClick={() => handleClose?.()}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <FormProvider
          methods={methodRequest}
          onSubmit={handleSubmit(onSubmitRequest)}
        >
          <Grid container>
            {catalogRequestFormField?.map((item: ReactHookFormFieldsI) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
          <br />
          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            gap={1}
            flexWrap={'wrap'}
          >
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
              sx={(theme: Theme) => ({
                '&.Mui-disabled': {
                  bgcolor:
                    portalStyles?.btnPrimary ||
                    customizePortalDefaultValues(theme)?.btnPrimary,
                },
              })}
            >
              confirm
            </LoadingButton>
          </Box>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
