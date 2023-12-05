import { ViewDetailDocumentTextIcon } from '@/assets/icons';
import { AvatarImage } from '@/assets/images';
import { Avatar, Box, Chip, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';

export const DetailCard = (props: any) => {
  const { detail } = props;
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: `2px solid ${theme?.palette?.custom?.off_white_three}`,
        borderRadius: '.5rem',
        paddingY: '1rem',
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          md={3.9}
          padding={1.5}
          borderRight={{
            md: `1px solid ${theme?.palette?.custom?.off_white_three}`,
          }}
          borderBottom={{
            xs: `1px solid ${theme?.palette?.custom?.off_white_three}`,
            md: 'none',
          }}
        >
          <Box>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              alignItems={'center'}
              gap={1}
              marginBottom={1.5}
            >
              <Image src={AvatarImage} alt="Avatar" />
              <div>
                <Typography variant="body2" fontWeight={600}>
                  {' '}
                  {detail?.name || 'Sophia Baxtar'}
                </Typography>
              </div>
            </Box>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              justifyContent={'space-between'}
              marginBottom={1}
            >
              <Typography variant="body2" fontWeight={600}>
                Email:
              </Typography>
              <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                {detail?.email || 'sophiebaxterl@gmail.com'}
              </Typography>
            </Box>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              justifyContent={'space-between'}
              marginBottom={1}
            >
              <Typography variant="body2" fontWeight={600}>
                Created on:
              </Typography>
              <Typography variant="body2">
                {detail?.createdOn ?? 'Sun, 5 Mar 9:41 PM'}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={3.9}
          padding={1.5}
          borderRight={{
            md: `1px solid ${theme?.palette?.custom?.off_white_three}`,
          }}
          borderBottom={{
            xs: `1px solid ${theme?.palette?.custom?.off_white_three}`,
            md: 'none',
          }}
        >
          <Box display={'flex'} flexWrap={'wrap'} gap={1} marginBottom={1}>
            <Typography variant="body2" fontWeight={600}>
              Description:
            </Typography>
            <Typography variant="body2" sx={{ flex: '1' }}>
              {detail?.description ??
                ` Hi Team, I have been unable to send any emails since this morning.
              What’s going on? Regards, Andrea`}
            </Typography>
          </Box>
          <Box display={'flex'} flexWrap={'wrap'} gap={1} marginBottom={1}>
            <Typography variant="body2" fontWeight={600}>
              Attachments:
            </Typography>
            <Box
              display={'flex'}
              alignItems={'center'}
              flexWrap={'wrap'}
              gap={1}
              marginBottom={1}
            >
              <Avatar sx={{ backgroundColor: 'primary.lighter' }}>
                <ViewDetailDocumentTextIcon />
              </Avatar>
              <Box>
                <Typography variant="body2" color="slateBlue.main">
                  {detail?.filename ?? 'file-name-0.txt'}
                </Typography>
                <Typography variant="body3" color="grey.500">
                  {detail?.size ?? '1Kb'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3.9} padding={1.5}>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            marginBottom={1}
          >
            <Typography variant="body2" fontWeight={600}>
              Status:
            </Typography>
            <Chip
              label={detail?.status ?? 'Open'}
              variant="outlined"
              size="small"
              color="primary"
            />
          </Box>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            marginBottom={1}
          >
            <Typography variant="body2" fontWeight={600}>
              Due by:
            </Typography>
            <Typography variant="body2">
              {detail?.dueBy ?? 'Tue, 14 Mar 10:00 AM'}
            </Typography>
          </Box>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            marginBottom={1}
          >
            <Typography variant="body2" fontWeight={600}>
              Associated By:
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'primary.main', textDecoration: 'underline' }}
            >
              {detail?.association ?? 'Deals'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
