import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './NotificationCard.styles';
import { mailDataArray } from './MailList.data';

const MailList = () => {
  const theme = useTheme();
  return (
    <Box minHeight={'calc(100vh - 350px)'} sx={{ overflowY: 'auto' }}>
      <Box sx={styles?.notificationWrap}>
        <FormControlLabel
          label="Select All"
          control={<Checkbox name={`selectAllCheckbox${uuidv4()}`} />}
        />
        <Button
          variant="text"
          sx={{
            color: theme?.palette?.slateBlue?.main,
            fontWeight: '400',
            textDecoration: 'underline',
          }}
        >
          Refresh
        </Button>
      </Box>

      {mailDataArray?.map((item: any) => (
        <Box key={uuidv4()} sx={styles?.card}>
          <Checkbox />
          <Box>
            <Typography variant="h6">
              {item?.firstName} {item?.lastName} {item?.reff}
            </Typography>
            <Typography
              variant="body3"
              sx={{ fontWeight: '600' }}
              color={'primary'}
              margin={'8px 0px'}
            >
              {item?.subTitle}
            </Typography>
            <Typography variant="body2" margin={'8px 0px'}>
              {item?.description}
            </Typography>
            <Typography variant="body2">{item?.time}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MailList;
