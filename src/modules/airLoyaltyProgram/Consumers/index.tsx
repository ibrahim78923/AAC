import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button } from '@mui/material';
import { ConsumerData, getConsumerColumns } from './Consumer.data';
import { useConsumer } from './useConsumer';
import { ConsumersCustomizeIcon } from '@/assets/icons';

export const Consumers = () => {
  const { handleSearch } = useConsumer();
  return (
    <Box>
      <PageTitledHeader title={'Consumers'} />
      <Box display={'flex'} justifyContent={'space-between'}>
        <Search label={'Search'} setSearchBy={handleSearch} size={'small'} />

        <Button
          className="small"
          variant="outlined"
          color="inherit"
          startIcon={<ConsumersCustomizeIcon />}
        >
          Customize
        </Button>
      </Box>
      <Box mt={3}>
        <TanstackTable
          data={ConsumerData()}
          columns={getConsumerColumns()}
          isPagination
        />
      </Box>
    </Box>
  );
};
