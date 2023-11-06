import React from 'react';

import Image from 'next/image';

import { Box, Button, Grid, Menu, MenuItem, Typography } from '@mui/material';

import { ArrowDropDown } from '@mui/icons-material';

import { AlertModals } from '@/components/AlertModals';
import { ScheduleModals } from '@/components/ScheduleModals';

import { EmailTestingData } from '@/mock/modules/airSales/Contacts/ContactViewDetails';

import useEmailActionDropdown from './useEmailActionDropDown';

import { isNullOrEmpty } from '@/utils';

import { styles } from './EmailActionDropDown.style';

const EmailActionDropDown = (props: any) => {
  const { setOpenDrawer, selectedCheckboxes } = props;

  const {
    theme,
    isMenuOpen,
    anchorEl,
    handleOpenMenu,
    handleCloseMenu,
    openAlertModal,
    handleOpenReplyDrawer,
    handleOpenForwardDrawer,
    handleOpenReassignAlert,
    handleOpenDeleteAlert,
    handleCloseAlert,
  } = useEmailActionDropdown({ setOpenDrawer });

  return (
    <div>
      <Button
        endIcon={<ArrowDropDown />}
        sx={{
          border: `1px solid ${theme.palette.custom.dark}`,
          color: `${theme.palette.custom.main}`,
          minWidth: '0px',
        }}
        aria-controls={isMenuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={handleOpenMenu}
        className="small"
        disabled={
          selectedCheckboxes?.length === 0 || selectedCheckboxes?.length > 1
        }
      >
        Action
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleOpenReassignAlert}>View Thread</MenuItem>
        <MenuItem onClick={handleOpenForwardDrawer}>Forward</MenuItem>
        <MenuItem onClick={handleOpenReplyDrawer}>Reply</MenuItem>
        <MenuItem onClick={handleOpenDeleteAlert}>Delete</MenuItem>
      </Menu>

      <ScheduleModals
        message={
          "You're about to delete a record. Deleted records can't be restored after 90 days."
        }
        submitButonText="Update"
        type={'assign'}
        open={openAlertModal === 'Reassign'}
        handleClose={handleCloseAlert}
        handleSubmit={handleCloseAlert}
      >
        <Grid container>
          {!isNullOrEmpty(EmailTestingData) &&
            EmailTestingData?.map((item: any) => (
              <Grid item xs={12} sx={styles?.emailBox} key={item?.name}>
                <Grid container spacing={1}>
                  <Grid item sm={1.6} xs={12}>
                    <Image
                      src={item?.avatar}
                      alt="item.image"
                      width={50}
                      height={50}
                    />
                  </Grid>
                  <Grid item sm={10.4} xs={12}>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Box>
                        <Typography variant="subtitle2">
                          {item?.name}
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                          <Typography
                            variant="body3"
                            sx={{ color: theme?.palette?.grey[900] }}
                          >
                            to:
                          </Typography>
                          <Typography
                            variant="body3"
                            sx={{ color: theme?.palette?.grey[600] }}
                          >
                            {item?.emailTo}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="body3"
                        sx={{ color: theme?.palette?.grey[900] }}
                      >
                        {item?.createdDate}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={styles?.subjectHeading(theme)}
                    >
                      {item?.subjectHeading}
                    </Typography>
                    {item?.sendingReply && (
                      <Typography
                        variant="body3"
                        sx={{ color: theme?.palette?.grey[900] }}
                      >
                        {item?.sendingReply}
                        <br />
                      </Typography>
                    )}
                    <Typography
                      variant="body2"
                      sx={{
                        borderLeft: '1px solid #D2D6DF',
                        paddingLeft: '5px',
                        color: theme?.palette?.grey[900],
                      }}
                    >
                      {item?.subject && item?.subject}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </ScheduleModals>

      <AlertModals
        message={
          "You're about to delete a record. Deleted records can't be restored after 90 days."
        }
        type={'delete'}
        open={openAlertModal === 'Delete'}
        handleClose={handleCloseAlert}
        handleSubmit={handleCloseAlert}
      />
    </div>
  );
};
export default EmailActionDropDown;
