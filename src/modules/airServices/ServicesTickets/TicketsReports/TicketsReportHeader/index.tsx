import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DownloadLargeIcon } from '@/assets/icons';
import { RHFAutocomplete } from '@/components/ReactHookForm';
import { agentsOptions } from '../TicketsReport.data';
import { FormProvider } from 'react-hook-form';
import ReportCalendarFilter from '@/components/ReportCalendarFilter';
import { AIR_SERVICES } from '@/constants';
export const TicketsReportHeader = (props: any) => {
  const { agentFilterMethod, theme, setCalendarFilter, handlePrint, router } =
    props;
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      flexWrap={'wrap'}
      alignItems={'center'}
      gap={1}
    >
      <Box display={'flex'} gap={1}>
        <ArrowBackIcon
          onClick={() =>
            router?.push({
              pathname: AIR_SERVICES?.REPORTS,
            })
          }
          cursor={'pointer'}
        />
        <Typography variant="h5">Tickets</Typography>
      </Box>

      <Box display={'flex'} flexWrap={'wrap'} gap={1}>
        <ReportCalendarFilter setCalendarFilter={setCalendarFilter} />
        <FormProvider {...agentFilterMethod}>
          <Box width={'7rem'}>
            <RHFAutocomplete
              name="agent"
              size="small"
              options={agentsOptions}
              placeholder="Agent"
              getOptionLabel={(option: any) => option?.label}
            />
          </Box>
        </FormProvider>
        <IconButton
          sx={{
            height: '40px',
            width: '44px',
            borderRadius: 1,
            border: 1,
            borderColor: theme?.palette?.custom?.dark,
          }}
          onClick={handlePrint}
        >
          <DownloadLargeIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
