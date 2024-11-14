import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Card, Stack } from '@mui/material';
import { EmailsColumns, EmailsData } from './Emails.data';

const EmailsComp = () => {
  return (
    <Card sx={{ padding: '18px 27px' }}>
      <Stack gap={3}>
        <Search size="small" placeholder="Search Here" width={260} />
        <TanstackTable columns={EmailsColumns} data={EmailsData} />
      </Stack>
    </Card>
  );
};

export default EmailsComp;
