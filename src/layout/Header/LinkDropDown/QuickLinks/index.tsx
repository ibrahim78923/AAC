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
import NoData from '@/components/NoData';

const QuickLinks = ({ toggleView }: any) => {
  const skeletonArr = [1, 2, 3, 4, 5, 6];
  const theme = useTheme();
  const { userQuickLinks, isLoading, isFetching, activeQuickLInkNumber } =
    useLinkDropDown();
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
              {`(${userQuickLinks?.length}/${activeQuickLInkNumber})`}
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
          <Button
            variant="contained"
            sx={{ minWidth: '0px', gap: 1, height: '32px' }}
            onClick={toggleView}
          >
            <PlusIcon />
          </Button>
        </Box>
      </Box>
      <Box sx={{ p: '10px 20px 20px', maxHeight: '190px', overflowY: 'auto' }}>
        <Grid container spacing={2}>
          {isLoading || isFetching ? (
            skeletonArr?.map(() => (
              <Grid item xs={6} key={uuidv4()}>
                <Skeleton variant="rounded" height={22} />
              </Grid>
            ))
          ) : userQuickLinks?.length !== 0 ? (
            userQuickLinks?.map((item: any) => (
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
            ))
          ) : (
            <Grid item xs={12}>
              <NoData height="192px" />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default QuickLinks;
