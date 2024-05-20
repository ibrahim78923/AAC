import { DownloadLargeIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import ReportsCards from './ReportsCards';
import TanstackTable from '@/components/Table/TanstackTable';
import { FormProvider, RHFAutocomplete } from '@/components/ReactHookForm';
import { CustomChart } from '@/components/Chart';
import usePurchaseOrdersReports from './usePurchaseOrdersReports';
import ReportCalendarFilter from '@/components/ReportCalendarFilter';
import { purchaseOrdersColumns } from './PurchaseOrdersReports.data';

export const PurchaseOrdersReports = () => {
  const {
    router,
    handleDownload,
    loading,
    cardsData,
    methodsTable,
    methodsHeader,
  } = usePurchaseOrdersReports();

  return (
    <>
      <PageTitledHeader
        title={'Purchase Order'}
        canMovedBack
        moveBack={() => {
          router?.push(AIR_SERVICES?.REPORTS);
        }}
      >
        <ReportCalendarFilter setCalendarFilter={{}} />
        <FormProvider methods={methodsHeader}>
          <Box mt={1}>
            <RHFAutocomplete
              name={'assets'}
              placeholder={'All'}
              options={['BE']}
              size={'small'}
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
        <Box id={'inventory-reports'}>
          <ReportsCards cardsData={cardsData} />

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
                  Purchase Order Distribution
                </Typography>
                <CustomChart
                  type={'pie'}
                  series={[44, 55, 13, 43]}
                  options={{
                    labels: [],
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
                <FormProvider methods={methodsTable}>
                  <Grid container mb={1}>
                    <Grid item xs={4}>
                      <RHFAutocomplete
                        name={'assets'}
                        placeholder={'All Purchase Orders'}
                        options={['BE']}
                      />
                    </Grid>
                  </Grid>
                </FormProvider>
                <TanstackTable data={[]} columns={purchaseOrdersColumns} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
