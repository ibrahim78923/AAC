import { BrandImg, TwilioImg, UserAvatarImage } from '@/assets/images';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { styles } from './ConnectTwilioAccount.style';
import { ArrowBackIcon, IconArrowSwitch } from '@/assets/icons';
import Link from 'next/link';
import { AIR_MARKETER } from '@/routesConstants/paths';
import ConfigurationForm from './ConfigurationForm';

const ConnectTwilioAccount = () => {
  const theme = useTheme();

  const mediaLg = useMediaQuery('(max-width: 500px)');

  const [isAddConfiguration, setIsAddConfiguration] = useState(true);

  return (
    <Box>
      {!isAddConfiguration && (
        <Link href={AIR_MARKETER?.WHATSAPP_MARKETING}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Link>
      )}
      <Box sx={{ mt: isAddConfiguration ? 1 : 4 }}>
        <Box sx={styles?.centered}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: mediaLg ? 'column' : 'row',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <Box sx={styles?.connectivityBox}>
              <Image
                src={TwilioImg}
                style={{ width: '200px', height: 'auto' }}
                alt="Twilio"
              />
            </Box>
            <IconArrowSwitch />
            <Box sx={styles?.connectivityBox}>
              <Image
                src={BrandImg}
                style={{ width: '150px', height: 'auto' }}
                alt="Air Applecart"
              />
            </Box>
          </Box>
        </Box>
        {isAddConfiguration ? (
          <>
            <ConfigurationForm setIsAddConfiguration={setIsAddConfiguration} />
          </>
        ) : (
          <>
            <Typography
              variant="h2"
              sx={{ textAlign: 'center', fontWeight: '600', my: 3 }}
            >
              Configuration
            </Typography>
            <Box sx={styles?.centered}>
              <Box style={styles?.configurationBox(theme)}>
                <Box sx={styles?.flexRow(theme)}>
                  <Box
                    sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}
                  >
                    <Image
                      src={UserAvatarImage}
                      style={{ width: '36px', height: '36px' }}
                      alt="Twilio"
                    />
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: '500' }}>
                        Jhon Doe
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: theme?.palette?.grey[600] }}
                      >
                        example@mail.com
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Checkbox />
                  </Box>
                </Box>
                <Divider />

                <Box
                  sx={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'space-between',
                    flexDirection: mediaLg ? 'column-reverse' : 'row',
                    mt: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setIsAddConfiguration(true)}
                  >
                    Add New Account
                  </Button>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '10px',
                      flexDirection: mediaLg ? 'column-reverse' : 'row',
                    }}
                  >
                    <Button variant="outlined" color="inherit">
                      Cancel
                    </Button>
                    <Button variant="contained" color="primary">
                      Allow
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ConnectTwilioAccount;
