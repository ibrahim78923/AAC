import {
  Box,
  Button,
  Skeleton,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DownloadLargeIcon, RefreshSharedIcon } from '@/assets/icons';
import CardAndGraphs from './PipelineGraph';
import PipelineOverview from './PipelineTable';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import { AIR_SALES } from '@/routesConstants/paths';
import PipeLineCards from './PipelineCards';
import usePipelineForcastReports from './usePipelineForcastReports';
import {
  FormProvider,
  RHFAutocompleteAsync,
  RHFMultiSearchableSelect,
} from '@/components/ReactHookForm';
import { useLazyGetUsersListDropdownQuery } from '@/services/airSales/deals';
import { ARRAY_INDEX, ROLES } from '@/constants/strings';
import { getSession } from '@/utils';
import { useLazyGetTeamsListQuery } from '@/services/airSales/settings/teams';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { styles } from './PipelineForecastReports.style';

const PipelineForecastReports = () => {
  const theme = useTheme<Theme>();

  const {
    router,
    activeCard,
    setActiveCard,
    alignment,
    handleChange,
    dealPipelineData,
    filterValues,
    setFilterValues,
    getPipelineForecastReportData,
    PipelineForecastReportDataIsLoading,
    PipelineForecastReportDataIsFetching,
    PipelineForecastReportDataIsError,
    PipelineForecastReportDataIsSuccess,
    setPageLimit,
    setPage,
    handleSubmit,
    methods,
    handleRefresh,
    datePickerVal,
    setDatePickerVal,
  } = usePipelineForcastReports();

  const pipelineData = dealPipelineData?.data?.map((data: any) => ({
    label: `${data?.name}`,
    value: data?._id,
  }));

  const { user }: any = getSession();
  const organizationId: any = user?.organization?._id;
  const teamsList = useLazyGetTeamsListQuery();

  const userListData = useLazyGetUsersListDropdownQuery();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
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
            Pipeline Forecast Report
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'center',
                alignItems: {
                  xs: 'center',
                  sm: 'start',
                },
                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
              }}
            >
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton
                  disableRipple
                  value="User"
                  sx={{
                    color: theme?.palette?.primary?.main,
                    backgroundColor: '#fff',
                    border: `1px solid ${theme?.palette?.grey[0]}`,
                    height: '38px',
                    '&.Mui-selected': {
                      backgroundColor: theme?.palette?.primary?.main,
                      color: '#fff',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: theme?.palette?.primary?.main,
                    },
                    '&:hover': {
                      backgroundColor: theme?.palette?.primary?.light,
                    },
                  }}
                >
                  Users
                </ToggleButton>
                <ToggleButton
                  disableRipple
                  value="Team"
                  sx={{
                    color: theme?.palette?.primary?.main,
                    backgroundColor: '#fff',
                    border: `1px solid ${theme?.palette?.grey[0]}`,
                    height: '38px',
                    '&.Mui-selected': {
                      backgroundColor: theme?.palette?.primary?.main,
                      color: '#fff',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: theme?.palette?.primary?.main,
                    },
                    '&:hover': {
                      backgroundColor: theme?.palette?.primary?.light,
                    },
                  }}
                >
                  Teams
                </ToggleButton>
              </ToggleButtonGroup>

              <Tooltip title={'Refresh Filter'} placement="top-start" arrow>
                <Button
                  className="small"
                  sx={styles?.refreshButton}
                  onClick={handleRefresh}
                >
                  <RefreshSharedIcon />
                </Button>
              </Tooltip>

              <SwitchableDatepicker
                renderInput="button"
                placement="right"
                dateValue={datePickerVal}
                setDateValue={setDatePickerVal}
                handleDateSubmit={() => {
                  setFilterValues({
                    ...filterValues,
                    to: dayjs(datePickerVal[ARRAY_INDEX?.ZERO]).format(
                      DATE_FORMAT?.API,
                    ),
                    from: dayjs(datePickerVal[ARRAY_INDEX?.ONE]).format(
                      DATE_FORMAT?.API,
                    ),
                  });
                }}
              />

              <RHFAutocompleteAsync
                label=""
                name="userTeam"
                fullWidth
                apiQuery={alignment === 'User' ? userListData : teamsList}
                size="small"
                placeholder={
                  alignment === 'User' ? 'Select user' : 'Select team'
                }
                getOptionLabel={(item: any) =>
                  alignment === 'User'
                    ? item
                      ? `${item?.firstName} ${item?.lastName}`
                      : ''
                    : item?.name
                }
                externalParams={
                  alignment === 'User'
                    ? {
                        role: ROLES?.ORG_EMPLOYEE,
                        organization: organizationId,
                        status: 'ACTIVE',
                      }
                    : {}
                }
                queryKey="role"
              />

              <RHFMultiSearchableSelect
                size="small"
                label=""
                name="pipeline"
                options={pipelineData}
                isCheckBox={true}
                placeholder="select Pipeline"
              />
            </Box>
          </FormProvider>

          <Button
            sx={{ gap: 1, height: '39px' }}
            variant="outlined"
            color="inherit"
          >
            <DownloadLargeIcon />
          </Button>
        </Box>
      </Box>
      <Box mt={4}>
        <PipeLineCards
          activeCard={activeCard}
          setActiveCard={setActiveCard}
          setFilterValues={setFilterValues}
        />
      </Box>

      <Box sx={{ marginTop: '1rem' }}>
        {PipelineForecastReportDataIsLoading ||
        PipelineForecastReportDataIsFetching ? (
          <Skeleton variant="rectangular" width={'100%'} height={600} />
        ) : (
          <CardAndGraphs
            activeCard={activeCard}
            pipelineForecastData={getPipelineForecastReportData?.data}
          />
        )}
      </Box>
      <Box sx={{ marginTop: '1rem' }}>
        <PipelineOverview
          activeCard={activeCard}
          data={getPipelineForecastReportData?.data}
          PipelineForecastReportDataIsLoading={
            PipelineForecastReportDataIsLoading
          }
          PipelineForecastReportDataIsFetching={
            PipelineForecastReportDataIsFetching
          }
          PipelineForecastReportDataIsError={PipelineForecastReportDataIsError}
          PipelineForecastReportDataIsSuccess={
            PipelineForecastReportDataIsSuccess
          }
          setPageLimit={setPageLimit}
          setPage={setPage}
        />
      </Box>
    </>
  );
};

export default PipelineForecastReports;
