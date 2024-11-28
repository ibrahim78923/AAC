import { DataRecordCount } from '@/components/DataRecordCount';
import { useAppSelector } from '@/redux/store';

export const TotalCount = () => {
  const totalCount = useAppSelector(
    (state) => state?.servicesRelatedTickets?.totalCount,
  );

  const isTotalCountLoading = useAppSelector(
    (state) => state?.servicesRelatedTickets?.isTotalCountLoading,
  );

  return (
    <DataRecordCount
      recordName=" Child Tickets"
      isCountLoading={isTotalCountLoading}
      totalCount={totalCount}
      recordNameVariant="h5"
      flexDirection="row-reverse"
    />
  );
};
