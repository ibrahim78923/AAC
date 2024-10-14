import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button } from '@mui/material';
import { consumerData } from './Consumer.data';
import { useConsumer } from './useConsumer';
import { ConsumersCustomizeIcon } from '@/assets/icons';

export const Consumers = () => {
  const { handleSearch, consumersListColumn } = useConsumer();
  return (
    <Box>
      <PageTitledHeader title={'Consumers'} />
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        gap={2}
        justifyContent={'space-between'}
      >
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
      <Box mt={3} border={`1px solid`} borderColor={'grey.700'} py={1}>
        <TanstackTable
          data={consumerData}
          columns={consumersListColumn}
          isPagination
        />
      </Box>
    </Box>
  );
};
