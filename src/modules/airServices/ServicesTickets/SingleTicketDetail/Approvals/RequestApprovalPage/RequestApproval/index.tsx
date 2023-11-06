import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { requestApprovalPageData } from '../RequestApprovalPage.data';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SharedIcon from '@/assets/icons/shared/shared-icon';
import { useRequestApprovalPage } from '../useRequestApprovalPage';
import { styles } from '../RequestApprovalPage.style';

const RequestApproval = () => {
  const { theme, open, handleClick, handleClose, textColor, anchorEl } =
    useRequestApprovalPage();
  const Icons: any = {
    Request: <SharedIcon />,
  };
  return (
    <>
      <Box sx={styles?.approvalsContainerBox}>
        {requestApprovalPageData
          ?.filter((item: any) => item?.status === 'Request')
          ?.map((filteredItem) => {
            return (
              <Box key={filteredItem?.id} sx={styles?.approvalsContainer}>
                <Grid
                  container
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Grid item>
                    <Box sx={styles?.requestApprovalBoxFirst}>
                      <Box>
                        <Image src={filteredItem?.img} alt="Avatar" />
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: theme?.typography?.fontWeightMedium,
                          }}
                        >
                          {filteredItem?.mainText}
                        </Typography>
                        <Box sx={styles?.requestApprovalBoxSecond}>
                          {Icons?.[filteredItem?.status]}
                          <span>
                            <Typography
                              variant="customStyle"
                              color={textColor?.[filteredItem?.status]}
                            >
                              {filteredItem?.iconText}
                            </Typography>
                          </span>
                        </Box>
                      </Box>
                    </Box>
                    <Typography
                      variant="customStyle"
                      color={theme?.palette?.common?.black}
                    >
                      {filteredItem?.detail}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleClick}>
                      <MoreVertIcon fontSize="large" />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={handleClose}>Send Reminder</MenuItem>
                      <MenuItem onClick={handleClose}>Cancel Approval</MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
      </Box>
    </>
  );
};

export default RequestApproval;
