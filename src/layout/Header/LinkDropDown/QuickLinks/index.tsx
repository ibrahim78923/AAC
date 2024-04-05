import React from 'react';
import Image from 'next/image';
import {
  Box,
  Button,
  Grid,
  ListItemText,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import { PlusIcon } from '@/assets/icons';
import { styles } from './QuickLinks.style';
import useLinkDropDown from '../useLinkDropDown';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { QuickLinkImage, SettingQuickImage } from '@/assets/images';

const QuickLinks = ({ toggleView }: any) => {
  const skeletonArr = [1, 2, 3, 4, 5, 6];
  const theme = useTheme();
  const { userQuickLinks, isLoading, isFetching } = useLinkDropDown();
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
          {/* <Image src={DeleteImage} alt="delete-icon" /> */}

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
          {isLoading || isFetching
            ? skeletonArr?.map(() => (
                <Grid item xs={6} key={uuidv4()}>
                  <Skeleton variant="rounded" height={22} />
                </Grid>
              ))
            : userQuickLinks?.map((item: any) => (
                <Grid item xs={6} key={item._id}>
                  <Box
                    component={Link}
                    href={item?.url}
                    sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                  >
                    <Image src={SettingQuickImage} alt="link" />
                    <ListItemText
                      primary={item?.name}
                      primaryTypographyProps={{ variant: 'body2' }}
                      sx={{
                        color: theme?.palette?.grey[600],
                        textTransform: 'capitalize',
                      }}
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
