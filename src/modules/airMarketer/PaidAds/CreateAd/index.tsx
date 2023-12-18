import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import { createAdTabsData } from './CreateAd.data';
import useCreateAd from './useCreateAd';
import { v4 as uuidv4 } from 'uuid';
import { AIR_MARKETER } from '@/routesConstants/paths';

const CreateAd = () => {
  const { isActiveAd, setIsActiveAd, activeAdComponent, router, theme } =
    useCreateAd();

  return (
    <Box>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} lg={4}>
          <Typography
            variant="h4"
            fontWeight={500}
            color={theme?.palette?.blue?.dull_blue}
          >
            Choose your Ad type
          </Typography>
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
                    {item?.linkedInIcon}
                    {item?.fbIcon}
                  </Box>
                </Box>
              </Card>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          {activeAdComponent(isActiveAd)}
        </Grid>
      </Grid>
      <Divider
        sx={{
          my: 2,
          border: `1px solid ${theme?.palette?.grey[700]}`,
        }}
      />
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => router.push(AIR_MARKETER?.PAID_ADS)}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => router.push(AIR_MARKETER?.ENGAGEMENT_ADS)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default CreateAd;
