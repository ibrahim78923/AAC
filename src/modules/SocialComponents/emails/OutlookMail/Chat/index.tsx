import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import LeftPane from './LeftPane';
import RightPane from './RightPane';
import { useDispatch } from 'react-redux';
import { setMailTabType } from '@/redux/slices/email/outlook/slice';
import { useGetMailFoldersOutlookQuery } from '@/services/commonFeatures/email/outlook';

const EmailChat = () => {
  const dispatch = useDispatch();
  const { data: foldersData } = useGetMailFoldersOutlookQuery({});
  const result = foldersData?.data?.find((item: any) => {
    return item?.displayName?.toLowerCase() === 'inbox';
  });

  useEffect(() => {
    if (result) {
      dispatch(setMailTabType(result));
    }
  }, [result]);

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

export default EmailChat;
