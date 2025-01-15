import { PageTitledHeader } from '@/components/PageTitledHeader';
import { CategoryList } from './CategoryList';
import { ServicesList } from './ServicesList';

export const Catalog = () => {
  return (
    <>
      <PageTitledHeader title="All Services" />
      <CategoryList />
      <br />
      <ServicesList />
    </>
  );
};
