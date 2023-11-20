import { Box } from '@mui/material';
import React from 'react';
import { softwareDetailContent } from '../Catalog.data';

const CatalogServiceSoftware = () => {
  return (
    <>
      <>
        <Box
          mt={3}
          dangerouslySetInnerHTML={{ __html: softwareDetailContent }}
        />
      </>
    </>
  );
};
export default CatalogServiceSoftware;
