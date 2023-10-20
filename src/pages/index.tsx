import { Typography } from '@mui/material';

import Layout from '@/layout';

export default function Home() {
  return <Typography variant="h5">Air Apple Cart</Typography>;
}
Home.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
