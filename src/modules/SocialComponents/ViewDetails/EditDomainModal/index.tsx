import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import { DownIcon, PlusIcon } from '@/assets/icons';

import { useState } from 'react';

const EditDomainModal = ({ isEditDomainOpen, setIsEditDomainOpen }: any) => {
  const [isAddDomain, setIsAddDomain] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);

  const theme = useTheme();
  const handleActionsMenuClose = () => {
    setAnchorEl(null);
  };

  const handleActionsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event?.currentTarget);
  };

  return (
    <Dialog
      open={isEditDomainOpen}
      onClose={() => setIsEditDomainOpen(false)}
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle sx={{ marginBottom: '20px' }}>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={1}
          flexWrap={'wrap'}
        >
          <Typography variant="h4">Company Domain Name</Typography>
          <Button
            variant="contained"
            onClick={() => setIsAddDomain(true)}
            className="small"
            startIcon={<PlusIcon />}
          >
            Add Domain
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: '15px !important' }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              placeholder="domain.com"
              fullWidth
              sx={{
                '& input': {
                  height: '11px',
                  color: theme?.palette?.blue?.main,
                  fontWeight: '500',
                },
              }}
            />
          </Grid>
          <Grid item xs={3} sx={{ textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                backgroundColor: theme?.palette?.primary?.lighter,
                color: theme?.palette?.primary?.main,
                borderRadius: '20px',
                width: 'fit-content',
                padding: '5px 15px',
                fontWeight: '500',
              }}
            >
              Primary
            </Typography>
          </Grid>

          {isAddDomain && (
            <>
              <Grid item xs={9}>
                <TextField
                  placeholder="Enter New Domain"
                  fullWidth
                  sx={{
                    '& input': {
                      height: '11px',
                      color: theme?.palette?.blue?.main,
                      fontWeight: '500',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  id="basic-button"
                  aria-controls={'basic-menu'}
                  aria-haspopup="true"
                  aria-expanded={'true'}
                  className="meduim"
                  variant="outlined"
                  color="inherit"
                  onClick={handleActionsMenuClick}
                  sx={{
                    color: theme?.palette?.grey[500],
                    border: `1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`,
                    '@media (max-width:581px)': {
                      width: '100%',
                    },
                  }}
                >
                  Actions &nbsp; <DownIcon />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={actionMenuOpen}
                  onClose={handleActionsMenuClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem>Make Primary</MenuItem>

                  <MenuItem>Delete</MenuItem>
                </Menu>
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      {isAddDomain && (
        <DialogActions
          sx={{
            '&.MuiDialogActions-root': {
              padding: '1.5rem !important',
              paddingTop: '10px !important',
            },
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setIsEditDomainOpen(false), setIsAddDomain(false);
            }}
            sx={{
              marginRight: '10px',
              border: `1px solid ${theme?.palette?.grey[900]}`,
              color: theme?.palette?.custom?.main,
            }}
            className="small"
          >
            cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setIsEditDomainOpen(false), setIsAddDomain(false);
            }}
            className="small"
          >
            Save
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default EditDomainModal;
