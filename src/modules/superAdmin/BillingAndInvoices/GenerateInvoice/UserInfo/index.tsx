import Image from 'next/image';

import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  useTheme,
  Theme,
  Box,
} from '@mui/material';

import { styles } from './UserInfo.style';

import { LogoSharedIcon } from '@/assets/icons';
import { AvatarImage } from '@/assets/images';

const UserInfo = () => {
  const theme = useTheme<Theme>();
  return (
    <Card sx={styles.mainCardBox(theme?.palette)}>
      <CardContent>
        <Grid container>
          <Grid item sm={6}>
            <Typography
              variant="h5"
              sx={styles?.airAppleCardHeading(theme?.palette)}
            >
              <LogoSharedIcon /> Air Applecart
            </Typography>
            <Typography variant="customStyle">123 Street Address</Typography>
            <br />
            <Typography variant="customStyle">
              City | State | Zip Code
            </Typography>
            <br />
            <Typography variant="customStyle">Phone No</Typography>
            <br />
            <Typography variant="customStyle">Company Email</Typography>
            <br />
          </Grid>
          <Grid item sm={6}>
            <Box style={{ display: '' }}>
              <Image src={AvatarImage} alt="avatar-image" />
              <Typography
                variant="subtitle2"
                sx={styles?.airAppleCardHeading(theme?.palette)}
              >
                Olivia Rhye
              </Typography>
            </Box>
            <Typography variant="customStyle">Extreme Commerce</Typography>
            <br />
            <Typography variant="customStyle">123 Street Address</Typography>
            <br />
            <Typography variant="customStyle">
              City | State | Zip Code
            </Typography>
            <br />
            <Typography variant="customStyle">Phone No</Typography>
            <br />
            <Typography variant="customStyle">Company Email</Typography>
            <br />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};
export default UserInfo;
