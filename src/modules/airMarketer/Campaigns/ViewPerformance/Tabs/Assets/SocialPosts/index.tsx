import { Box, Button, Grid, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import useSocialPosts from './useSocialPosts';
import { columns } from './SocialPosts.data';
import { styles } from '../Associations.style';
import { SocialsData } from '@/mock/modules/airMarketer/Campaigns/Assets';

const SocialPosts = () => {
  const { theme, setIsOpenAlert, setOpenDrawer } = useSocialPosts();

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 0px 0px 0px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={4} sx={styles?.countBox}>
          <Typography sx={styles?.associationCount(theme)} variant="body3">
            02
          </Typography>

          <Typography variant="subtitle2">Social Posts</Typography>
        </Grid>
        <Grid item md={8}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Button
              variant="outlined"
              className="small"
              sx={{ minWidth: '0px', gap: 0.5 }}
            >
              View all social posts
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={columns({ setOpenDrawer, setIsOpenAlert })}
            data={SocialsData}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SocialPosts;
