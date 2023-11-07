import { AlertModalCloseIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Dialog, Grid, Typography } from '@mui/material';
import { useReportAnIssueModal } from './useReportAnIssueModal';
import { v4 as uuidv4 } from 'uuid';
import { reportAnIssueModalDataArray } from './ReportAnIssueModal.data';
import { styles } from './ReportAnIssueModal.style';

const ReportAnIssueModal = () => {
  const { methods, openReportAnIssueModal, setOpenReportAnIssueModal }: any =
    useReportAnIssueModal();
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
            <Box></Box>
            <Box sx={styles?.buttonBox}>
              <Button variant="outlined">Cancel</Button>
              <Button variant="contained">Submit</Button>
            </Box>
          </Box>
        </Dialog>
      </FormProvider>
    </>
  );
};

export default ReportAnIssueModal;
