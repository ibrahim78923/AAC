import { AlertModalCloseIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { useMergedTickets } from './useMergeTickets';

export const MergeTickets = (props: any) => {
  const theme = useTheme();
  const { isMergedTicketsModalOpen } = props;
  const {
    mergedTicketsFormMethod,
    closeMergedTicketsModal,
    handleSubmit,
    submitMergedTicketsForm,
    mergeTicketsFormFields,
  } = useMergedTickets(props);

  return (
    <Dialog
      open={isMergedTicketsModalOpen}
      onClose={() => closeMergedTicketsModal?.()}
      fullWidth
      maxWidth={'sm'}
    >
      <FormProvider
        methods={mergedTicketsFormMethod}
        onSubmit={handleSubmit(submitMergedTicketsForm)}
      >
        <DialogTitle>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={1}
            flexWrap={'wrap'}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={1}
              flexWrap={'wrap'}
            >
              <Typography variant="h3" textTransform={'capitalize'}>
                Merge
              </Typography>
            </Box>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => closeMergedTicketsModal?.()}
            >
              <AlertModalCloseIcon />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <br />
          <Grid container spacing={4}>
            {mergeTicketsFormFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.componentProps?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : null}
                </item.component>
              </Grid>
            ))}
          </Grid>
          <br />
          <Typography variant="body1" textTransform={'capitalize'}>
            Primary
          </Typography>
          <Box
            padding={1.5}
            border={{
              md: `1px solid ${theme?.palette?.custom?.off_white_three}`,
            }}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={2}
              flexWrap={'wrap'}
            >
              <Box
                display={'flex'}
                gap={1}
                flexWrap={'wrap'}
                alignItems={'center'}
              >
                <Avatar
                  sx={{
                    bgcolor: theme?.palette?.blue?.main,
                    borderRadius: 1.25,
                  }}
                  style={{ width: 28, height: 28 }}
                >
                  IT
                </Avatar>
                <Typography variant="h6" color="secondary">
                  #INC-3
                </Typography>
              </Box>
              <Box
                display={'flex'}
                gap={1}
                flexWrap={'wrap'}
                alignItems={'center'}
              >
                <Typography
                  color={'grey.0'}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  Request for John Dyson
                </Typography>
                <Typography
                  component={'span'}
                  color="secondary"
                  variant="body1"
                >
                  Whats wrong with my email
                </Typography>
              </Box>
            </Box>
            <Typography color={'grey.0'} my={0.5}>
              From :{' '}
              <Typography component={'span'} color="secondary" variant="body1">
                John Dyson
              </Typography>
            </Typography>
            <Typography color="grey.0">
              Created :{' '}
              <Typography component={'span'} color="secondary" variant="body1">
                12 hours ago
              </Typography>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ '&.MuiDialogActions-root': { padding: '1.5rem !important' } }}
        >
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={() => closeMergedTicketsModal?.()}
          >
            Cancel
          </LoadingButton>
          <LoadingButton variant="contained" type="submit">
            Continue
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
