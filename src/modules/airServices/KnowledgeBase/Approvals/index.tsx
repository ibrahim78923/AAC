import { Box, Typography } from '@mui/material';
import { approvalsData } from './Approvals.data';
import NoData from '@/components/NoData';
import ApprovalCard from './ApprovalCard';

export const Approvals = () => {
  return (
    <Box sx={{ minHeight: '65vh', mt: 2 }}>
      {!!!approvalsData?.length ? (
        <NoData message={'No approval found'} />
      ) : (
        <>
          <Typography variant="h5" fontWeight={500} mb={1}>
            {`Approvals ${
              !!approvalsData?.length ? `(${approvalsData?.length})` : ''
            }`}
          </Typography>
          {approvalsData?.map((approval: any) => (
            <ApprovalCard
              key={approval?._id}
              title={approval?.title}
              folder={approval?.folder}
              author={approval?.author}
              approvalStatus={approval?.approvalStatus}
            />
          ))}
        </>
      )}
    </Box>
  );
};
