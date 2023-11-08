import { AlertModalCloseIcon, AttachIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Dialog, Grid, Typography } from '@mui/material';
import { useReportAnIssueModal } from './useReportAnIssueModal';
import { v4 as uuidv4 } from 'uuid';
import { reportAnIssueModalDataArray } from './ReportAnIssueModal.data';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styles } from './ReportAnIssueModal.style';

const ReportAnIssueModal = () => {
  const {
    methods,
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    theme,
    fileImport,
    handleImport,
  }: any = useReportAnIssueModal();
  return (
    <>
      <FormProvider methods={methods}>
        <Dialog
          fullWidth
          sx={styles?.modelSizing}
          open={openReportAnIssueModal}
          onClose={() => setOpenReportAnIssueModal(false)}
        >
          <Box width={'100%'} p={'1rem'}>
            <Box sx={styles?.dialogBoxStyle}>
              <Typography variant="h3">Report an issue</Typography>
              <AlertModalCloseIcon
                onClick={() => setOpenReportAnIssueModal(false)}
                style={{ cursor: 'pointer' }}
              />
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {reportAnIssueModalDataArray?.map((item: any) => (
                  <item.component {...item?.componentProps} key={uuidv4()}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                ))}
              </Grid>
            </Grid>
            <Box display={'flex'} alignItems={'center'} gap={0.5}>
              <AttachIcon />
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ cursor: 'pointer' }}
                onClick={handleImport}
              >
                Attach a file
              </Typography>
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                ref={fileImport}
              />
              <Typography variant="body2">(File size &lt; 40 MB)</Typography>
            </Box>
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={0.5}
              mt={1}
              sx={{ cursor: 'pointer' }}
            >
              <AddCircleIcon color={theme?.palette?.grey?.[600]} />
              <Typography variant="body2" fontWeight={600}>
                Associate Assets
              </Typography>
            </Box>
            <Box sx={styles?.buttonBox}>
              <Button variant="outlined" color="secondary">
                Cancel
              </Button>
              <Button variant="contained">Submit</Button>
            </Box>
          </Box>
        </Dialog>
      </FormProvider>
    </>
  );
};

export default ReportAnIssueModal;
