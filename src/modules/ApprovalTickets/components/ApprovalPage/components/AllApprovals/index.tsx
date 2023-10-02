import { SharedIcon } from '@/assets/icons';
import { AvatarImage } from '@/assets/images';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const AllApprovals = () => {
  const theme = useTheme();
  return (
    <>
      <div
        style={{
          border: '1px solid grey',
          borderRadius: '.5rem',
          padding: '1rem',
        }}
      >
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Box>
                <Image src={AvatarImage} alt="Avatar" />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  Sharemydine
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SharedIcon />
                  <span>
                    <Typography
                      variant="customStyle"
                      sx={{
                        color: '#0AADC7',
                        ml: '3px',
                      }}
                    >
                      Request sent on Thu, 8 Mar 11:02 PM
                    </Typography>
                  </span>
                </Box>
              </Box>
            </Box>
            <Typography
              variant="customStyle"
              sx={{ color: theme.palette.common.black }}
            >
              Hi Guys We have been facing issue when we try to reach email
              server 3 Hi Guys.
            </Typography>
          </Grid>
          <Grid item>
            <MoreVertIcon />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AllApprovals;
