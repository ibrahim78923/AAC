import Link from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import Search from '@/components/Search';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import {
  CampaignsCradsData,
  usersColumns,
  usersData,
} from './adsCampaigns.data';
import CampaignsGraphs from './campaignsGraphs';
import useMarketerReports from '../LeadsReports/useMarketerReports';

import { DownloadIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';

const AdsCampaigns = () => {
  const theme = useTheme();
  const { searchBy, setSearchBy }: any = useMarketerReports();

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
            sx={{ color: theme?.palette?.slateBlue['main'] }}
          >
            Ads Campaigns
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
        {CampaignsCradsData?.map((item: any) => (
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
      <Box sx={{ mb: '24px' }}>
        <CampaignsGraphs />
      </Box>
      <Card>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mx={2}
          my={1}
        >
          <Typography
            variant="h5"
            sx={{ color: theme?.palette?.blue['light'], fontSize: '16px' }}
          >
            Ad Campaigns
          </Typography>
          <Search
            label="Search Here"
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            width={240}
          />
        </Box>
        <Box>
          <TanstackTable columns={usersColumns} data={usersData} />
          <CustomPagination
            count={1}
            rowsPerPageOptions={[1, 2]}
            entriePages={1}
          />
        </Box>
      </Card>
    </>
  );
};

export default AdsCampaigns;
