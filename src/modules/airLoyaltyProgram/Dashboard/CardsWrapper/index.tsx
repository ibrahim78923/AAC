import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export const CardsWrapper = ({ href, children, title }: any) => {
  return (
    <>
      <Box
        sx={{
          pt: 2,
          borderRadius: 2.5,
          border: '0.06rem solid',
          borderColor: 'grey.700',
        }}
      >
        <Box
          sx={{
            pb: 1,
            px: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" fontWeight={500} textTransform="capitalize">
            {title}
          </Typography>
          {href && (
            <Typography
              component={Link}
              href={`${href}`}
              variant="body2"
              fontWeight={500}
              color="primary.main"
            >
              view all
            </Typography>
          )}
        </Box>
        <Box>{children}</Box>
      </Box>
    </>
  );
};
