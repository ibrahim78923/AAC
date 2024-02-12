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

import {
  CampaignsCradsData,
  usersColumns,
  usersData,
} from './adsCampaigns.data';
import CampaignsGraphs from './campaignsGraphs';
import useMarketerReports from '../LeadsReports/useMarketerReports';

import { DownloadIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import { AIR_MARKETER } from '@/routesConstants/paths';

const AdsCampaigns = () => {
  const theme = useTheme();
  const { searchBy, setSearchBy }: any = useMarketerReports();

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
            Ad’s Campaigns
          </Typography>
        </Box>
        <Box display="flex" flexWrap="wrap" alignItems="center" gap={1}>
          <SwitchableDatepicker
            sx={{ fontSize: '16px', fontWeight: 500 }}
            placement={'right'}
            renderInput={'button'}
          />
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
      <Grid container item spacing={2}>
        {CampaignsCradsData?.map((item: any) => (
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
      <Box sx={{ mb: '24px' }}>
        <CampaignsGraphs />
      </Box>
      <Card>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          mx={2}
          my={1}
        >
          <Typography
            variant="h5"
            sx={{
              color: theme?.palette?.blue['light'],
              fontSize: '16px',
              mb: { xs: 1 },
            }}
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
        <TanstackTable columns={usersColumns} data={usersData()} isPagination />
      </Card>
    </>
  );
};

export default AdsCampaigns;
