import { DownloadLargeIcon } from '@/assets/icons';
import { CustomChart } from '@/components/Chart';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FormProvider, RHFAutocomplete } from '@/components/ReactHookForm';
import ReportCalendarFilter from '@/components/ReportCalendarFilter';
import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_SERVICES } from '@/constants';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';

import { ContractReportsCard } from './ContractReportsCard';
import { useContractReports } from './useContractReports';
import {
  contractReportsTabelCoulmns,
  contractReportsTableData,
} from './ContractReportsCard.data';

export const ContractsReports = () => {
  const {
    router,
    methods,
    handleSubmit,
    onFilterSubmit,
    handleDownload,
    loading,
    contractReportsCardData,
  } = useContractReports();
  return (
    <>
      <PageTitledHeader
        title={'Contract'}
        canMovedBack
        moveBack={() => router?.push({ pathname: AIR_SERVICES?.REPORTS })}
      >
        <ReportCalendarFilter setcalender={{}} />
        <Box mt={1} width={'10rem'}>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onFilterSubmit)}
          >
            <RHFAutocomplete
              name={'All'}
              placeholder={'All'}
              options={['Active', 'Draft', 'Approved', 'Expired', 'Terminate']}
              size={'small'}
            />
          </FormProvider>
        </Box>
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
        <Box id={'contract-reports'}>
          <ContractReportsCard
            contractReportsCardData={contractReportsCardData}
          />

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={4}>
              <Box
                border={'1px solid'}
                borderColor={'custom.off_white_one'}
                borderRadius={2}
                boxShadow={1}
                height={'100%'}
                px={2}
                py={3}
              >
                <Typography variant={'h5'} color={'slateBlue.main'}>
                  Contracts Distribution
                </Typography>
                <CustomChart
                  type={'pie'}
                  series={[16, 54, 6, 24]}
                  options={{
                    labels: [
                      'Warranty',
                      'Software License',
                      'Maintenance',
                      'Lease',
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
                        name={'Contracts'}
                        placeholder={'All Contracts'}
                        options={[
                          ' All',
                          'Lease',
                          'Maintaince',
                          'Software',
                          'Warranty',
                        ]}
                      />
                    </Grid>
                  </Grid>
                </FormProvider>
                <TanstackTable
                  data={contractReportsTableData}
                  columns={contractReportsTabelCoulmns}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
