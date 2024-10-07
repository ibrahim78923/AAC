import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, DialogContent, DialogTitle, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { Theme } from '@mui/material';
import { useShareTicket } from './useShareTicket';

export const ShareTicket = (props: any) => {
  const { open, handleClose } = props;
  const {
    shareTicketData,
    methods,
    handleSubmit,
    onSubmit,
    portalStyles,
    shareTicketProgress,
  } = useShareTicket();
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
            Share
          </Typography>
          <CloseIcon
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={() => handleClose?.()}
          />
        </Box>
      </DialogTitle>

      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            {shareTicketData?.map((item) => (
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
              disabled={shareTicketProgress?.isLoading}
            >
              cancel
            </LoadingButton>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={shareTicketProgress?.isLoading}
              sx={(theme: Theme) => ({
                '&.Mui-disabled': {
                  bgcolor:
                    portalStyles?.btnPrimary ||
                    customizePortalDefaultValues(theme)?.btnPrimary,
                },
              })}
            >
              Ok
            </LoadingButton>
          </Box>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
