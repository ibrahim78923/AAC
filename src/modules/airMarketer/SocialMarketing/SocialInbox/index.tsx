import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React from 'react';
import { styles } from './SocialInbox.style';
import { FilterSharedIcon } from '@/assets/icons';
import { useSocialInbox } from './useSocialInbox';
import SocialModes from './SocialModes';

const SocialInbox = () => {
  const { theme, socialModeState, handleSelection } = useSocialInbox();
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Box sx={styles?.mainWrapperBox}>
            <Box sx={styles?.wrapperBox}>
              <ToggleButtonGroup
                value={socialModeState}
                exclusive
                onChange={handleSelection}
                aria-label="text alignment"
              >
                <ToggleButton
                  value="TeamChannel"
                  sx={styles?.toggleButtonLeft(theme)}
                  aria-label="left-aligned"
                >
                  Personal Chat
                </ToggleButton>
                <ToggleButton
                  value="GroupChannel"
                  sx={styles?.toggleButtonRight(theme)}
                  aria-label="right-aligned"
                >
                  Group chat
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '20px 0px',
              }}
            >
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Select All"
              />
              <Button sx={styles.filterButton}>
                <FilterSharedIcon /> Filter
              </Button>
            </Box>

            <SocialModes socialModeState={socialModeState} />
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={styles?.mainWrapperBox}></Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SocialInbox;
