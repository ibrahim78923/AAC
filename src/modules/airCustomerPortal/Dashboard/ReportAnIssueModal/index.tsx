import { AlertModalCloseIcon } from '@/assets/icons';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
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

const ReportAnIssueModal = ({
  openReportAnIssueModal,
  setOpenReportAnIssueModal,
}: any) => {
  const { methods, theme }: any = useReportAnIssueModal();
  return (
    <>
      <FormProvider methods={methods}>
        <Dialog
          fullWidth
          sx={styles?.modalSizing}
          open={openReportAnIssueModal}
          onClose={() => setOpenReportAnIssueModal(false)}
        >
          <Box width={'100%'} p={'1rem'}>
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
                  <item.component {...item?.componentProps} key={item?.id}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <RHFDropZone name="attachFile" />
            </Grid>
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={0.5}
              mt={1}
              sx={{ cursor: 'pointer' }}
            >
              <AddCircleIcon color={theme?.palette?.grey?.[600]} />
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
              <Button variant="contained">Submit</Button>
            </Box>
          </Box>
        </Dialog>
      </FormProvider>
    </>
  );
};

export default ReportAnIssueModal;
