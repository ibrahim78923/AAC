import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import { TicketCard } from '../TicketCard';
import { styles } from './WelcomeCard.style';
import { WelcomeCardImage } from '@/assets/images';
import { useWelcomeCard } from './useWelcomeCard';
import ApiErrorState from '@/components/ApiErrorState';
import { TICKET_TYPE } from './WelcomeCard.data';

export const WelcomeCard = (props: any) => {
  const { isRegister = true } = props;
  const { mainWrapper, ticketCardWrapper } = styles;
  const { data, isLoading, isFetching, isError, ticketsCountsData, refetch } =
    useWelcomeCard();
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
        {isRegister && (
          <>
            {isLoading || isFetching ? (
              <Skeleton
                variant="rounded"
                width={'100%'}
                height={50}
                sx={{ bgcolor: 'grey.900', borderRadius: 3 }}
              />
            ) : isError ? (
              <Box width="100%" borderRadius={3}>
                <ApiErrorState
                  height=""
                  textColor="common.white"
                  canRefresh
                  refresh={() => refetch?.()}
                />
              </Box>
            ) : (
              <Box sx={ticketCardWrapper}>
                {ticketsCountsData?.map((singleData: any) => (
                  <TicketCard
                    key={singleData?._id}
                    data={singleData}
                    totalCount={data?.ticketsCount[TICKET_TYPE?.TOTAL]}
                  />
                ))}
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};
