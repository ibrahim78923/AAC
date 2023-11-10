import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { NotificationProps } from '../../Chat.interface';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './NotificationCard.styles';

const NotificationCard = (props: NotificationProps) => {
  const {
    selectAllProps = {},
    handleRefresh = () => {},
    data = [],
    singleCheckboxProps,
    singleCardClick = () => {},
  } = props;
  return (
    <Box minHeight={'calc(100vh - 350px)'} sx={{ overflowY: 'auto' }}>
      <Box sx={styles.notificationWrap}>
        <FormControlLabel
          label="Select All"
          control={
            <Checkbox
              name={`selectAllCheckbox${uuidv4()}`}
              {...selectAllProps}
            />
          }
        />
        <Button variant="text" onClick={handleRefresh}>
          Refresh
        </Button>
      </Box>

      {data.map((obj) => (
        <Box key={uuidv4()} sx={styles.card}>
          <Checkbox
            name={`singleCheckbox${uuidv4()}`}
            {...singleCheckboxProps}
          />
          <Box onClick={() => singleCardClick(obj)}>
            <Typography>{obj?.title}</Typography>
            <Typography variant="body2" color={'primary'} margin={'8px 0px'}>
              {obj?.subTitle}
            </Typography>
            <Typography variant="body2" margin={'8px 0px'}>
              {obj?.description}
            </Typography>
            <Typography variant="body2">{obj?.time}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default NotificationCard;
