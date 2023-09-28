import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AvatarImag from '../../assets/ViewIcon/Avatar.svg';
import { Grid, Typography, Box } from '@mui/material';
import Image from 'next/image';

export default function DetailViewCard() {
  return (
    <Grid container sx={{ maxWidth: '80%' }}>
      <Card sx={{ maxWidth: '100%' }}>
        <CardContent>
          <Grid container>
            <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Image
                  src={AvatarImag} // Provide the actual path to your image
                  width={24} // Specify the width of the image
                  height={24} // Specify the height of the image
                  alt="Description of the image" // Provide a meaningful alt text
                />
                <div style={{ border: '1px solid #000' }}>
                  <Typography variant="h5" sx={{ ml: '0.5rem' }}>
                    Sophie Baxtergjas fgjhafhggfsdjgjsdfhjsfjhfggggggggggggggg
                  </Typography>
                </div>
              </Box>
              <Box>
                <Typography varient="h6" sx={{ ml: '0.5rem' }}>
                  Email:
                  <Typography component="span" sx={{ ml: '0.5rem' }}>
                    sophiebaxterl@gmail.com
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
