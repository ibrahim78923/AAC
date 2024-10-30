import { Box, Button, Grid, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import DelegateCard from './DelegateCard';
import DelegateFilterTable from './DelegateFilterTable';
import useDelegates from './useDelegates';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import InviteMemberModal from './InviteMemberModal';

const Delegates = () => {
  const {
    getDelgateDataLoading,
    theme,
    isInviteModalOpen,
    setIsInviteModalOpen,
    getDelegateData,
    tableDataParams,
  } = useDelegates();

  return (
    <Box>
      {getDelgateDataLoading ? (
        <Box>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonTable />
        </Box>
      ) : (
        <Box>
          <Grid container>
            <Grid item lg={6}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 600, color: `${theme?.palette?.grey[800]}` }}
              >
                Delegates
              </Typography>
            </Grid>
            <Grid item lg={6}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  onClick={() => setIsInviteModalOpen(true)}
                  variant="contained"
                  sx={{ fontSize: '14px', fontWeight: 500 }}
                >
                  <AddCircle />
                  &nbsp;&nbsp; Invite Member
                </Button>
              </Box>
            </Grid>
          </Grid>
          <DelegateCard cardData={getDelegateData?.data?.stats} />
          <DelegateFilterTable data={tableDataParams} />
        </Box>
      )}

      <InviteMemberModal
        isInviteModalOpen={isInviteModalOpen}
        setIsInviteModalOpen={setIsInviteModalOpen}
      />
    </Box>
  );
};

export default Delegates;
