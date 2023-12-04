import { Box, Card, Grid, Typography, useTheme } from '@mui/material';
import { createAdTabsData } from './CreateAd.data';
import useCreateAd from './useCreateAd';
import EngagementAd from './EngagementAd';
import WebsiteGenAd from './WebsiteGenAd';
import { v4 as uuidv4 } from 'uuid';

const CreateAd = () => {
  const theme = useTheme();
  const { isActiveAd, setIsActiveAd } = useCreateAd();

  const activeAdComponent = (val: any) => {
    switch (val) {
      case 'engagement-Ad':
        return <EngagementAd />;
      case 'website-Ad':
        return <WebsiteGenAd />;
      case 'generation-Ad':
        return <WebsiteGenAd />;
      case 'search-Ad':
        return <Box>search</Box>;
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight={500}
        color={theme?.palette?.blue?.dull_blue}
      >
        Choose your Ad type
      </Typography>
      <Box>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            {createAdTabsData?.map((item: any) => (
              <Box
                key={uuidv4()}
                my={2}
                sx={{ cursor: 'pointer' }}
                onClick={() => setIsActiveAd(item?.component)}
              >
                <Card
                  sx={{
                    p: 2,
                    boxShadow:
                      isActiveAd === item?.component
                        ? '0px 0px 0px 3px rgb(160, 229, 219,0.5)'
                        : 'white',
                  }}
                >
                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      color={theme?.palette?.slateBlue?.main}
                    >
                      {item?.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={theme?.palette?.custom?.main}
                    >
                      {item?.description}
                    </Typography>
                    <Box display="flex" gap={1} mt={1}>
                      {item?.fbIcon}
                      {item?.linkedInIcon}
                    </Box>
                  </Box>
                </Card>
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} md={8}>
            {activeAdComponent(isActiveAd)}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CreateAd;
