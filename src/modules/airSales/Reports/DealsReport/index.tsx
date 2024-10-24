import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Popover,
  Theme,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DownloadLargeIcon, RefreshTasksIcon } from '@/assets/icons';
import CardAndGraphs from './CardAndGraph';
import DealsOverview from './DealsOverview';
import { v4 as uuidv4 } from 'uuid';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import ArrowDown from '@/assets/icons/modules/airSales/deals/arrow-down';
import { AIR_SALES } from '@/routesConstants/paths';
import useDealsReports from './useDealsReports';
import NoData from '@/components/NoData';
import { dealStatus } from '@/constants';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const DealsReport = () => {
  const theme = useTheme<Theme>();
  const {
    dealsOwner,
    router,
    filter,
    setFilter,
    dealsReportsTable,
    dealsReportsCardsData,
    dealsReportsGraphData,
    setSearchBy,
    resetFilters,
    pipelineData,
    setPage,
    setLimit,
    datePickerVal,
    setDatePickerVal,
    open,
    anchorEl,
    handleClick,
    handleClose,
    openPipeline,
    anchorElNew,
    handleClickPipeline,
    handleClosePipleine,
    customizeData,
    pipelineDropdown,
    isLoading,
  } = useDealsReports();

  return (
    <Box>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ArrowBackIcon
                sx={{
                  cursor: 'pointer',
                  color: `${theme?.palette?.custom.light}`,
                }}
                onClick={() => router.push(AIR_SALES?.REPORTS)}
              />
              <Typography
                variant="h3"
                sx={{ color: `${theme?.palette?.grey[800]}` }}
              >
                Deals Report
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Refresh Filter">
                <Button
                  variant="outlined"
                  color="inherit"
                  className="small"
                  onClick={resetFilters}
                >
                  <RefreshTasksIcon />
                </Button>
              </Tooltip>
              <SwitchableDatepicker
                renderInput="button"
                placement="right"
                dateValue={datePickerVal}
                setDateValue={setDatePickerVal}
                handleDateSubmit={() => {
                  setFilter({ ...filter, date: datePickerVal });
                }}
              />
              <Button
                sx={{ gap: 1, height: '30px' }}
                variant="outlined"
                onClick={handleClick}
                size="small"
                className="small"
                endIcon={<ArrowDown />}
                color="inherit"
              >
                Owner
              </Button>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <Typography variant="h5" sx={{ p: 1, fontSize: '16px' }}>
                  Owner
                </Typography>
                {customizeData(dealsOwner)?.map((data: any) => (
                  <Box sx={{ ml: 1 }} key={uuidv4()}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={data?.value}
                          checked={filter?.owners?.includes(data?.value)}
                          onChange={(event: any) => {
                            if (event.target.checked) {
                              setFilter({
                                ...filter,
                                owners: [
                                  ...(filter?.owners || []),
                                  event?.target?.value,
                                ],
                              });
                            } else {
                              setFilter({
                                ...filter,
                                owners: filter?.owners?.filter(
                                  (value: any) =>
                                    value !== event?.target?.value,
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
              <Button
                sx={{ gap: 1, height: '30px' }}
                variant="outlined"
                onClick={handleClickPipeline}
                size="small"
                className="small"
                color="inherit"
                endIcon={<ArrowDown />}
              >
                Pipeline
              </Button>
              <Popover
                open={openPipeline}
                anchorEl={anchorElNew}
                onClose={handleClosePipleine}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                {pipelineDropdown(pipelineData)?.map((item: any) => (
                  <Box sx={{ ml: 1 }} key={uuidv4()}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={item?.value}
                          checked={filter?.pipelines?.includes(item?.value)}
                          onChange={(event: any) => {
                            if (event.target.checked) {
                              setFilter({
                                ...filter,
                                pipelines: [
                                  ...(filter?.pipelines || []),
                                  event?.target?.value,
                                ],
                              });
                            } else {
                              setFilter({
                                ...filter,
                                pipelines: filter?.pipelines?.filter(
                                  (value: any) =>
                                    value !== event?.target?.value,
                                ),
                              });
                            }
                          }}
                        />
                      }
                      label={item?.label}
                    />
                  </Box>
                ))}
              </Popover>
              <Button
                sx={{ gap: 1, height: '30px' }}
                variant="outlined"
                onClick={handleClickPipeline}
                className="small"
                color="inherit"
              >
                <DownloadLargeIcon />
              </Button>
            </Box>
          </Box>
          {dealsReportsGraphData?.length === dealStatus?.INITIAL_NUMBER &&
          dealsReportsTable?.deals?.length === dealStatus?.INITIAL_NUMBER ? (
            <NoData />
          ) : (
            <Box>
              <Box sx={{ marginTop: '1rem' }}>
                <CardAndGraphs
                  dealsReportsCardsData={dealsReportsCardsData}
                  dealsReportsGraphData={dealsReportsGraphData}
                />
              </Box>
              <Box sx={{ marginTop: '1rem' }}>
                <DealsOverview
                  setPage={setPage}
                  setLimit={setLimit}
                  setSearchBy={setSearchBy}
                  dealsReportsTable={dealsReportsTable}
                />
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default DealsReport;
