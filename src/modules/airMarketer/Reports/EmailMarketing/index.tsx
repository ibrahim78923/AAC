import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { EmailCradsData, EmailMarketingRateCard } from './UserReports.data';
import Link from 'next/link';
import ProductWiseGrpah from './ProductWiseGraph';
import { v4 as uuidv4 } from 'uuid';
import LinearProgress from '@mui/material/LinearProgress';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import { DownloadIcon } from '@/assets/icons';
import { AIR_MARKETER } from '@/routesConstants/paths';

const EmailMarketing = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1}
        mb={2}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link href={AIR_MARKETER?.REPORTS}>
            <ArrowBack sx={{ mt: 1 }} />
          </Link>
          <Typography
            variant="h3"
            sx={{ color: theme?.palette?.slateBlue['main'] }}
          >
            Email Marketing
          </Typography>
        </Box>
        <Box display="flex" flexWrap="wrap" alignItems="center" gap={1}>
          <SwitchableDatepicker />
          <Button
            sx={{ p: 0 }}
            className="small"
            variant="outlined"
            color="inherit"
          >
            <DownloadIcon />
          </Button>
        </Box>
      </Box>

      <Grid container item spacing={3}>
        {EmailCradsData?.map((item: any) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={uuidv4()}>
            <Card
              sx={{
                border: `1px solid ${theme?.palette?.custom?.hawkes_blue}`,
                mb: 1,
                height: 100,
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    color: theme?.palette?.custom?.steel_blue_alpha,
                    fontWeight: 500,
                  }}
                  gutterBottom
                >
                  {item?.reportView}
                </Typography>
                <Typography
                  sx={{
                    mb: 1.5,
                    fontSize: 24,
                    color: theme?.palette?.custom?.turquoise_Blue,
                    fontWeight: 600,
                  }}
                >
                  {item?.Values}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={1.5}>
        {EmailMarketingRateCard?.map((item: any) => (
          <Grid item key={uuidv4()} lg={6} md={6} sm={6} xs={12}>
            <Card sx={{ mb: 1 }}>
              <CardContent>
                <Grid container>
                  <Grid item xs={2}>
                    <Typography
                      sx={{
                        fontSize: '16px',
                        color: theme?.palette?.custom?.steel_blue_alpha,
                        fontWeight: 600,
                      }}
                      gutterBottom
                    >
                      {item?.heading}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      sx={{
                        mb: 1.5,
                        fontSize: 24,
                        color: theme?.palette?.custom?.turquoise_Blue,
                        fontWeight: 600,
                      }}
                    >
                      <Typography variant="h4" sx={{ textAlign: 'end' }}>
                        {' '}
                        {item?.precentage}
                      </Typography>
                      <Stack gap={1}>
                        <LinearProgress
                          variant="determinate"
                          value={item?.precentage}
                          sx={{
                            height: '13px',
                            background: theme?.palette?.warning['main'],
                          }}
                        />
                      </Stack>
                    </Typography>
                  </Grid>
                </Grid>

                {item?.rates?.map((data: any) => (
                  <Box
                    key={uuidv4()}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: theme?.palette?.blue?.lighter,
                      }}
                    >
                      {data?.newHeading}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: theme?.palette?.blue?.lighter,
                      }}
                    >
                      {data?.value}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box>
        <ProductWiseGrpah />
      </Box>
    </>
  );
};

export default EmailMarketing;
