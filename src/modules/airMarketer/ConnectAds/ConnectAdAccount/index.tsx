import React, { useState } from 'react';
import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import {
  ConnectAdAccountData,
  accountColumns,
  accountData,
} from './ConnectAdAccount.data';
import { FacebookIcon, InfoBlueIcon, LinkdinIcon } from '@/assets/icons';
import Image from 'next/image';
import { styles } from './connectAds.Style';
import CommonModal from '@/components/CommonModal';
import TanstackTable from '@/components/Table/TanstackTable';
import TrackVisitors from '../TrackVisitors';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';

const ConnectAdAccount = () => {
  const [isLinkedinModal, isSetLinkedinModal] = useState(false);
  const [isTrackVisitors, setIsTrackVisitors] = useState(false);
  const theme = useTheme();
  const renderIcon: any = {
    FacebookIcon: <FacebookIcon />,
    LinkdinIcon: <LinkdinIcon />,
  };
  const router = useRouter();
  return (
    <Box>
      {isTrackVisitors ? (
        <TrackVisitors />
      ) : (
        <Box>
          <Typography variant="h3">Connect an ad account</Typography>
          <Typography sx={{ mt: 2, fontWeight: 300 }} variant="body2">
            Pull all your ad campaign data into Airapple cart to begin tracking{' '}
            <br /> who is interacting with each ad
          </Typography>
          <Typography sx={{ mt: 2, fontWeight: 300 }} variant="body2">
            You can connect up to 2 ad accounts
          </Typography>

          {ConnectAdAccountData?.map((item: any) => (
            <Grid container item xl={4} key={uuidv4()}>
              <Box
                sx={styles?.createDrawer}
                onClick={() => {
                  // item.id === '1' ? isSetLinkedinModal(true) :
                  // item.id === '2' ? isSetLinkedinModal(true) :
                  item.id === '3' ? isSetLinkedinModal(true) : {};
                }}
              >
                <Typography variant="h6">{item?.title}</Typography>
                <Typography variant="body2" sx={{ color: '#6B7280 ' }}>
                  {item?.desc}
                </Typography>
                <Box display="flex" ml="-10px" mt="16px">
                  {renderIcon[item?.icon]}
                  <Box display="flex" ml="10px">
                    <Image src={item.image} alt=""></Image>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
          {isLinkedinModal && (
            <CommonModal
              open={isLinkedinModal}
              handleClose={() => {
                isSetLinkedinModal(false);
              }}
              title={
                <Box display={'flex'} alignItems={'center'} gap="10px">
                  <InfoBlueIcon />
                  <Typography variant="h5" fontSize={'30px'}>
                    Select LinkedIn ad acounts
                  </Typography>
                </Box>
              }
              footer
              okText="Connect"
            >
              <Box
                sx={{ color: '#4B5563', fontSize: '16px', fontWeight: 400 }}
                mb="20px"
              >
                <Typography my="8px">
                  Select the below account(s) you want to connect to Airapple
                  cart.
                </Typography>
                <Typography my="8px">
                  Newly connected accounts may be eligible $500 USD in ad
                  credits.
                </Typography>
                <Typography my="8px">
                  You can connect up to 2 ad accounts
                </Typography>
              </Box>
              <TanstackTable columns={accountColumns} data={accountData} />
            </CommonModal>
          )}
        </Box>
      )}

      <Stack direction="row" justifyContent="space-between">
        <Button
          sx={{
            color: theme?.palette?.custom?.main,
            border: `1px solid ${theme?.palette?.custom?.main}`,
          }}
          variant="outlined"
          onClick={() => {
            setIsTrackVisitors(false);
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setIsTrackVisitors(true);
            router.push(AIR_MARKETER?.PAID_ADS);
          }}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};
export default ConnectAdAccount;
