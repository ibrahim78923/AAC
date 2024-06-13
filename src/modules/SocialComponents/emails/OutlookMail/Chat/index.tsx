import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import LeftPane from './LeftPane';
import RightPane from './RightPane';
import { useDispatch } from 'react-redux';
import { setMailTabType } from '@/redux/slices/email/outlook/slice';
import { useGetMailFoldersOutlookQuery } from '@/services/commonFeatures/email/outlook';
import { MAIL_TYPES } from '@/constants';

const EmailChat = () => {
  const dispatch = useDispatch();

  const [isOpenSendEmailDrawer, setIsOpenSendEmailDrawer] = useState(false);
  const [mailType, setMailType] = useState('');

  const { data: foldersData } = useGetMailFoldersOutlookQuery({});
  const result = foldersData?.data?.find((item: any) => {
    return item?.displayName?.toLowerCase() === 'inbox';
  });

  useEffect(() => {
    if (result) {
      dispatch(setMailTabType(result));
    }
  }, [result]);

  useEffect(() => {
    localStorage.setItem('currentMailState', `${MAIL_TYPES?.OUTLOOK}`);
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <LeftPane
            setIsOpenSendEmailDrawer={setIsOpenSendEmailDrawer}
            isOpenSendEmailDrawer={isOpenSendEmailDrawer}
            mailType={mailType}
            setMailType={setMailType}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <RightPane
            setIsOpenSendEmailDrawer={setIsOpenSendEmailDrawer}
            isOpenSendEmailDrawer={isOpenSendEmailDrawer}
            mailType={mailType}
            setMailType={setMailType}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EmailChat;
