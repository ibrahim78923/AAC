import { Box, Button, useTheme } from '@mui/material';
import React from 'react';
import { AddBox } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

export const SubListWrapper = ({ children, data }: any) => {
  const theme: any = useTheme();
  const router = useRouter();

  return (
    <Box
      p={3}
      border={`.1rem solid ${theme?.palette?.grey[700]}`}
      boxShadow={2}
      borderRadius={2}
    >
      {children}
      <Box mt={1}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() =>
            router?.push({
              pathname: AIR_SERVICES?.ADD_NEW_LOCATION,
              query: {
                id: data?._id,
                location: data?.locationName,
              },
            })
          }
        >
          <AddBox />
        </Button>
      </Box>
    </Box>
  );
};
