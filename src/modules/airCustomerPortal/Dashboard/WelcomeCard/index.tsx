import React from 'react';
import { Box, Typography } from '@mui/material';
import { TicketCard } from '../TicketCard';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './WelcomeCard.style';
import { WelcomeCardImage } from '@/assets/images';
import { useWelcomeCard } from './useWelcomeCard';

export const WelcomeCard = () => {
  const { mainWrapper, ticketCardWrapper } = styles;
  const { data, isLoading, isFetching } = useWelcomeCard();
  return (
    <>
      <Box
        sx={{
          ...mainWrapper,
          backgroundImage: `url(${WelcomeCardImage?.src})`,
        }}
      >
        <Box flexBasis={{ xs: '100%', xl: '50%' }}>
          <Typography variant="h4" fontWeight={700} color={'white'}>
            Welcome to AirApple Cart - Services
          </Typography>
          <Typography variant="body2" color={'white'}>
            We are here to help you, Please let us know what you need.
          </Typography>
        </Box>
        <Box sx={ticketCardWrapper}>
          {Object?.entries(data?.ticketsCount ?? {})?.map((singleData: any) => (
            <TicketCard
              key={uuidv4()}
              data={singleData}
              totalCount={data?.ticketsCount}
              isLoading={isLoading}
              isFetching={isFetching}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};
