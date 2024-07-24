import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import LeftPane from './LeftPane';
import RightPane from './RightPane';
import { useDispatch } from 'react-redux';
import { useGetGmailFoldersQuery } from '@/services/commonFeatures/email/gmail';
import { setGmailTabType } from '@/redux/slices/email/gmail/slice';
import { MAIL_TYPES } from '@/constants';

const GmailChat = () => {
  const dispatch = useDispatch();
  const { data: foldersData } = useGetGmailFoldersQuery({});
  const result = foldersData?.data?.labels?.find((item: { name: string }) => {
    return item?.name?.toLowerCase() === 'inbox';
  });

  useEffect(() => {
    if (result) {
      dispatch(setGmailTabType(result));
    }
  }, [result]);

  useEffect(() => {
    localStorage.setItem('currentMailState', `${MAIL_TYPES?.GMAIL}`);
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <LeftPane />
        </Grid>
        <Grid item md={8} xs={12}>
          <RightPane />
        </Grid>
      </Grid>
    </>
  );
};

export default GmailChat;
