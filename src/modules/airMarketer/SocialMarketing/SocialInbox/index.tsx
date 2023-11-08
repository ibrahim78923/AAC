import {
  Box,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React from 'react';
import { styles } from './SocialMarketing.style';
import { useSocialMarketing } from './useSocialMarketing';
import { FilterSharedIcon } from '@/assets/icons';

const SocialInbox = () => {
  const { theme } = useSocialMarketing();
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box sx={styles.wrapperBox}>
            <ToggleButtonGroup
              value={''}
              exclusive
              // onChange={handleSelection}
              aria-label="text alignment"
            >
              <ToggleButton
                value="personalChat"
                sx={styles.toggleButtonLeft(theme)}
                aria-label="left-aligned"
              >
                Personal Chat
              </ToggleButton>
              <ToggleButton
                value="groupChat"
                sx={styles.toggleButtonRight(theme)}
                aria-label="right-aligned"
              >
                Group chat
              </ToggleButton>
            </ToggleButtonGroup>

            <Box>{/* <RHFCheckbox name="cc" label="CC" /> */}</Box>
            <Button>
              <FilterSharedIcon />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={styles.wrapperBox}></Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SocialInbox;
