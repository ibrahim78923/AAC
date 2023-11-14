import { Box } from '@mui/material';
import ChooseQuotes from '../ChooseQuotes';
import { ViewInvoice } from '../../ViewInvoice';

const ReviewInvoice = () => {
  return (
    <Box className="stepper-content">
      <ChooseQuotes />
      <ViewInvoice isOnlyView />
    </Box>
  );
};

export default ReviewInvoice;
