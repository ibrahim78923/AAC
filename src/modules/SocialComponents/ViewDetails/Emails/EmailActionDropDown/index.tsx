import Image from 'next/image';

import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
} from '@mui/material';

import { AlertModals } from '@/components/AlertModals';
import { ScheduleModals } from '@/components/ScheduleModals';

import useEmailActionDropdown from './useEmailActionDropDown';

import { isNullOrEmpty } from '@/utils';

import { styles } from './EmailActionDropDown.style';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { NotesAvatarImage } from '@/assets/images';

const EmailActionDropDown = (props: any) => {
  const {
    setOpenDrawer,
    selectedCheckboxes,
    setSelectedCheckboxes,
    messageDetailsData,
    isLoadingDetailsMessages,
    isFetchingDetailsMessages,
    companyId,
  } = props;

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
    handleDeleteSubmit,
    loadingDelete,
  } = useEmailActionDropdown({
    setOpenDrawer,
    selectedCheckboxes,
    setSelectedCheckboxes,
    companyId,
  });

  const getValueByName = (data: any, targetName: any) => {
    const foundItem = data?.find((item: any) => item?.name === targetName);
    return foundItem ? foundItem?.value : null;
  };

  const convertToEmailTestingData = (messageDetailsData: any) => {
    return messageDetailsData?.map((item: any, index: any) => ({
      Id: item?.id || index + 1,
      avatar: NotesAvatarImage,
      name: getValueByName(item?.payload?.headers, 'From') || 'Unknown',
      createdDate: item?.internalDate || '',
      emailTo: getValueByName(item?.payload?.headers, 'To') || '',
      subjectHeading: getValueByName(item?.payload?.headers, 'Subject') || '',
      subject: item?.snippet || '',
    }));
  };

  const EmailTestingData = convertToEmailTestingData(messageDetailsData?.data);

  return (
    <div>
      <Button
        endIcon={<ArrowDropDownIcon />}
        sx={{
          border: `1px solid ${theme?.palette?.custom?.dark}`,
          color: `${theme?.palette?.custom?.main}`,
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
          {!isFetchingDetailsMessages ||
          !isLoadingDetailsMessages ||
          !isNullOrEmpty(EmailTestingData) ? (
            EmailTestingData?.map((item: any) => {
              const options: any = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
              };
              const localDateTime = new Date(
                item?.createdDate * 1,
              ).toLocaleString('en-US', {
                timeZone: 'Asia/Karachi',
                ...options,
              });
              return isFetchingDetailsMessages ? (
                <Skeleton variant="rounded" width={'100%'} height={100} />
              ) : (
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
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
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
                          {localDateTime}
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
              );
            })
          ) : (
            <Skeleton variant="rounded" width={'100%'} height={100} />
          )}
        </Grid>
      </ScheduleModals>

      <AlertModals
        message={"You're about to delete a record."}
        type={'delete'}
        open={openAlertModal === 'Delete'}
        handleClose={handleCloseAlert}
        handleSubmitBtn={handleDeleteSubmit}
        loading={loadingDelete}
      />
    </div>
  );
};
export default EmailActionDropDown;
