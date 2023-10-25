import { Box } from '@mui/material';
import EditDetails from '../EditDetails';
import ChooseQuotes from '../ChooseQuotes';

const ReviewInvoice = () => {
  return (
    <Box className="stepper-content">
      <ChooseQuotes />
      <EditDetails />
    </Box>
  );
};

export default ReviewInvoice;
