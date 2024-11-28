import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Card, Stack } from '@mui/material';
import { SocialPostsColumns, SocialPostsData } from './SocialPosts.data';

const SocialPosts = () => {
  return (
    <Card sx={{ padding: '18px 27px' }}>
      <Stack gap={2}>
        <Search size="small" placeholder="Search Here" width={260} />
        <TanstackTable columns={SocialPostsColumns} data={SocialPostsData} />
      </Stack>
    </Card>
  );
};

export default SocialPosts;
