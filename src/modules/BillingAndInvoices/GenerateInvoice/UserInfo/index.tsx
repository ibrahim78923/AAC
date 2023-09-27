import Image from 'next/image';

import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  useTheme,
  Theme,
} from '@mui/material';

import { LogoSharedIcon } from '@/assets/icons';
import { AvatarImage } from '@/assets/images';

const styles = {
  mainCardBox: (theme: Theme) => ({
    backgroundColor: theme?.blue?.main,
  }),
  airAppleCardHeading: (theme: Theme) => ({
    color: theme?.common?.white,
  }),
};
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
            <Image src={AvatarImage} alt="avatar-image" />
            <Typography
              variant="subtitle2"
              sx={styles?.airAppleCardHeading(theme?.palette)}
            >
              Olivia Rhye
            </Typography>
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
