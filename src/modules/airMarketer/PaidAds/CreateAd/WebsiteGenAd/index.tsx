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
      <Card
        sx={{
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image src={MockUpImage} alt="eng-img" />
      </Card>
    </Box>
  );
};

export default WebsiteGenAd;
