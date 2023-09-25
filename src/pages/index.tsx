import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import { useTheme } from '@emotion/react';
import { Button, Typography } from '@mui/material';

export default function Home() {
  const theme = useTheme();
  return (
    <div>
      <Typography variant="h1">h1 (Air Apple Cart)</Typography>
      <Typography variant="h2">h2 (Air Apple Cart)</Typography>
      <Typography variant="h3">h3 (Air Apple Cart)</Typography>
      <Typography variant="h4">h4 (Air Apple Cart)</Typography>
      <Typography variant="h5">h5 (Air Apple Cart)</Typography>
      <Typography variant="h6">h6 (Air Apple Cart)</Typography>
      <Typography variant="subtitle1">SubTitle 1 (Air Apple Cart)</Typography>

      <Typography variant="subtitle2">Subtitle 2 (Air Apple Cart)</Typography>

      <Typography variant="body1" sx={{ color: theme?.palette?.primary?.main }}>
        Body 1 (Air Apple Cart)
      </Typography>

      <Typography variant="body2">Body 2 (Air Apple Cart)</Typography>

      <Button variant="contained">Add Button</Button>
      <Button> Cancel </Button>
    </div>
  );
}
Home.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
