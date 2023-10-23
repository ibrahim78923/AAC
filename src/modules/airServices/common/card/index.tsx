import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { styles } from './Card.style';
import { MinusCircleBlackIcon } from '@/assets/icons';

function Card({ heading, status, body, show }: any) {
  const theme: any = useTheme();
  const [showIcon, setShowIcon] = useState(false);
  return (
    <>
      <Box sx={styles.cardStyle(theme)}>
        <Box
          sx={styles.iconBox}
          onMouseEnter={() => setShowIcon(true)}
          onMouseLeave={() => setShowIcon(false)}
        >
          {showIcon && <MinusCircleBlackIcon />}
          <Typography sx={styles.headingTypography(theme)}>
            {heading}
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={styles.dividerStyle(theme)}
        />
        <Typography>
          <span style={styles.spanStyle(theme)}>Status:</span>
          {status}
        </Typography>
        {show ? (
          <>
            <Divider
              orientation="vertical"
              flexItem
              sx={styles.dividerStyle(theme)}
            />
            <Typography>{body}</Typography>
          </>
        ) : null}
      </Box>
    </>
  );
}

export default Card;
