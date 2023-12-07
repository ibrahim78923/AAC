import { MockUpImage } from '@/assets/images';
import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import Image from 'next/image';
import { styles } from '../CreateAd.style';

const WebsiteGenAd = () => {
  return (
    <Box>
      <FormControl>
        <FormLabel id="network_radio">Select an ad network</FormLabel>
        <RadioGroup row aria-labelledby="network_radio" name="socialType">
          <FormControlLabel
            value="facebook"
            control={<Radio />}
            label="Facebook"
          />
          <FormControlLabel
            value="linkedin"
            control={<Radio />}
            label="LinkedIn"
          />
        </RadioGroup>
      </FormControl>
      <Box sx={styles?.cardStyle}>
        <Card
          sx={{
            height: '50vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Image src={MockUpImage} alt="eng-img" />
        </Card>
      </Box>
    </Box>
  );
};

export default WebsiteGenAd;
