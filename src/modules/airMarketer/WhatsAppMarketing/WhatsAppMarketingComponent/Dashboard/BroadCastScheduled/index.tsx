import {
  Box,
  Button,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';

import useBroadCastScheduled from './useBroadCastScheduled';

import { scheduledSmsArray } from '../Dashboard.data';

import { v4 as uuidv4 } from 'uuid';

import { styles } from './BroadCastScheduled.style';
import { DotsBoldIcon } from '@/assets/icons';
import { useState } from 'react';

const ScheduledSMS = () => {
  const { theme, statusTag } = useBroadCastScheduled();

  return (
    <Box sx={{ pl: '24px' }}>
      <Box sx={styles?.scheduledSMSCardStyle}>
        <Box className="scheduledSMSHeader">
          <Typography variant="h4" sx={styles?.heading(theme)}>
            Broadcast Schedule
          </Typography>
          <Button variant="contained">View All</Button>
        </Box>
        <Box className="cardWrapper">
          {scheduledSmsArray?.map((item: any) => {
            return (
              <Card sx={{ my: 1 }} key={uuidv4()}>
                <CardContent>
                  <CardHeader item={item} statusTag={statusTag} />
                  <Typography variant="body2" color="text.secondary">
                    {item?.desc}
                  </Typography>
                  <Stack
                    direction={{ sx: 'column', sm: 'row' }}
                    justifyContent="space-between"
                  >
                    <Typography>
                      <Typography
                        component="span"
                        sx={{ color: theme?.palette?.primary?.main }}
                      >
                        {' '}
                        Created:{' '}
                      </Typography>
                      {item?.created}
                    </Typography>
                    <Typography>
                      <Typography
                        component="span"
                        sx={{ color: theme?.palette?.primary?.main }}
                      >
                        {' '}
                        Recipients:{' '}
                      </Typography>
                      {item?.recipients}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

const CardHeader = ({ item, statusTag }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Stack
        direction={{ sx: 'column', sm: 'row' }}
        justifyContent="space-between"
      >
        <Typography gutterBottom variant="h5" component="div">
          {item?.title}
        </Typography>
        <Box
          sx={{ display: 'flex', alignItems: 'center', marginRight: '-30px' }}
        >
          <Box sx={styles?.cardHeader}>
            <Box
              sx={{
                width: '10px',
                height: '10px',
                backgroundColor: `${statusTag(item?.status)}`,
                borderRadius: '50%',
              }}
            />
            {item?.status}
          </Box>
          <Button
            sx={{ width: '5px', height: 'auto', padding: '0px' }}
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <DotsBoldIcon />
          </Button>
        </Box>
      </Stack>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default ScheduledSMS;
