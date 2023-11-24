import { Box, Typography, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { overviewData } from './Overview.data';
export const Overview = () => {
  const theme = useTheme();

  return (
    <>
      {overviewData?.map((item: any) => (
        <Box key={uuidv4()}>
          <Box
            width={'100%'}
            borderRadius={'.5rem'}
            sx={{ backgroundColor: theme?.palette?.primary?.light }}
          >
            {item?.detailsData?.map((detail: any) => (
              <Box key={uuidv4()}>
                <Box display={'flex'} alignItems={'center'} padding={'1rem'}>
                  <Box sx={{ width: { sm: '20%', xs: '8rem' } }}>
                    <Typography variant="body2" fontWeight={500}>
                      {detail?.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: theme?.palette?.grey?.[900] }}
                    >
                      {detail?.detail}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
};
