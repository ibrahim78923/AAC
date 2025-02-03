import { RecordCountChip } from '@/components/Chip/RecordCountChip';
import { useAppSelector } from '@/redux/store';

export const TotalCount = () => {
  const totalCount = useAppSelector(
    (state) => state?.servicesRelatedTickets?.totalCount,
  );

  const isTotalCountLoading = useAppSelector(
    (state) => state?.servicesRelatedTickets?.isTotalCountLoading,
  );

  return (
    <RecordCountChip
      recordName=" Child Tickets"
      isCountLoading={isTotalCountLoading}
      totalCount={totalCount}
      recordNameVariant="h5"
      flexDirection="row-reverse"
    />
  );
};
