import { Box, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { CustomTooltip } from '@/components/CustomTooltip';
import TanstackTable from '@/components/Table/TanstackTable';
import { getTopConsumersColumns } from './TopConsumer.data';

export const TopConsumer = (props: any) => {
  const { topConsumerData } = props;

  const topConsumersColumns = getTopConsumersColumns();

  return (
    <Box
      border={1}
      borderColor={'custom.pale_gray'}
      borderRadius={3}
      bgcolor={'common.white'}
    >
      <Box display={'flex'} gap={1} alignItems={'center'} p={2}>
        <Typography variant={'h4'}>Top Consumers</Typography>

        <CustomTooltip
          title={
            'The consumers who have earned the most points will be the top consumers.'
          }
          placement={'right'}
        >
          <ErrorIcon sx={{ color: 'custom.main', cursor: 'pointer' }} />
        </CustomTooltip>
      </Box>

      <TanstackTable columns={topConsumersColumns} data={topConsumerData} />
    </Box>
  );
};
