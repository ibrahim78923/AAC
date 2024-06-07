import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS } from '@/constants';
import useUpsertMarketingReports from './useUpsertMarketingReports';

export const UpsertMarketingReports = () => {
  const { router } = useUpsertMarketingReports();
  return (
    <PageTitledHeader
      title={'Create Marketing Report'}
      canMovedBack
      moveBack={() => {
        router?.push({
          pathname: AIR_OPERATIONS?.MARKETING_REPORTS,
        });
      }}
    />
  );
};
