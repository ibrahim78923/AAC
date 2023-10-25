import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { MinusCircleBlackIcon } from '@/assets/icons';
import { CardPropsI } from './InventoryCard.interface';

export const InventoryCard = ({
  heading,
  status,
  children,
  showChild,
}: CardPropsI) => {
  const theme: any = useTheme();
  const [showIcon, setShowIcon] = useState(false);
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'start'}
        flexWrap={'wrap'}
        borderLeft={`.5rem solid ${theme?.palette?.primary?.main}`}
        boxShadow={'.2rem .2rem .2rem rgba(0, 0, 0, 0.1)'}
        padding={'1.2rem'}
        borderRadius={'.6rem'}
        marginBottom={'1rem'}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={'.5rem'}
          sx={{ cursor: 'pointer' }}
          onMouseEnter={() => setShowIcon(true)}
          onMouseLeave={() => setShowIcon(false)}
        >
          {showIcon && <MinusCircleBlackIcon />}
          <Typography variant="h6" color={theme?.palette?.primary?.main}>
            {heading}
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            margin: '0 2rem',
            border: `.1rem solid ${theme?.palette?.grey[700]}`,
            backgroundColor: 'transparent',
          }}
        />
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyItems={'center'}
          gap={'.3rem'}
        >
          <Typography color={theme?.palette?.grey[900]}>Status:</Typography>
          <Typography>{status}</Typography>
        </Box>
        {showChild && (
          <>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                margin: '0 2rem',
                border: `.1rem solid ${theme?.palette?.grey[700]}`,
                backgroundColor: 'transparent',
              }}
            />
            <Typography>{children}</Typography>
          </>
        )}
      </Box>
    </>
  );
};
