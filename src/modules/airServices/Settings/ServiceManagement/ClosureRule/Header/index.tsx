import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AIR_SERVICES } from '@/constants';

export const Header = () => {
  const router = useRouter();

  return (
    <>
      <Box
        sx={{ cursor: 'pointer' }}
        display={'flex'}
        alignItems={'center'}
        gap={1}
      >
        <ArrowBackIcon
          onClick={() => {
            router?.push({
              pathname: AIR_SERVICES?.SERVICE_MANAGEMENT,
            });
          }}
        />
        <Typography variant="h5">Closure Rules-Ticket</Typography>
      </Box>
      <br />
      <Typography variant="h6">
        Choose the conditions required to resolve or close tickets
      </Typography>
    </>
  );
};
