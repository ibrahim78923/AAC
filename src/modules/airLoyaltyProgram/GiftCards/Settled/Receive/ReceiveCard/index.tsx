import { ImportBoxIcon } from '@/assets/icons';
import { Box, Card, Typography, useTheme } from '@mui/material';

export const ReceiveCard = ({ values }: any) => {
  const { palette }: any = useTheme();
  const isPriceGreaterThanZero = values?.price > 0;

  return (
    <Box>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: isPriceGreaterThanZero
            ? palette?.primary?.main
            : palette?.custom?.off_white_one,
          borderRadius: '14px',
          p: 1.5,
          gap: 1,
        }}
      >
        <Box
          py={'5px'}
          px={'7px'}
          bgcolor={
            isPriceGreaterThanZero
              ? palette?.primary?.light
              : palette?.custom?.hawkes_blue
          }
          borderRadius={'10px'}
        >
          <ImportBoxIcon
            color={
              isPriceGreaterThanZero
                ? palette?.blue?.main
                : palette?.custom?.cadet_color
            }
          />
        </Box>
        <Box
          color={
            isPriceGreaterThanZero
              ? palette?.common?.white
              : palette?.secondary?.lighter
          }
        >
          <Typography variant="body2" fontWeight={600}>
            PKR {values?.price}
          </Typography>
          <Typography variant="body4">
            Receive From: {values?.receive}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};
