import { Box, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { approvalsData } from './Approvals.data';
import NoData from '@/components/NoData';
import ApprovalCard from './ApprovalCard';
import { NoSearchResultFoundImage } from '@/assets/images';

export const Approvals = () => {
  return (
    <Box sx={{ minHeight: '65vh' }}>
      {approvalsData?.length < 1 ? (
        <NoData
          image={NoSearchResultFoundImage}
          message={'No approval found'}
        />
      ) : (
        <>
          <Typography variant="h5" fontWeight={500}>
            Approvals(1)
          </Typography>
          {approvalsData?.map((approval: any) => (
            <ApprovalCard
              key={uuidv4()}
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
