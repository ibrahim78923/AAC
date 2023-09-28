import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { LogoSharedIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';

const DetailCard = () => {
  const style = {
    cardDetails: {
      padding: '10px 20px',
      bgcolor: '#1F305D',
      color: '#fff',
      borderRadius: '6px',
    },
  };

  const cardDetails = [
    {
      label: 'Air Applecart',
      details: [
        { title: '123 street Address' },
        { title: 'City | State | Zip Code' },
        { title: 'Phone No' },
        { title: 'Company Email' },
      ],
    },
  ];
  const clientDetails = [
    {
      label: 'Client Information',
      details: [
        { title: '123 street Address' },
        { title: 'City | State | Zip Code' },
        { title: 'Phone No' },
        { title: 'Company Email' },
      ],
    },
  ];

  return (
    <Box sx={style?.cardDetails}>
      <Box className="air-apple-card">
        <Stack
          gap={2}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
        >
          <Stack gap="20px" direction="row">
            <Box sx={{ mt: '5px' }}>
              <LogoSharedIcon />
            </Box>
            {cardDetails.map((item: any) => (
              <Box key={uuidv4()}>
                <Typography variant="h5">{item.label}</Typography>
                {item.details?.map((val: any) => (
                  <Typography key={uuidv4()}>{val.title}</Typography>
                ))}
              </Box>
            ))}
          </Stack>
          <Box>
            {clientDetails.map((item: any) => (
              <Stack gap="5px" key={uuidv4()}>
                <Typography variant="h5">{item.label}</Typography>
                {item.details?.map((val: any) => (
                  <Typography key={uuidv4()}>{val.title}</Typography>
                ))}
              </Stack>
            ))}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
export default DetailCard;
