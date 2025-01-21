import { PageTitledHeader } from '@/components/PageTitledHeader';
import { CategoryList } from './CategoryList';
import { ServicesList } from './ServicesList';
import { Divider } from '@mui/material';

export const Catalog = () => {
  return (
    <>
      <PageTitledHeader title="All Services" />
      <CategoryList />
      <Divider sx={{ my: 2 }} />
      <ServicesList />
    </>
  );
};
