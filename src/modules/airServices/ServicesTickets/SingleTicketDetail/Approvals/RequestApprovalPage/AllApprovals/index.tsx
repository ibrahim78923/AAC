import NoData from '@/components/NoData';
import { ApprovalCard } from '../../ApprovalCard';
import { useApprovals } from '../../useApprovals';
import { useEffect } from 'react';

export const AllApprovals = (props: any) => {
  const { data, setApproval, updateRequestApprovalStatus } = props;
  const { setStatus } = useApprovals();

  useEffect(() => {
    setStatus('');
  }, []);

  return (
    <>
      {!!data?.length ? (
        data?.map((item: any) => (
          <ApprovalCard
            key={item?._id}
            data={item}
            setApproval={(x: any) => setApproval?.(x)}
            getUpdateStatus={(item: any) => updateRequestApprovalStatus?.(item)}
          />
        ))
      ) : (
        <NoData />
      )}
    </>
  );
};
