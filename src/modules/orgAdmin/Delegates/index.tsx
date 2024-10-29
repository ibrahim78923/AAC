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
          <Box
            sx={{
              border: `1px solid ${theme?.palette?.custom?.off_white_one}`,
              marginTop: '1rem',
              padding: '1.2rem',
            }}
          >
            <Grid container spacing={10}>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 400,
                      color: `${theme?.palette?.custom?.main}`,
                      marginBottom: '0.3rem',
                    }}
                  >
                    Total Earnings
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 500,
                      color: `${theme?.palette?.grey[800]}`,
                    }}
                  >
                    £ 1,234.11
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 400,
                      color: `${theme?.palette?.custom?.main}`,
                      marginBottom: '0.3rem',
                    }}
                  >
                    Pending From Inactive Members
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 500,
                      color: `${theme?.palette?.grey[800]}`,
                    }}
                  >
                    £ 1,234.11
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <DelegateCard />
          <DelegateFilterTable />
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
