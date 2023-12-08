import { Box, Grid, Typography } from '@mui/material';
import Cta from './Cta';
import { styles } from './Assets.style';
import FacebookLikes from './FacebookLikes';
import SocialPosts from './SocialPosts';

const Assets = () => {
  return (
    <Box sx={styles?.horizontalTabsBox}>
      <Typography variant="h4">Associations </Typography>
      <Box sx={styles?.horizontalTabsInnnerBox}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Cta />
            <FacebookLikes />
            <SocialPosts />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Assets;
