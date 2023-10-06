import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { ApprovalData } from '../AllApprovals.mock';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SharedIcon from '@/assets/icons/shared/shared-icon';
import { useRequestApprovalPage } from '../useRequestApprovalPage';

const RequestApproval = () => {
  const { theme, open, handleClick, handleClose, styles, textColor, anchorEl } =
    useRequestApprovalPage();
  const Icons: any = {
    Request: <SharedIcon />,
  };
  return (
    <>
      <Box sx={styles.approvalsContainerBox}>
        {ApprovalData?.filter((item) => item.status === 'Request').map(
          (filteredItem) => {
            return (
              <div key={filteredItem?.id} style={styles.approvalsContainer}>
                <Grid
                  container
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Grid item>
                    <Box sx={styles.requestApprovalBoxFirst}>
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
                        <Box sx={styles.requestApprovalBoxSecond}>
                          {Icons[filteredItem?.status]}
                          <span>
                            <Typography
                              variant="customStyle"
                              sx={{ color: textColor[filteredItem?.status] }}
                            >
                              {filteredItem?.iconText}
                            </Typography>
                          </span>
                        </Box>
                      </Box>
                    </Box>
                    <Typography
                      variant="customStyle"
                      sx={{ color: theme?.palette?.common?.black }}
                    >
                      {filteredItem?.detail}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
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
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      <MenuItem onClick={handleClose}>Send Reminder</MenuItem>
                      <MenuItem onClick={handleClose}>Cancel Approval</MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </div>
            );
          },
        )}
      </Box>
    </>
  );
};

export default RequestApproval;
