import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  manageAccountData,
  manageStatusData,
  manageTableColumns,
  manageTableData,
} from './DealStage.data';
import { v4 as uuidv4 } from 'uuid';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import Search from '@/components/Search';
import { FilterrIcon, RefreshTasksIcon } from '@/assets/icons';
import useForecast from '../useforecast';
import ForecastFilterDrawer from '../FilterDrwaer';
import Link from 'next/link';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { styles } from './DealStage.style';
import useDealStage from './useDealStage';

const DealStage = () => {
  const { isFilterDrawer, setIsFilterDrawer } = useForecast();
  const {
    theme,
    anchorEl,
    isDisabled,
    setIsDisabled,
    tableRowValues,
    setTableRowValues,
    open,
    handleClose,
    handleClick,
  } = useDealStage();

  return (
    <Box>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs={12} sm={6} md={8.5}>
          <Card sx={{ width: '100%' }}>
            <Typography variant="h4" fontWeight={600} pt={2.4} px={2.4}>
              All Teams
            </Typography>
            <Grid container p={2.4} justifyContent="space-between">
              {manageStatusData?.map((item: any) => (
                <Grid
                  container
                  item
                  xs={12}
                  sm={6}
                  lg={3}
                  key={uuidv4()}
                  justifyContent={{ xs: 'flex-start', lg: 'space-around' }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color={theme?.palette?.grey[900]}
                    >
                      {item?.title}
                    </Typography>
                    <Typography
                      variant="h3"
                      textAlign="center"
                      fontWeight={700}
                    >
                      £{item?.count}
                    </Typography>
                  </Box>
                  {item?.divider && (
                    <Divider
                      sx={{
                        borderColor: theme?.palette?.grey[700],
                        display: { xs: 'none', lg: 'block' },
                      }}
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
            <Typography variant="h4" fontWeight={600} pt={2.4} px={2.4}>
              Sales Pipelin
            </Typography>
            <Grid container p={2.4} justifyContent="space-between">
              {manageAccountData?.map((item: any) => (
                <Grid
                  container
                  item
                  xs={12}
                  lg={6}
                  key={uuidv4()}
                  justifyContent={{ xs: 'flex-start', lg: 'space-around' }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color={theme?.palette?.grey[900]}
                    >
                      {item?.title}
                    </Typography>
                    <Typography variant="h3" textAlign="center">
                      £{item?.count}
                    </Typography>
                  </Box>
                  {item?.divider && (
                    <Divider
                      sx={{
                        borderColor: theme?.palette?.grey[700],
                        display: { xs: 'none', lg: 'block' },
                      }}
                      orientation="vertical"
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Box
        mt={4}
        display="flex"
        justifyContent="space-between"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={1}
      >
        <Search placeholder="Search" size="small" />
        <Box display="flex" gap={1}>
          <Stack
            direction={{ xs: 'row' }}
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            width={{ xs: '100%', sm: 'auto' }}
          >
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              className="small"
              sx={styles?.actionButton(theme)}
              disabled={isDisabled}
            >
              Actions <ArrowDropDownIcon />
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <Link href="">
                <MenuItem>View Deal</MenuItem>
              </Link>
            </Menu>
          </Stack>
          <Tooltip title={'Refresh Filter'}>
            <Button variant="outlined" color="inherit" className="small">
              <RefreshTasksIcon />
            </Button>
          </Tooltip>
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
      </Box>
      <Box mt={2}>
        <TanstackTable
          columns={manageTableColumns(
            theme,
            isDisabled,
            setIsDisabled,
            tableRowValues,
            setTableRowValues,
          )}
          data={manageTableData}
        />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>
      {isFilterDrawer && (
        <ForecastFilterDrawer
          isOpenDrawer={isFilterDrawer}
          onClose={() => setIsFilterDrawer(false)}
        />
      )}
    </Box>
  );
};

export default DealStage;
