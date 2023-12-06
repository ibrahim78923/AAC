import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import { styles } from './ConnectNumber.style';
import { TickListIcon, WhatsApp55Icon } from '@/assets/icons';
import { listData } from './ConnectNumber.data';

const ConnectNumber = () => {
  return (
    <Box>
      <Box sx={styles.header}>
        <Box sx={styles.icon}>
          <WhatsApp55Icon />
        </Box>
        <Box>
          <Typography sx={{ lineHeight: '1.25' }} variant="h3">
            WhatsApp
          </Typography>
          <Box sx={styles.headerText}>
            Connect WhatsApp Business numbers and bring all your conversation
            here
          </Box>
        </Box>
      </Box>
      <Box sx={styles.divider} />
      <Box>
        <Typography sx={{ lineHeight: '1.25' }} variant="h3">
          Get started with WhatsApp Marketing
        </Typography>
        <List>
          {listData?.map((item: any) => (
            <ListItem key={item?.id} disableGutters>
              <ListItemIcon>
                <TickListIcon />
              </ListItemIcon>
              <ListItemText primary={item?.text} />
            </ListItem>
          ))}
        </List>
        <Button sx={{ mt: '10px' }} variant="contained">
          Connect Your WhatsApp Account
        </Button>
      </Box>
    </Box>
  );
};

export default ConnectNumber;
