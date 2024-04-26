import React, { useState } from 'react';

import Image from 'next/image';

import { Box, Grid, Typography, useTheme } from '@mui/material';

import { ClearIcon, PhoneGreenIcon } from '@/assets/icons';

import { dailPadKeys } from './DailPad.data';

import { styles } from './DialingPad.style';

import { v4 as uuidv4 } from 'uuid';
import { callsContactsData } from '@/mock/modules/SocialComponents/Calling';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_CALLING_PERMISSIONS } from '@/constants/permission-keys';

const DialingPad = () => {
  const theme = useTheme();

  const [phoneNo, setPhoneNo] = useState('');

  const handelInputButtons = (value: any) => {
    setPhoneNo(phoneNo + value);
  };
  const handelClear = () => {
    setPhoneNo('');
  };

  const filteredData = callsContactsData?.filter(
    (contact: any) => contact?.phone?.includes(phoneNo),
  );

  return (
    <PermissionsGuard
      permissions={[SOCIAL_COMPONENTS_CALLING_PERMISSIONS?.ONE_TO_ONE_CALL]}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {filteredData && (
            <Box
              sx={{
                backgroundColor: 'whitesmoke',
                width: '96px',
                height: '96px',
                borderRadius: '50%',
              }}
            >
              {phoneNo && (
                <>
                  {filteredData[0]?.userImage && (
                    <Image
                      src={filteredData[0]?.userImage}
                      width={96}
                      height={96}
                      style={{ borderRadius: '50%' }}
                      alt="user"
                    />
                  )}
                </>
              )}
            </Box>
          )}
          <Typography variant="h3" color={theme?.palette?.custom?.grayish_blue}>
            {phoneNo && filteredData && filteredData[0]?.userName
              ? filteredData[0]?.userName
              : ''}
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {phoneNo && (
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                mt={1}
              >
                <Box sx={styles?.phoneDispWrapper}>
                  <Typography
                    variant="h4"
                    color={theme?.palette?.custom?.grayish_blue}
                  >
                    {phoneNo}
                  </Typography>
                </Box>
                <Box style={{ cursor: 'pointer' }} onClick={handelClear}>
                  <ClearIcon />
                </Box>
              </Box>
            )}
            <Box mt={1} sx={styles?.dailkeysWrapper}>
              <Grid container spacing={2}>
                {dailPadKeys?.map((key: any) => (
                  <Grid
                    item
                    xs={4}
                    lg={4}
                    key={uuidv4()}
                    onClick={() => handelInputButtons(key?.value)}
                  >
                    <Box sx={styles?.dailPadBtn(theme)}>
                      <Box
                        fontSize={18}
                        fontWeight={400}
                        textAlign="center"
                        color={theme?.palette?.slateBlue?.main}
                      >
                        {key?.dailKey}
                      </Box>
                      <Box
                        fontSize={6}
                        style={{ marginTop: '-4px' }}
                        fontWeight={400}
                        textAlign="center"
                        color={theme?.palette?.slateBlue?.main}
                      >
                        {key?.alphabets}
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box mt={2}>
              <PhoneGreenIcon />
            </Box>
          </Box>
        </Box>
      </Box>
    </PermissionsGuard>
  );
};

export default DialingPad;
