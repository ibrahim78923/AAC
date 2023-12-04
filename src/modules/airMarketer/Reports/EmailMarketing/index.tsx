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

const EmailMarketing = () => {
  const theme = useTheme();
  return (
    <>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Box mt={1}>
          <Link href="/air-marketer/reports">
            <ArrowBack />
          </Link>
        </Box>
        <Box width="100%" display="flex" justifyContent="space-between">
          <Typography
            variant="h3"
            sx={{ color: theme?.palette?.slateBlue['main'], mt: '3px' }}
          >
            Email Marketing
          </Typography>
          <SwitchableDatepicker />
        </Box>
        <Button
          sx={{ p: 0 }}
          className="small"
          variant="outlined"
          color="inherit"
        >
          <DownloadIcon />
        </Button>
      </Box>
      <Grid container gap={1.5}>
        {EmailCradsData?.map((item: any) => (
          <Grid lg={2.9} md={4} sm={6} xs={12} key={uuidv4()}>
            <Card sx={{ border: '1px solid #D2D6DF', mb: 1, height: 100 }}>
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{ fontSize: 16, color: '#79839E', fontWeight: 500 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {item?.reportView}
                </Typography>
                <Typography
                  sx={{
                    mb: 1.5,
                    fontSize: 24,
                    color: '#4CCFBC',
                    fontWeight: 600,
                  }}
                  color="text.secondary"
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
          <Box key={uuidv4()}>
            <Grid item lg={6} md={4} sm={6} xs={12}>
              <Card sx={{ mb: 1 }}>
                <CardContent>
                  <Grid container>
                    <Grid item xs={2}>
                      <Typography
                        sx={{
                          fontSize: '16px',
                          color: '#79839E',
                          fontWeight: 600,
                        }}
                        color="text.secondary"
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
                          color: '#4CCFBC',
                          fontWeight: 600,
                        }}
                        color="text.secondary"
                      >
                        <Typography variant="h4" sx={{ textAlign: 'end' }}>
                          {' '}
                          {item?.precentage}
                        </Typography>
                        <Stack gap={1}>
                          <LinearProgress
                            variant="determinate"
                            value={item?.precentage}
                            sx={{ height: '13px', background: '#FFC20E' }}
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
                          color: '#626E8E',
                        }}
                      >
                        {data?.newHeading}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '16px',
                          fontWeight: 600,
                          color: '#626E8E',
                        }}
                      >
                        {data?.value}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Box>
        ))}
      </Grid>
      <ProductWiseGrpah />
    </>
  );
};

export default EmailMarketing;
