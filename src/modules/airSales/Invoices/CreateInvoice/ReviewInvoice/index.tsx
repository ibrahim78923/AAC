import { Box, Button, TextField } from '@mui/material';
import ChooseQuotes from '../ChooseQuotes';
import EditDetails from '../EditDetails';
import useReviewInvoice from './useReviewInvoice';
import { ScheduleModals } from '@/components/ScheduleModals';

const ReviewInvoice = () => {
  const { isEmailModal, setIsEmailModal } = useReviewInvoice();

  return (
    <Box>
      <ChooseQuotes />
      <EditDetails />
      <Button variant="contained" onClick={() => setIsEmailModal(true)}>
        Send to customer
      </Button>
      <ScheduleModals
        type="assign"
        open={isEmailModal}
        handleClose={() => {
          setIsEmailModal(false);
        }}
        handleSubmit={() => {
          setIsEmailModal(false);
        }}
        submitButonText="Send"
        isFooter
      >
        <Box my={3}>
          <label>Email</label>
          <TextField
            fullWidth
            type="email"
            placeholder="abc@ceative.co.uk"
            size="small"
          />
        </Box>
      </ScheduleModals>
    </Box>
  );
};

export default ReviewInvoice;
