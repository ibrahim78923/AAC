import React from 'react';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { LogoSharedIcon } from '@/assets/icons';
import { style } from './DetailCard.style';
import { isNullOrEmpty } from '@/utils';

const DetailCard = ({
  buyerCompany,
  buyerContact,
  isLoading,
  isSuccess,
}: any) => {
  return (
    <>
      {isLoading && (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={'100%'}
          height={128}
          sx={style?.skeleton}
        />
      )}
      {!isLoading && (
        <Box
          sx={() => style?.cardDetails(isSuccess)}
          className="air-apple-card"
        >
          <Stack
            gap={2}
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
          >
            <Stack gap="20px" direction={{ xs: 'column', sm: 'row' }}>
              <Box sx={{ mt: '5px' }}>
                <LogoSharedIcon />
              </Box>
              <Stack spacing="5px">
                <Typography variant="h5">{buyerCompany?.name}</Typography>
                <Typography variant="body3">
                  {isNullOrEmpty(buyerCompany?.address)
                    ? '----'
                    : buyerCompany?.address}
                </Typography>
                <Typography variant="body3">
                  {isNullOrEmpty(buyerCompany?.city)
                    ? '----'
                    : buyerCompany?.city}
                </Typography>
                <Typography variant="body3">
                  {isNullOrEmpty(buyerCompany?.linkedInUrl)
                    ? '----'
                    : buyerCompany?.linkedInUrl}
                </Typography>
              </Stack>
            </Stack>
            <Box>
              <Stack spacing="5px">
                <Typography variant="h5">Client Information</Typography>
                <Typography variant="body3">
                  {isNullOrEmpty(buyerContact?.address)
                    ? '----'
                    : buyerContact?.address}
                </Typography>
                <Typography variant="body3">
                  {isNullOrEmpty(buyerContact?.phoneNumber)
                    ? '----'
                    : buyerContact?.phoneNumber}
                </Typography>
                <Typography variant="body3">
                  {isNullOrEmpty(buyerContact?.email)
                    ? '----'
                    : buyerContact?.email}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
};
export default DetailCard;
