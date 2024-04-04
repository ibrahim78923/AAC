import React from 'react';
import Image from 'next/image';
import {
  Box,
  Button,
  Grid,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { DeleteImage, QuickLinkImage } from '@/assets/images';
import { PlusIcon } from '@/assets/icons';
import { styles } from './QuickLinks.style';
import { isNullOrEmpty } from '@/utils';
import { QuickLinksData } from './QuickLinks.data';

const QuickLinks = ({ toggleView }: any) => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: '20px 20px 10px',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <Box sx={styles?.menuDropDownLink}>
            <Image src={QuickLinkImage} alt="GreenLink" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Typography variant="subtitle1">Quick Links</Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: theme?.palette?.grey[900] }}
            >
              (4/10)
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Image src={DeleteImage} alt="delete-icon" />

          <Button
            variant="contained"
            sx={{ minWidth: '0px', gap: 1, height: '32px' }}
            onClick={toggleView}
          >
            <PlusIcon />
          </Button>
        </Box>
      </Box>
      <Box sx={{ p: '10px 20px 20px' }}>
        <Grid container spacing={2} sx={{ maxWidth: '480px' }}>
          {!isNullOrEmpty(QuickLinksData) &&
            QuickLinksData?.map((item) => (
              <Grid item xs={6} key={item.name}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Image src={item?.logo} alt="link" />
                  <ListItemText
                    primary={item?.name}
                    primaryTypographyProps={{ variant: 'body2' }}
                    sx={{ color: theme?.palette?.grey[600] }}
                  />
                </Box>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default QuickLinks;
