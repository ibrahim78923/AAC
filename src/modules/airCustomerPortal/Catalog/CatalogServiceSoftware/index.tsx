import { Box } from '@mui/material';
import React from 'react';
import { catalogDetailContent } from '../Catalog.data';

const CatalogServiceSoftware = () => {
  return (
    <>
      <>
        <Box
          mt={3}
          dangerouslySetInnerHTML={{ __html: catalogDetailContent }}
        />
      </>
    </>
  );
};
export default CatalogServiceSoftware;
