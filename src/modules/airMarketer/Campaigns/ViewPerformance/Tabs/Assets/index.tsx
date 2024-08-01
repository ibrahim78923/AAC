import { Box, Grid } from '@mui/material';
import Cta from './Cta';
import { styles } from './Assets.style';
import FacebookLikes from './FacebookLikes';
import SocialPosts from './SocialPosts';
import Search from '@/components/Search';
import { useState } from 'react';

const Assets = () => {
  const [searchUser, setSearchUser] = useState('');
  return (
    <Box sx={styles?.horizontalTabsBox}>
      <Box sx={styles?.horizontalTabsInnnerBox}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Search
              searchBy={searchUser}
              size="small"
              label={'Search here'}
              setSearchBy={setSearchUser}
            />
          </Grid>
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
