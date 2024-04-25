import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './NotificationCard.styles';

const MailList = () => {
  const data = ['', '', ''];
  return (
    <Box minHeight={'calc(100vh - 350px)'} sx={{ overflowY: 'auto' }}>
      <Box sx={styles.notificationWrap}>
        <FormControlLabel
          label="Select All"
          control={<Checkbox name={`selectAllCheckbox${uuidv4()}`} />}
        />
        <Button variant="text">Refresh</Button>
      </Box>

      {data?.map((obj: any) => (
        <Box key={uuidv4()} sx={styles.card}>
          <Checkbox />
          <Box>
            <Typography>{obj?.title}</Typography>
            <Typography variant="body2" color={'primary'} margin={'8px 0px'}>
              title
            </Typography>
            <Typography variant="body2" margin={'8px 0px'}>
              discrption
            </Typography>
            <Typography variant="body2">02, january 2014</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MailList;
