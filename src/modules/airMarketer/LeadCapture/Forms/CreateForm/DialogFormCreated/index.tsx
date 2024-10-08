import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Tooltip,
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
import { AIR_MARKETER } from '@/routesConstants/paths';
import { useRouter } from 'next/router';
import { styles } from './DialogFormCreated.style';
import useDialogForm from './useDialogFormCreated';

const DialogFormCreated = ({
  open,
  onClose,
  setShowExportText,
  showExportText,
  formHtml,
  formURL,
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

  const { isCopiedURL, isCopiedCode, handleCopyLink, handleCopyEmbededCode } =
    useDialogForm();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={'sm'}>
      <DialogTitle sx={styles?.title}>
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

          <Box sx={{ cursor: 'pointer' }} onClick={onClose}>
            <AlertModalCloseIcon />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ padding: '20px' }}>
        {/* will be use in futute */}
        {/* {!showExportText && (
          <Typography
            variant="body1"
            sx={{ marginTop: '20px', cursor: 'pointer' }}
            onClick={() => {
              setShowExportText(true);
            }}
          >
            Your form is created
          </Typography>
        )} */}
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
                    router.push(AIR_MARKETER.ALL_TABLE);
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
            <Box sx={styles?.createdLink}>
              <Typography variant="body2">{formURL}</Typography>
              <Tooltip
                open={isCopiedURL}
                title="Copied"
                placement="top"
                arrow
                key="copy-url"
              >
                <Box
                  sx={{
                    position: 'absolute',
                    right: '13px',
                    top: '13px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleCopyLink(`${formURL}`)}
                >
                  <CopyIcon />
                </Box>
              </Tooltip>
            </Box>

            <Typography variant="body1" sx={{ marginTop: '15px' }}>
              Embed Code
            </Typography>
            <Box sx={styles?.createdCode}>
              <Box>
                <pre>
                  <code
                    style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                  >
                    {formHtml}
                  </code>
                </pre>
              </Box>
              <Tooltip
                open={isCopiedCode}
                title="Copied"
                placement="top"
                arrow
                key="copy-code"
              >
                <Box
                  sx={{
                    position: 'absolute',
                    right: '13px',
                    top: '13px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleCopyEmbededCode(formHtml)}
                >
                  <CopyIcon />
                </Box>
              </Tooltip>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogFormCreated;
