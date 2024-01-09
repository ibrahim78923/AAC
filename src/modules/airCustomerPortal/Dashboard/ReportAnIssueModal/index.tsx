import { AlertModalCloseIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useReportAnIssueModal } from './useReportAnIssueModal';
import { reportAnIssueModalFormFields } from './ReportAnIssueModal.data';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styles } from './ReportAnIssueModal.style';

const ReportAnIssueModal = (props: any) => {
  const { openReportAnIssueModal, setOpenReportAnIssueModal } = props;
  const { methods, handleSubmitIssue } = useReportAnIssueModal(props);
  return (
    <>
      <Dialog
        fullWidth
        sx={styles?.modalSizing}
        open={openReportAnIssueModal}
        onClose={() => setOpenReportAnIssueModal(false)}
      >
        <FormProvider methods={methods} onSubmit={handleSubmitIssue}>
          <Box p={2}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              mb={1}
            >
              <Typography variant="h3">Report an issue</Typography>
              <IconButton style={{ cursor: 'pointer' }}>
                <AlertModalCloseIcon
                  onClick={() => setOpenReportAnIssueModal(false)}
                />
              </IconButton>
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {reportAnIssueModalFormFields?.map((item: any) => (
                  <item.component
                    {...item?.componentProps}
                    key={item?.id}
                    size="small"
                  />
                ))}
              </Grid>
            </Grid>
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={0.5}
              mt={1}
              sx={{ cursor: 'pointer' }}
            >
              <AddCircleIcon fontSize="small" />
              <Typography variant="body2" fontWeight={600}>
                Associate Asset
              </Typography>
            </Box>
            <Box
              display={'flex'}
              justifyContent={'flex-end'}
              alignItems={'center'}
              gap={1}
              mt={'0.625rem'}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setOpenReportAnIssueModal(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </Box>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default ReportAnIssueModal;
