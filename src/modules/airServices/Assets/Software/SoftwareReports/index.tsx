import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import { SoftwareReportsCards } from './SoftwareReportsCards';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import {
  softwareReportsTabelCoulmns,
  softwareReportsTableData,
} from './SoftwareReprts.data';
import TanstackTable from '@/components/Table/TanstackTable';
import ReportCalendarFilter from '@/components/ReportCalendarFilter';
import { DownloadLargeIcon } from '@/assets/icons';
import { FormProvider, RHFAutocomplete } from '@/components/ReactHookForm';
import { CustomChart } from '@/components/Chart';
import useSoftwareReports from './useSoftwareReports';

export const SoftwareReports = () => {
  const {
    router,
    handleDownload,
    loading,
    softwareReportsCardsData,
    methods,
    handleSubmit,
    onFilterSubmit,
  } = useSoftwareReports();

  return (
    <>
      <PageTitledHeader
        title={'Software Reports'}
        canMovedBack
        moveBack={() =>
          router?.push({
            pathname: AIR_SERVICES?.REPORTS,
          })
        }
      >
        <ReportCalendarFilter setCalendarFilter={{}} />
        <FormProvider methods={methods} onSubmit={handleSubmit(onFilterSubmit)}>
          <Box mt={1}>
            <RHFAutocomplete
              name={'All'}
              placeholder={'All'}
              size={'small'}
              options={['Mobile', 'Desktop', 'Saas']}
            />
          </Box>
        </FormProvider>
        <IconButton
          aria-label={'download'}
          size={'small'}
          sx={{ border: 1, borderRadius: 1, color: 'grey.700' }}
          onClick={handleDownload}
        >
          <DownloadLargeIcon />
        </IconButton>
      </PageTitledHeader>

      <Divider />

      {loading ? (
        <Box
          height={'70vh'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box id={'software-reports'}>
          <SoftwareReportsCards
            softwareReportsCardsData={softwareReportsCardsData}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box
                height={'100%'}
                boxShadow={1}
                border={'1px solid'}
                borderColor={'custom.off_white_one'}
                borderRadius={2}
                px={2}
                py={3}
              >
                <Typography mb={2} variant={'h5'} color={'slateBlue.main'}>
                  Software Distribution
                </Typography>
                <CustomChart
                  type={'pie'}
                  series={[54, 14, 6, 16, 24]}
                  options={{
                    labels: [
                      'Managed',
                      'InReview',
                      'Disabled',
                      'Ignored',
                      'Restricted',
                    ],
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box
                boxShadow={1}
                border={'1px solid'}
                borderColor={'custom.off_white_one'}
                borderRadius={2}
                px={2}
                py={3}
                height={'100%'}
              >
                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(onFilterSubmit)}
                >
                  <Grid container mb={1}>
                    <Grid item xs={3}>
                      <RHFAutocomplete
                        name={'Software'}
                        placeholder={'All Software'}
                        options={[
                          'TotalSoftware',
                          'Restricted',
                          'Ignored',
                          'Managed',
                          'Disabled',
                          'InReview',
                        ]}
                      />
                    </Grid>
                  </Grid>
                </FormProvider>
                <TanstackTable
                  data={softwareReportsTableData}
                  columns={softwareReportsTabelCoulmns}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
