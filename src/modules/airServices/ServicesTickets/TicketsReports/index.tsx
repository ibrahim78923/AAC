import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { TicketsReportCard } from './TicketsReportCard';
import { cardOptions } from './TicketsReport.data';
import { useTicketsReport } from './useTicketsReport';
import { TicketsReportChart } from './TicketsReportChart';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import { DownloadLargeIcon } from '@/assets/icons';
import ReportCalendarFilter from '@/components/ReportCalendarFilter';
import { FormProvider } from 'react-hook-form';
import { RHFAutocompleteAsync } from '@/components/ReactHookForm';

export const TicketsReports = () => {
  const {
    agentFilterMethod,
    setCalendarFilter,
    handlePrint,
    router,
    loading,
    apiQueryOrganizations,
  } = useTicketsReport();

  return (
    <>
      <PageTitledHeader
        title={'Tickets'}
        canMovedBack
        moveBack={() => {
          router?.push(AIR_SERVICES?.REPORTS);
        }}
      >
        <ReportCalendarFilter setCalendarFilter={setCalendarFilter} />
        <FormProvider {...agentFilterMethod}>
          <Box width={'10rem'} mt={1}>
            <RHFAutocompleteAsync
              name="agent"
              size="small"
              placeholder="Agent"
              apiQuery={apiQueryOrganizations}
              getOptionLabel={(option: any) => option?.firstName}
              renderOption={(option: any) => (
                <Box display={'flex'} alignItems={'center'} gap={1}>
                  <Avatar />
                  <Typography
                    variant={'body2'}
                    color={'grey.600'}
                    fontWeight={500}
                  >
                    {option?.firstName} {option?.lastName}
                  </Typography>
                </Box>
              )}
            />
          </Box>
        </FormProvider>
        <IconButton
          aria-label={'download'}
          size={'small'}
          sx={{ border: 1, borderRadius: 1, color: 'grey.700' }}
          onClick={handlePrint}
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
        <Box id="main-content">
          <Grid container spacing={2} my={2}>
            {cardOptions?.map((item: any) => (
              <Grid item xs={12} md={6} lg={3} key={item?.id}>
                <TicketsReportCard
                  label={item.label}
                  chipValue={item.chipValue}
                />
              </Grid>
            ))}
          </Grid>
          <TicketsReportChart />
        </Box>
      )}
    </>
  );
};
