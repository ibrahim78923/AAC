import React from 'react';
import { Box } from '@mui/material';
import DetailCard from './DetailCard';
import ProductsTable from './ProductsTable';

const EditDetails = () => {
  return (
    <Box>
      <DetailCard />
      <ProductsTable />
    </Box>
  );
};

export default EditDetails;
