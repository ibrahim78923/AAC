import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ImportLocation } from '../ImportLocation';

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box
          sx={{ cursor: 'pointer' }}
          display={'flex'}
          alignItems={'center'}
          gap={1}
        >
          <ArrowBackIcon
            onClick={() => {
              router?.push({
                pathname: AIR_SERVICES?.ASSET_MANAGEMENT_SETTINGS,
              });
            }}
          />
          <Typography variant="h5">Location</Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <Button variant="outlined" onClick={() => setIsDrawerOpen(true)}>
            Import
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              router?.push({
                pathname: AIR_SERVICES?.ADD_NEW_LOCATION,
              })
            }
          >
            New Location
          </Button>
        </Box>
      </Box>
      <ImportLocation
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
      />
    </>
  );
};
