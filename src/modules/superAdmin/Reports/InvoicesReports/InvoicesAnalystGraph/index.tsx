import dynamic from 'next/dynamic';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material';
import { styles } from './InvoicesAnalystGraph.style';
import {
  options,
  monthWiseSeries,
  isWeeklyData,
  weekWiseSeries,
} from './InvoicesAnalystGraph.data';
import { useTheme } from '@mui/material/styles';
import useInvoicesAnalyst from './useInvoicesAnalyst';
import ArrowDown from '@/assets/icons/modules/airSales/deals/arrow-down';
import { v4 as uuidv4 } from 'uuid';
import { RefreshTasksIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { InvoicesAnalystGraphProps } from '@/modules/superAdmin/Reports/Reports.interface';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { indexNumbers } from '@/constants';

const InvoicesAnalystGraph = (props: InvoicesAnalystGraphProps) => {
  const { invoicesReportsGraph, filter, setFilter, resetFilters, isLoading } =
    props;
  const {
    monthsFilter,
    clientsFilter,
    openClientsFilter,
    openMonthsFilter,
    handleClickClientsFilter,
    handleCloseClientsFilter,
    handleClickMonthsFilter,
    handleCloseMonthsFilter,
    customizeData,
    setSearchCompany,
    searchCompany,
    organizationsList,
    monthFilter,
  } = useInvoicesAnalyst();
  const theme = useTheme();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });
  const isWeeks = isWeeklyData(invoicesReportsGraph);

  return (
    <Box sx={styles?.productWiseGraph}>
      <Box display="flex" justifyContent="space-between">
        <Typography
          sx={{
            color: `${theme?.palette?.custom?.dark_blue}`,
            fontWeight: 600,
            fontSize: '18px',
          }}
        >
          Invoicing Analytics
        </Typography>
        <Box display="flex" gap={1}>
          <Tooltip title="Refresh Filter">
            <Button
              variant="outlined"
              color="inherit"
              className="small"
              onClick={() => {
                resetFilters();
                setSearchCompany('');
              }}
            >
              <RefreshTasksIcon />
            </Button>
          </Tooltip>
          <Box>
            <Button
              sx={{ gap: 1, height: '30px' }}
              variant="outlined"
              onClick={handleClickMonthsFilter}
              size="small"
              className="small"
              endIcon={<ArrowDown />}
              color="inherit"
            >
              {filter?.month?.replace('_', ' ')?.toLowerCase()}
            </Button>
            <Popover
              open={openMonthsFilter}
              anchorEl={monthsFilter}
              onClose={handleCloseMonthsFilter}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {monthFilter?.map((data: any) => (
                <Box
                  key={uuidv4()}
                  sx={{ mx: 1, py: '10px', cursor: 'pointer' }}
                  onClick={() => {
                    setFilter({ ...filter, month: data?.value });
                    handleCloseMonthsFilter();
                  }}
                >
                  <Typography>{data?.label}</Typography>
                </Box>
              ))}
            </Popover>
          </Box>
          <Box>
            <Button
              sx={{ gap: 1, height: '30px' }}
              variant="outlined"
              onClick={handleClickClientsFilter}
              size="small"
              className="small"
              endIcon={<ArrowDown />}
              color="inherit"
            >
              Clients
            </Button>
            <Popover
              open={openClientsFilter}
              anchorEl={clientsFilter}
              onClose={handleCloseClientsFilter}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Search
                placeholder="Search Here"
                searchBy={searchCompany}
                setSearchBy={setSearchCompany}
              />
              {customizeData(organizationsList)?.map((data: any) => (
                <Box sx={{ mx: 1 }} key={uuidv4()}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={data?.value}
                        checked={filter?.clients?.includes(data?.value)}
                        onChange={(event: any) => {
                          if (event.target.checked) {
                            setFilter({
                              ...filter,
                              clients: [
                                ...(filter?.clients || []),
                                event?.target?.value,
                              ],
                            });
                          } else {
                            setFilter({
                              ...filter,
                              clients: filter?.clients?.filter(
                                (value: any) => value !== event?.target?.value,
                              ),
                            });
                          }
                        }}
                      />
                    }
                    label={data?.label}
                  />
                </Box>
              ))}
            </Popover>
          </Box>
        </Box>
      </Box>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <Box height="350px">
          {invoicesReportsGraph?.length === indexNumbers?.ZERO ||
          invoicesReportsGraph?.every(
            (item: any) =>
              item?.paid === indexNumbers?.ZERO &&
              item?.followUpSoon === indexNumbers?.ZERO &&
              item?.followUpNow === indexNumbers?.ZERO &&
              item?.totalAmount === indexNumbers?.ZERO,
          ) ? (
            <Box
              height="330px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="h6"
                fontWeight={600}
                color={theme?.palette?.grey[900]}
              >
                No Data Found
              </Typography>
            </Box>
          ) : (
            <ReactApexChart
              options={options(invoicesReportsGraph)}
              series={
                isWeeks
                  ? weekWiseSeries(invoicesReportsGraph)
                  : monthWiseSeries(invoicesReportsGraph)
              }
              type="bar"
              height={350}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default InvoicesAnalystGraph;
