import { Box, Button, Grid, Typography } from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';
import useProducts from './useProducts';

import { columns } from './FacebookLikes.data';

import { styles } from '../Associations.style';
import { faceBookLikesData } from '@/mock/modules/airMarketer/Campaigns/Assets';
import Image from 'next/image';
import { FaceBookPerformanceImage } from '@/assets/images';

const FacebookLikes = () => {
  const { setIsOpenAlert, setOpenDrawer } = useProducts();

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 0px 0px 0px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={4} sx={styles?.countBox}>
          <Image
            src={FaceBookPerformanceImage}
            alt="FaceBookPerformanceImage"
          />
          <Typography variant="subtitle2">Facebook Likes</Typography>
        </Grid>
        <Grid item md={8}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Button
              variant="outlined"
              className="small"
              sx={{ minWidth: '0px', gap: 0.5 }}
            >
              View all ad campaigns
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={columns({ setOpenDrawer, setIsOpenAlert })}
            data={faceBookLikesData}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FacebookLikes;
