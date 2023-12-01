import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import {
  manageAccountData,
  manageStatusData,
  manageTableColumns,
  manageTableData,
} from './Manage.data';
import { v4 as uuidv4 } from 'uuid';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import useManage from './useManage';
import Search from '@/components/Search';
import { FilterrIcon } from '@/assets/icons';
import usePaidAds from '../usePaidAds';
import PaidAdsFilterDrawer from '../FilterDrwaer';

const Manage = () => {
  const theme = useTheme();
  const { statusBtnValue } = useManage();
  const { isFilterDrawer, setIsFilterDrawer } = usePaidAds();
  return (
    <Box>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs={12} sm={6} md={8.5}>
          <Card sx={{ width: '100%' }}>
            <Grid container p={2.4} justifyContent="space-between">
              {manageStatusData?.map((item: any) => (
                <Grid
                  container
                  item
                  xs={12}
                  md={3}
                  key={uuidv4()}
                  justifyContent="space-around"
                >
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color={theme?.palette?.grey[900]}
                    >
                      {item?.title}
                    </Typography>
                    <Typography variant="h3">{item?.count}</Typography>
                  </Box>
                  {item?.divider && (
                    <Divider
                      sx={{ borderColor: '#E5E7EB' }}
                      orientation="vertical"
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3.5}>
          <Card sx={{ width: '100%' }}>
            <Grid container p={2.4} justifyContent="space-between">
              {manageAccountData?.map((item: any) => (
                <Grid
                  container
                  item
                  xs={12}
                  md={6}
                  key={uuidv4()}
                  justifyContent="space-around"
                >
                  <Box>
                    <Typography
                      variant="body3"
                      fontWeight={500}
                      color={theme?.palette?.grey[900]}
                    >
                      {item?.title}
                    </Typography>
                    <Typography variant="h3">{item?.count}</Typography>
                  </Box>
                  {item?.divider && (
                    <Divider
                      sx={{ borderColor: '#E5E7EB' }}
                      orientation="vertical"
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Box mt={4} display="flex" justifyContent="space-between">
        <Search placeholder="Search" size="small" />
        <Button
          variant="outlined"
          color="inherit"
          className="small"
          onClick={() => setIsFilterDrawer(true)}
          startIcon={<FilterrIcon />}
          sx={{ border: `1px solid ${theme?.palette?.custom?.dark}` }}
        >
          Filter
        </Button>
      </Box>
      <Box mt={2}>
        <TanstackTable
          columns={manageTableColumns(statusBtnValue)}
          data={manageTableData}
        />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>
      {isFilterDrawer && (
        <PaidAdsFilterDrawer
          isOpenDrawer={isFilterDrawer}
          onClose={() => setIsFilterDrawer(false)}
        />
      )}
    </Box>
  );
};

export default Manage;
