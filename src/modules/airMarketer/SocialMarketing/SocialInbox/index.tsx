import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React, { useState } from 'react';
import { FilterSharedIcon } from '@/assets/icons';
import { useSocialInbox } from './useSocialInbox';
import SocialModes from './SocialModes';
import FilterDropdown from './SocialModes/FilterDropDown';
import SocialChannels from './SocialChannels';
import { styles } from './SocialInbox.style';
import PostsArea from './PostsArea';

const SocialInbox = () => {
  const { theme, socialModeState, handleSelection } = useSocialInbox();

  const [postMode, setPostMode] = useState('fbPost');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
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
                  Teams
                </ToggleButton>
                <ToggleButton
                  value="GroupChannel"
                  sx={styles?.toggleButtonRight(theme)}
                  aria-label="right-aligned"
                >
                  Channel
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <SocialChannels socialModeState={socialModeState} />

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
              <Button
                sx={styles?.filterButton}
                aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={actionMenuOpen ? 'true' : undefined}
                onClick={handleClick}
              >
                <FilterSharedIcon /> Filter
              </Button>
            </Box>

            <SocialModes
              socialModeState={socialModeState}
              postMode={postMode}
              setPostMode={setPostMode}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={styles?.mainWrapperBox}>
            <PostsArea postMode={postMode} />
          </Box>
        </Grid>
        <FilterDropdown
          anchorEl={anchorEl}
          actionMenuOpen={actionMenuOpen}
          handleClose={handleClose}
        />
      </Grid>
    </Box>
  );
};

export default SocialInbox;
