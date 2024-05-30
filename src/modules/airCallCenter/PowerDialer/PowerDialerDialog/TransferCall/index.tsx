import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { CloseModalIcon } from '@/assets/icons';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import Search from '@/components/Search';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import CallTransferToUser from './CallTransferToUser';

export const TransferCall = ({
  openTransferCallModal,
  closeTransferCallModal,
}: any) => {
  const [search, setSearch] = useState<any>('');
  return (
    <>
      {openTransferCallModal && (
        <Dialog
          open={openTransferCallModal}
          onClose={closeTransferCallModal}
          aria-labelledby="responsive-dialog-title"
          PaperProps={{
            style: {
              maxWidth: 560,
              width: 560,
              borderRadius: 12,
            },
          }}
        >
          <DialogTitle
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            paddingBottom={2.4}
          >
            <Typography variant="h4" color="primary?.main">
              Call Transfer To
            </Typography>
            <Box
              onClick={closeTransferCallModal}
              sx={{
                cursor: 'pointer',
              }}
            >
              <CloseModalIcon />
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} mt={2}>
                <Search
                  label="search"
                  searchBy={search}
                  setSearchBy={setSearch}
                  width="100%"
                  placeholder="Search Here"
                />
              </Grid>
              <Grid item xs={12}>
                <HorizontalTabs tabsDataArray={['Internal', 'External']}>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <CallTransferToUser />
                      </Grid>
                      <Grid item xs={12}>
                        <CallTransferToUser />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <CallTransferToUser />
                      </Grid>
                      <Grid item xs={12}>
                        <CallTransferToUser />
                      </Grid>
                    </Grid>
                  </Box>
                </HorizontalTabs>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <LoadingButton
                onClick={closeTransferCallModal}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </LoadingButton>
              <LoadingButton type="submit" variant="contained" color="primary">
                Apply
              </LoadingButton>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
