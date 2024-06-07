import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS } from '@/constants';
import useUpsertSalesReports from './useUpsertSalesReports';

export const UpsertSalesReports = () => {
  const { router } = useUpsertSalesReports();
  return (
    <PageTitledHeader
      title={'Create Sales Report'}
      canMovedBack
      moveBack={() => {
        router?.push({
          pathname: AIR_OPERATIONS?.SALES_REPORTS,
        });
      }}
    />
  );
};
