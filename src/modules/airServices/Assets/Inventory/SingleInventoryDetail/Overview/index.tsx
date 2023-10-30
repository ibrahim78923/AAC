import { Box, Typography, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { overviewData } from './Overview.data';
import { styles } from './Overview.style';
export const Overview = () => {
  const theme = useTheme();
  const { mainContainerBox, childContainerBox, borderBox } = styles();

  return (
    <Box>
      {overviewData?.map((item) => (
        <Box key={uuidv4()}>
          <Typography variant="h5" sx={{ py: '10px' }}>
            {item?.heading}
          </Typography>
          <Box sx={mainContainerBox}>
            {item?.DetailsData?.map((detail) => (
              <Box key={uuidv4()}>
                <Box sx={childContainerBox}>
                  <Box sx={{ width: { sm: '20%', xs: '8.75rem' } }}>
                    <Typography variant="body2" fontWeight={500}>
                      {detail?.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.grey[900] }}
                    >
                      {detail?.detail}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={borderBox} />
        </Box>
      ))}
    </Box>
  );
};
