import React from 'react';

import { Box, Dialog, DialogContent, Grid } from '@mui/material';

import Image from 'next/image';

import { styles } from './DialogCards.style';
import DealsGraph from '../../DealsGraph';
import MeetingDetails from '../../MeetingDetails';
import TeamActivity from '../../TeamActivity';
import Widget from '../../Widget';

import { isNullOrEmpty } from '@/utils';

import { CloseModalIcon } from '@/assets/icons';
import { NotSelectedItemImage } from '@/assets/images';

const DialogCards = ({ open, setOpen, selectedDashoardWidget }: any) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '8px',
        },
      }}
    >
      <DialogContent sx={{ p: '12px 24px 24px' }}>
        <Box sx={styles.topBar}>
          <Box sx={styles.modalClose} onClick={onClose}>
            <CloseModalIcon />
          </Box>
        </Box>
        <Grid container p={2}>
          {!isNullOrEmpty(selectedDashoardWidget) ? (
            <>
              {' '}
              {selectedDashoardWidget?.closedAndCreatedDeals && (
                <Grid item sm={12} mt={3}>
                  <DealsGraph />
                </Grid>
              )}
              {selectedDashoardWidget?.mettingDetails && (
                <Grid item sm={12} mt={3}>
                  <MeetingDetails />
                </Grid>
              )}
              {selectedDashoardWidget?.teamActivities && (
                <Grid item sm={12} mt={3}>
                  <TeamActivity />
                </Grid>
              )}
              {selectedDashoardWidget?.totalDeals && (
                <Grid item sm={12} mt={3}>
                  <Widget />
                </Grid>
              )}
            </>
          ) : (
            <Grid item sm={12} sx={styles?.defaultSelectedImage} mt={3}>
              <Image src={NotSelectedItemImage} alt="not-selected-Item"></Image>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCards;
