import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { uuid } from 'uuidv4';

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
        <Stack direction="row" justifyContent="space-between">
          <Stack gap="5px">
            {cardDetails.map((item: any) => (
              <Box key={uuid()}>
                <Typography variant="h5">{item.label}</Typography>
                {item.details?.map((val: any) => (
                  <Typography key={uuid()}>{val.title}</Typography>
                ))}
              </Box>
            ))}
          </Stack>
          <Box>
            {clientDetails.map((item: any) => (
              <Stack gap="5px" key={uuid()}>
                <Typography variant="h5">{item.label}</Typography>
                {item.details?.map((val: any) => (
                  <Typography key={uuid()}>{val.title}</Typography>
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
