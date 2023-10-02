import { AvatarImage } from '@/assets/images';
import { CloseOutlined } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';

export const DetailCard = () => {
  return (
    <div
      style={{
        border: '1px solid grey',
        borderRadius: '.5rem',
        padding: '1rem',
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          md={3.9}
          padding={1}
          borderRight={{ md: '1px solid grey' }}
          borderBottom={{ xs: '1px solid grey', md: 'none' }}
        >
          <Box>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              alignItems={'center'}
              gap={1}
              marginBottom={1}
            >
              <Image src={AvatarImage} alt="Avatar" />
              <div>
                <Typography variant="body1">Rachel</Typography>
                <Typography variant="caption">Created On</Typography>
              </div>
            </Box>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              justifyContent={'space-between'}
              marginBottom={1}
            >
              <Typography variant="body1">Email</Typography>
              <Typography variant="body1">email@service.com</Typography>
            </Box>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              justifyContent={'space-between'}
              marginBottom={1}
            >
              <Typography variant="body1">Email</Typography>
              <Typography variant="body1">email@service.com</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={3.9}
          padding={1}
          borderRight={{ md: '1px solid grey' }}
          borderBottom={{ xs: '1px solid grey', md: 'none' }}
        >
          <CloseOutlined style={{ float: 'right' }} />
          Descritopn
        </Grid>
        <Grid item xs={12} md={3.9} padding={1}>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            marginBottom={1}
          >
            <Typography variant="body1">Email</Typography>
            <Typography variant="body1">email@service.com</Typography>
          </Box>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            marginBottom={1}
          >
            <Typography variant="body1">Email</Typography>
            <Typography variant="body1">email@service.com</Typography>
          </Box>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            marginBottom={1}
          >
            <Typography variant="body1">Email</Typography>
            <Typography variant="body1">email@service.com</Typography>
          </Box>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            marginBottom={1}
          >
            <Typography variant="body1">Email</Typography>
            <Typography variant="body1">email@service.com</Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
