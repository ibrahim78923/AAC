import { Box } from '@mui/material';
import DetailCard from './DetailCard';
import ProductsTable from './ProductsTable';

const EditDetails = () => {
  return (
    <Box className="stepper-content">
      <DetailCard />
      <ProductsTable />
    </Box>
  );
};

export default EditDetails;
