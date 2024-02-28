import { Box } from '@mui/material';
import { ViewInvoice } from '../../ViewInvoice';

const ReviewInvoice = () => {
  return (
    <Box className="stepper-content">
      <ViewInvoice isOnlyView />
    </Box>
  );
};

export default ReviewInvoice;
