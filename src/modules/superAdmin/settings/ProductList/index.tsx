import React from 'react';

import Image from 'next/image';

import { Box, Grid, Typography, useTheme } from '@mui/material';
import { productListCards } from './ProductList.data';

import { styles } from './ProductList.style';
import { v4 as uuidv4 } from 'uuid';

const ProductList = () => {
  const theme = useTheme();

  const getProductList = productListCards();

  return (
    <Box>
      <Typography variant="h3" color={theme.palette.grey[800]}>
        Product List
      </Typography>
      <Box mt={2}>
        <Grid container spacing={2}>
          {getProductList.map((item: any) => (
            <Grid
              item
              xs={8}
              lg={4}
              key={uuidv4()}
              onClick={item?.navigateHandler}
            >
              <Box sx={styles.productListCard(theme)}>
                <Image src={item.icon} alt="product" />
                <Box>
                  <Typography
                    variant="h6"
                    color={theme.palette.custom.grayish_blue}
                    fontWeight={'700'}
                  >
                    {item.heading}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={theme.palette.custom.grayish_blue}
                  >
                    {item.content}
                  </Typography>
                </Box>
                <Box sx={styles.productBadge(item.isActive)}>
                  <Typography
                    variant="body2"
                    color={item.isActive === true ? '#47B262' : '#1F305D'}
                  >
                    {' '}
                    {item.isActive === true ? 'Active' : 'In Active'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductList;
