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
import { inventoryColumns } from './InventoryReports.data';
import ReportsCards from './ReportsCards';
import TanstackTable from '@/components/Table/TanstackTable';
import { FormProvider, RHFAutocomplete } from '@/components/ReactHookForm';
import { CustomChart } from '@/components/Chart';
import useInventoryReports from './useInventoryReports';
import ReportCalendarFilter from '@/components/ReportCalendarFilter';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_REPORTS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';

export const InventoryReports = () => {
  const {
    router,
    handleDownload,
    loading,
    cardsData,
    methods,
    handleSubmit,
    onFilterSubmit,
  } = useInventoryReports();

  return (
    <>
      <PageTitledHeader
        title={'Inventory'}
        canMovedBack
        moveBack={() => {
          router?.push(AIR_SERVICES?.REPORTS);
        }}
      >
        <PermissionsGuard
          permissions={[AIR_SERVICES_REPORTS_INVENTORY_PERMISSIONS?.FILTER]}
        >
          <ReportCalendarFilter setCalendarFilter={{}} />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[AIR_SERVICES_REPORTS_INVENTORY_PERMISSIONS?.DOWNLOAD]}
        >
          <IconButton
            aria-label={'download'}
            size={'small'}
            sx={{ border: 1, borderRadius: 1, color: 'grey.700' }}
            onClick={handleDownload}
          >
            <DownloadLargeIcon />
          </IconButton>
        </PermissionsGuard>
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
        <PermissionsGuard
          permissions={[AIR_SERVICES_REPORTS_INVENTORY_PERMISSIONS?.VIEW]}
        >
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
                    Assets Distribution
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
                  <FormProvider
                    methods={methods}
                    onSubmit={handleSubmit(onFilterSubmit)}
                  >
                    <Grid container mb={1}>
                      <Grid item xs={3}>
                        <RHFAutocomplete
                          name={'assets'}
                          placeholder={'All Assets'}
                          options={['BE']}
                        />
                      </Grid>
                    </Grid>
                  </FormProvider>
                  <TanstackTable data={[]} columns={inventoryColumns} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </PermissionsGuard>
      )}
    </>
  );
};
