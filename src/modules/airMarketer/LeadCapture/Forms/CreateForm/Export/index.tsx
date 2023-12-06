import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AlertModalCloseIcon,
  CopyIcon,
  EmbedcodeTickIcon,
} from '@/assets/icons';
import {
  ExportFormArray,
  ExportFormDefaultValues,
  ExportFormValidationSchema,
} from './Export.data';
import { airMarketerLeadCapture } from '@/routesConstants/paths';
import { useRouter } from 'next/router';

const Export = ({
  openAlert,
  setShowExportText,
  setOpenAlert,
  showExportText,
}: any) => {
  const router = useRouter();
  const ExportFormMethods = useForm({
    resolver: yupResolver(ExportFormValidationSchema),
    defaultValues: ExportFormDefaultValues,
  });

  const { handleSubmit, reset } = ExportFormMethods;

  const onSubmit = () => {
    reset();
  };

  return (
    <Dialog
      open={openAlert}
      onClose={() => setOpenAlert(false)}
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle sx={{ padding: '20px 20px 0px' }}>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={1}
        >
          <Box display={'flex'} alignItems={'center'} gap={1}>
            <EmbedcodeTickIcon />
            <Typography variant="h3">
              {showExportText ? 'Export' : 'Created'}
            </Typography>
          </Box>

          <Box sx={{ cursor: 'pointer' }} onClick={() => setOpenAlert(false)}>
            <AlertModalCloseIcon />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ padding: '20px' }}>
        {!showExportText && (
          <Typography
            variant="body1"
            sx={{ marginTop: '20px', cursor: 'pointer' }}
            onClick={() => {
              setShowExportText(true);
            }}
          >
            Your form is created
          </Typography>
        )}
        {showExportText ? (
          <>
            <FormProvider
              methods={ExportFormMethods}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={4}>
                {ExportFormArray?.map((item: any, index: any) => (
                  <Grid
                    item
                    xs={12}
                    md={item?.md}
                    key={uuidv4()}
                    sx={{
                      paddingTop: [
                        index === 0 ? '50px !important' : '10px !important',
                      ],
                    }}
                  >
                    <item.component
                      {...item?.componentProps}
                      size={'small'}
                    ></item.component>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ textAlign: 'end', marginTop: '20px' }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setShowExportText(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ marginLeft: '10px' }}
                  onClick={() => {
                    router.push(airMarketerLeadCapture.ALL_TABLE);
                  }}
                >
                  Export
                </Button>
              </Box>
            </FormProvider>
          </>
        ) : (
          <>
            <Typography variant="body1" sx={{ marginTop: '15px' }}>
              Link
            </Typography>
            <Box
              sx={{
                border: '1px solid #D1D5DB',
                padding: '15px',
                borderRadius: '8px',
                position: 'relative',
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: '#9CA3AF', width: '80%' }}
              >
                http.//activitytok.com/jnm/bjkashbdjkn////askldhahmn cajslk/
              </Typography>

              <Box
                sx={{
                  position: 'absolute',
                  right: '13px',
                  top: '13px',
                  cursor: 'pointer',
                }}
              >
                <CopyIcon />
              </Box>
            </Box>

            <Typography variant="body1" sx={{ marginTop: '15px' }}>
              Embed Code
            </Typography>
            <Box
              sx={{
                border: '1px solid #D1D5DB',
                padding: '15px',
                borderRadius: '8px',
                position: 'relative',
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: '#9CA3AF', width: '80%' }}
              >
                Script Embed Code Script text Embed Code Script text Embed Code
                Script text Embed Code Script text Embed Code Script text Embed
                Code Script text Script
              </Typography>

              <Box
                sx={{
                  position: 'absolute',
                  right: '13px',
                  top: '13px',
                  cursor: 'pointer',
                }}
              >
                <CopyIcon />
              </Box>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Export;
