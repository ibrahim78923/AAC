import { Box, Divider, Grid } from '@mui/material';
import { TicketsReportCard } from './TicketsReportCard';
import { TicketsReportHeader } from './TicketsReportHeader';
import { cardOptions } from './TicketsReport.data';
import { useTicketsReport } from './useTicketsReport';
import { TicketsReportChart } from './TicketsReportChart';

export const TicketsReports = () => {
  const { theme, agentFilterMethod, setCalendarFilter, handlePrint, router } =
    useTicketsReport();

  return (
    <>
      <TicketsReportHeader
        theme={theme}
        router={router}
        agentFilterMethod={agentFilterMethod}
        setCalendarFilter={setCalendarFilter}
        handlePrint={handlePrint}
      />
      <Divider
        orientation="horizontal"
        flexItem
        sx={{
          margin: '1rem 1rem',
          borderColor: theme?.palette?.grey[700],
        }}
      />
      <Box id="main-content" p={1.5}>
        <Grid container spacing={2} mb={3}>
          {cardOptions?.map((item: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item?.id}>
              <TicketsReportCard
                label={item.label}
                chipValue={item.chipValue}
                theme={theme}
              />
            </Grid>
          ))}
        </Grid>
        <TicketsReportChart />
      </Box>
    </>
  );
};
