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
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import {
  mergeTicketsDefaultValue,
  mergeTicketsFormFields,
} from './MergeTickets.data';

export const MergeTickets = (props: any) => {
  const method = useForm({
    defaultValues: mergeTicketsDefaultValue(),
  });
  const theme = useTheme();
  const { isModalOpen, handleClose } = props;
  return (
    <Dialog
      open={isModalOpen}
      onClose={() => handleClose?.()}
      fullWidth
      maxWidth={'sm'}
    >
      <FormProvider methods={method}>
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
                Assigned To
              </Typography>
            </Box>
            <Box sx={{ cursor: 'pointer' }} onClick={() => handleClose?.()}>
              <AlertModalCloseIcon />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <br />
          <Grid container spacing={4}>
            {mergeTicketsFormFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>

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
                <Typography
                  sx={{
                    color: theme?.palette?.primary?.main,
                    cursor: 'pointer',
                  }}
                >
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
                  color={theme?.palette?.primary?.main}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  Request for Jhon Dyson
                </Typography>
                <Typography
                  color={theme?.palette?.primary?.main}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  Whats wrong with my email
                </Typography>
              </Box>
            </Box>
            <Typography
              color={theme?.palette?.primary?.main}
              sx={{
                cursor: 'pointer',
              }}
            >
              From :{' '}
              <Typography
                component={'span'}
                color={theme?.palette?.primary?.main}
                sx={{
                  cursor: 'pointer',
                }}
              >
                John Dyson
              </Typography>
            </Typography>
            <Typography
              color={theme?.palette?.primary?.main}
              sx={{
                cursor: 'pointer',
              }}
            >
              Created :{' '}
              <Typography
                component={'span'}
                color={theme?.palette?.primary?.main}
                sx={{
                  cursor: 'pointer',
                }}
              >
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
            //   onClick={() => handleCancelBtn?.()}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            // onClick={() => handleSubmitBtn?.()}
          >
            Continue
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
