import { PageTitledHeader } from '@/components/PageTitledHeader';
import { CategoryList } from './CategoryList';
import { ServicesList } from './ServicesList';
import { Box } from '@mui/material';

export const Catalog = () => {
  return (
    <>
      <PageTitledHeader title="All Services" />
      <CategoryList />
      <Box
        sx={{
          py: 2,
          borderTop: '1px solid',
          borderColor: 'custom.off_white_three',
        }}
      />
      <ServicesList />
    </>
  );
};
