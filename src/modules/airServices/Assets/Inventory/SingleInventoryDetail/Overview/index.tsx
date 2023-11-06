import { Box, Typography, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { overviewData } from './Overview.data';
import { styles } from './Overview.style';

export const Overview = () => {
  const theme = useTheme();
  return (
    <Box>
      {overviewData?.map((item) => (
        <Box key={uuidv4()}>
          <Typography variant="h5" py={'.5rem'}>
            {item?.heading}
          </Typography>
          <Box sx={styles?.mainContainerBox}>
            {item?.detailsData?.map((detail) => (
              <Box key={uuidv4()}>
                <Box sx={styles?.childContainerBox}>
                  <Box width={{ sm: '20%', xs: '8.75rem' }}>
                    <Typography variant="body2" fontWeight={500}>
                      {detail?.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color={theme.palette.grey[900]}>
                      {detail?.detail}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={styles?.borderBox} />
        </Box>
      ))}
    </Box>
  );
};
