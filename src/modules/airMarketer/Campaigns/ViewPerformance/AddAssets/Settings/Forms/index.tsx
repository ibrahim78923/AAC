import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Card, Stack } from '@mui/material';
import { FormsColumns, FormsData } from './Forms.data';

const Forms = () => {
  return (
    <Card sx={{ padding: '18px 27px' }}>
      <Stack gap={3}>
        <Search size="small" placeholder="Search Here" width={260} />
        <TanstackTable columns={FormsColumns} data={FormsData} />
      </Stack>
    </Card>
  );
};

export default Forms;
